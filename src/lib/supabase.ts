import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://woqlxpigqtnzgppduwhz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_XMvXMIIdmx-G2TWQAQiqrQ_S7e9G_7G";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
