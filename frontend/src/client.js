import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
// import.meta.env is Vite syntax.
// If using Create React App, use process.env.REACT_APP_SUPABASE_URL instead.

const supabase = createClient(URL, API_KEY);

export default supabase;
