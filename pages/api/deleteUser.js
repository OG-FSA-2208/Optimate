import supabaseAdmin from '../../supabase/api/deleteUser';

const handler = async (req, res) => {
  try {
    const {
      data: auth,
      user,
      error: authError,
    } = await supabaseAdmin.auth.api.getUser(req.body.session.access_token);
    // const { data: profile } = await supabase
    //   .from('profiles')
    //   .select('*')
    //   .eq('id', user.id)
    //   .single();
    const { data: userban, error } =
      await supabaseAdmin.auth.api.updateUserById(user.id, {
        ban_duration: '771408h',
      });
    res.send(userban);
  } catch (error) {
    console.log(error);
  }

  // await supabaseAdmin.from('profiles').delete().eq('id', userId);
  // await supabaseAdmin.from('profiles_secure').delete().eq('id', userId);
  // await supabaseAdmin.from('matches2').delete().eq('id', userId);
  // await supabaseAdmin
  //   .from('messages')
  //   .delete()
  //   .or(`from.eq.${userId}, to.eq.${userId}`);
  // // await supabaseAdmin.from('old_messages').delete().match({id:userId});
  // await supabaseAdmin
  //   .from('blacklist')
  //   .delete()
  //   .or(`id.eq.${userId}, blacklisted_id.eq.${userId}`);
  // // gets all photos from 'avatars' bucket that contain the userId
  // const filesToRemove = (
  //   await supabaseAdmin.storage.from('avatars').list()
  // ).data.reduce((prev, file) => {
  //   if (file.name.includes(userId)) {
  //     prev.push(file.name);
  //     return prev;
  //   }
  //   return prev;
  // }, []);
  // // removes said photos from the bucket
  // const { data } = await supabaseAdmin.storage
  //   .from('avatars')
  //   .remove(filesToRemove);
  // // then deletes the user off the database
  // const { data: user, error } = await supabaseAdmin.auth.api.deleteUser(userId);
  // if (error) {
  //   return `some error occurred when trying to delete the user: ${error}`;
  // }
};
export default handler;
