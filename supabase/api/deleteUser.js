import { createClient } from '@supabase/supabase-js';
// creating a client just for admin access
// NO OTHER PART OF THE APP SHOULD BE ACCESSING THIS CLIENT!!!

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;
console.log(supabaseServiceKey)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
console.dir(supabaseAdmin)

export const deleteUser = async (userId) => {
    console.dir(userId);
    await supabaseAdmin.from('profiles').delete().eq('id', userId);
    await supabaseAdmin.from('profiles_secure').delete().eq('id', userId);
    await supabaseAdmin.from('matches').delete().eq('id', userId);
    await supabaseAdmin.from('matches2').delete().eq('id', userId);
    await supabaseAdmin.from('messages').delete().or(`from.eq.${userId}, to.eq.${userId}`);
    // await supabaseAdmin.from('old_messages').delete().match({id:userId});
    await supabaseAdmin.from('blacklist').delete().or(`id.eq.${userId}, blacklised_id.eq.${userId}`);
    const filesToRemove = (await supabaseAdmin.storage.from('avatars').list()).data
        .reduce((prev, file) => {
            if (file.name.includes(userId)) {
                prev.push(file.name);
                return prev;
            }
            return prev;
        }, []);
    console.dir(filesToRemove);
    const {data} = await supabaseAdmin.storage.from('avatars').remove(filesToRemove);
    console.dir(data);
    const { data: user, error } = await supabaseAdmin.auth.api.deleteUser(userId);
    if (error) {
        return `some error occurred when trying to delete the user: ${error}`;
    }
    // console.dir(user);
    return data;
}