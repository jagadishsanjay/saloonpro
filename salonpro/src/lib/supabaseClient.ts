import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

// Only create client if we have valid config — prevents crash with placeholder values
export const supabase: SupabaseClient | null =
  isValidUrl(supabaseUrl) && supabaseAnonKey.length > 20
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export const isSupabaseConfigured = supabase !== null
