import supabase from "../../config/supabaseClient";

export const deleteUser = async (userId) => {
    console.dir(userId);
    // return true;
    console.dir(supabase.auth.api.deleteUser);
    const { data, user, error } = await supabase.auth.api.deleteUser(userId);
    if (error) {
        return `some error occurred when trying to delete the user: ${error}`;
    }
    console.dir(data);
    console.dir(user);
    return data;
}