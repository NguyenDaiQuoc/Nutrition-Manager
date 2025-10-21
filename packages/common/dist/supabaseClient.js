"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSupabaseClient = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const createSupabaseClient = (opts) => {
    const url = opts?.url || URL;
    const anon = opts?.anonKey || ANON;
    if (!url || !anon)
        throw new Error('SUPABASE env vars missing');
    return (0, supabase_js_1.createClient)(url, anon, { auth: { persistSession: true } });
};
exports.createSupabaseClient = createSupabaseClient;
