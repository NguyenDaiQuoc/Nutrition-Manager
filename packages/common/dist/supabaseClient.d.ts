import { SupabaseClient } from '@supabase/supabase-js';
export declare const createSupabaseClient: (opts?: {
    anonKey?: string;
    url?: string;
}) => SupabaseClient;
