import supabase from "../../config/supabaseClient";

export default deleteUser = async (userId) => {
    const { data, user, error } = await supabase.auth.api.deleteUser(userId);
    if (error) {
        return `some error occurred when trying to delete the user: ${error}`;
    }
    return data;
}