import { InjectionToken, inject } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient, User, Session } from '@supabase/supabase-js';
import { environment } from '@env/environment';
import type { Database } from './database.types';

export type { User as SupabaseUser, Session as SupabaseSession, SupabaseClient };

export const SUPABASE_CLIENT = new InjectionToken<SupabaseClient<Database>>('SUPABASE_CLIENT', {
  providedIn: 'root',
  factory: () => {
    return createClient<Database>(environment.supabaseUrl, environment.supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    });
  },
});

/** Helper function to inject the SupabaseClient */
export function injectSupabaseClient(): SupabaseClient<Database> {
  return inject(SUPABASE_CLIENT);
}
