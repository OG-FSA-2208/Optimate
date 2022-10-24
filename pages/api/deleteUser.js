import supabaseAdmin from '../../supabase/api/deleteUser';

const handler = async (req, res) => {
  try {
    // grab user info
    const {
      data: auth,
      user,
      error: authError,
    } = await supabaseAdmin.auth.api.getUser(req.body.session.access_token);

    //prevent user from matching
    const { data: profile } = await supabase
      .from('profiles')
      .update(`status:'deleted'`)
      .eq('id', user.id)
      .single();

    const filesToRemove = (
      await supabaseAdmin.storage.from('avatars').list()
    ).data.reduce((prev, file) => {
      if (file.name.includes(userId)) {
        prev.push(file.name);
        return prev;
      }
      return prev;
    }, []);
    // removes said photos from the bucket
    const { data } = await supabaseAdmin.storage
      .from('avatars')
      .remove(filesToRemove);
    // then deletes the user off the database
    const { data: photoData, error: photoError } =
      await supabaseAdmin.auth.api.deleteUser(userId);
    if (error) {
      console.log(
        `some error occurred when trying to delete the user: ${error}`
      );
    }

    // bans user to prevent login
    const { data: userban, error } =
      await supabaseAdmin.auth.api.updateUserById(user.id, {
        ban_duration: '771408h',
      });
    res.send(userban);
  } catch (error) {
    console.log(error);
  }
};
export default handler;
