import { createClient, SupabaseClient } from '@supabase/supabase-js'

const URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!
const ANON = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const createSupabaseClient = (opts?: { anonKey?: string; url?: string }): SupabaseClient => {
  const url = opts?.url || URL
  const anon = opts?.anonKey || ANON
  if (!url || !anon) throw new Error('SUPABASE env vars missing')
  return createClient(url, anon, { auth: { persistSession: true } })
}
