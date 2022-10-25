import { createClient } from '@supabase/supabase-js';
// creating a client just for admin access
// NO OTHER PART OF THE APP SHOULD BE ACCESSING THIS CLIENT!!!

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
export default supabaseAdmin;
