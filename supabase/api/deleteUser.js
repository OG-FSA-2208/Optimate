import { createClient } from '@supabase/supabase-js';
// creating a client just for admin access
// NO OTHER PART OF THE APP SHOULD BE ACCESSING THIS CLIENT!!!

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
// for some reason, the serviceKey does not properly create a client
// with the role 'service_role'.
// attempted to remove 'NEXT_PUBLIC' but createClient fails in such case

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
export default supabaseAdmin;
// currently this data and the function below is NOT located on server side
// this file is not protected and can be accessed from client-side
// further testing required

// export const deleteUser = async (userId) => {
//   await supabaseAdmin.from('profiles').delete().eq('id', userId);
//   await supabaseAdmin.from('profiles_secure').delete().eq('id', userId);
//   await supabaseAdmin.from('matches2').delete().eq('id', userId);
//   await supabaseAdmin
//     .from('messages')
//     .delete()
//     .or(`from.eq.${userId}, to.eq.${userId}`);
//   // await supabaseAdmin.from('old_messages').delete().match({id:userId});
//   await supabaseAdmin
//     .from('blacklist')
//     .delete()
//     .or(`id.eq.${userId}, blacklisted_id.eq.${userId}`);
//   // gets all photos from 'avatars' bucket that contain the userId
//   const filesToRemove = (
//     await supabaseAdmin.storage.from('avatars').list()
//   ).data.reduce((prev, file) => {
//     if (file.name.includes(userId)) {
//       prev.push(file.name);
//       return prev;
//     }
//     return prev;
//   }, []);
//   // removes said photos from the bucket
//   const { data } = await supabaseAdmin.storage
//     .from('avatars')
//     .remove(filesToRemove);
//   // then deletes the user off the database
//   const { data: user, error } = await supabaseAdmin.auth.api.deleteUser(userId);
//   if (error) {
//     return `some error occurred when trying to delete the user: ${error}`;
//   }
// };
