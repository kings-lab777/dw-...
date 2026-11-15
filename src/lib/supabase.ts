import { createClient } from '@supabase/supabase-js';

// Default Supabase project specified in requirements
const DEFAULT_SUPABASE_URL = 'https://rjxbdjgagizjmjwnlbxx.supabase.co';
// Live publishable anon key from DigiWorku
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_v-Wt6Skez4RmaQOUq-faCA_zHG-H8Au';

// Allow runtime override via localStorage or Vite env
export const getSupabaseConfig = () => {
  const storedUrl = typeof window !== 'undefined' ? localStorage.getItem('digiworku_supabase_url') : null;
  const storedKey = typeof window !== 'undefined' ? localStorage.getItem('digiworku_supabase_key') : null;
  
  const supabaseUrl = storedUrl || import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const supabaseAnonKey = storedKey || import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
  
  return { supabaseUrl, supabaseAnonKey };
};

const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const updateSupabaseCredentials = (url: string, key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('digiworku_supabase_url', url);
    localStorage.setItem('digiworku_supabase_key', key);
    window.location.reload();
  }
};
