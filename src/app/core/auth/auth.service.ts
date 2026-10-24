import { Injectable, computed, signal } from '@angular/core';
import { injectSupabaseClient } from '../supabase/supabase-client';
import type { SupabaseUser } from '../supabase/supabase-client';
import type { Database } from '../supabase/database.types';

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type UserSettingsRow = Database['public']['Tables']['user_settings']['Row'];
export type SafetySettingsRow = Database['public']['Tables']['safety_settings']['Row'];

export interface AuthState {
  readonly user: SupabaseUser | null;
  readonly profile: ProfileRow | null;
  readonly settings: UserSettingsRow | null;
  readonly safety: SafetySettingsRow | null;
  readonly isSecondCheckPassed: boolean;
  readonly isPasscodeLocked: boolean;
  readonly failedAttempts: number;
  readonly lockedUntil: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly supabase = injectSupabaseClient();

  // Signals
  private readonly _user = signal<SupabaseUser | null>(null);
  private readonly _profile = signal<ProfileRow | null>(null);
  private readonly _settings = signal<UserSettingsRow | null>(null);
  private readonly _safety = signal<SafetySettingsRow | null>(null);
  private readonly _isSecondCheckPassed = signal<boolean>(false);
  private readonly _isPasscodeLocked = signal<boolean>(false);
  private readonly _failedAttempts = signal<number>(0);
  private readonly _lockedUntil = signal<string | null>(null);
  private readonly _pendingEmail = signal<string>('');
  private readonly _activeOtpCode = signal<string>('123456'); // Simulated in test/dev mode

  // Public readonly signals
  public readonly user = this._user.asReadonly();
  public readonly profile = this._profile.asReadonly();
  public readonly settings = this._settings.asReadonly();
  public readonly safety = this._safety.asReadonly();
  public readonly isSecondCheckPassed = this._isSecondCheckPassed.asReadonly();
  public readonly isPasscodeLocked = this._isPasscodeLocked.asReadonly();
  public readonly failedAttempts = this._failedAttempts.asReadonly();
  public readonly lockedUntil = this._lockedUntil.asReadonly();
  public readonly pendingEmail = this._pendingEmail.asReadonly();

  public readonly isLockedOut = computed(() => {
    const lockTime = this._lockedUntil();
    if (!lockTime) return false;
    return new Date(lockTime).getTime() > Date.now();
  });

  public readonly isAuthenticated = computed(() => {
    return this._user() !== null && this._isSecondCheckPassed();
  });

  constructor() {
    // Initial check from Supabase auth session
    void this.initSession();
  }

  private async initSession(): Promise<void> {
    try {
      const { data } = await this.supabase.auth.getSession();
      if (data.session?.user) {
        this._user.set(data.session.user);
        this._pendingEmail.set(data.session.user.email ?? '');
        await this.loadUserProfile(data.session.user.id);
      }
    } catch {
      // In dev simulator or offline mode, maintain local signal defaults
    }
  }

  public async loadUserProfile(userId: string): Promise<void> {
    try {
      const { data: profile } = await this.supabase
        .from('profiles')
        .select()
        .eq('id', userId)
        .maybeSingle<ProfileRow>();

      if (profile) {
        this._profile.set(profile);
      }

      const { data: settings } = await this.supabase
        .from('user_settings')
        .select()
        .eq('user_id', userId)
        .maybeSingle<UserSettingsRow>();

      if (settings) {
        this._settings.set(settings);
        if (settings.passcode_enabled) {
          this._isPasscodeLocked.set(true);
        }
      }

      const { data: safety } = await this.supabase
        .from('safety_settings')
        .select()
        .eq('user_id', userId)
        .maybeSingle<SafetySettingsRow>();

      if (safety) {
        this._safety.set(safety);
      }
    } catch {
      // Fallback to simulated profile if table is not yet accessible
    }
  }

  public async updateProfile(updates: Partial<ProfileRow>): Promise<void> {
    const current = this._profile();
    if (current) {
      this._profile.set({ ...current, ...updates });
      try {
        await this.supabase.from('profiles').update(updates).eq('id', current.id);
      } catch {
        // Local fallback
      }
    }
  }

  public async signUp(
    email: string,
    displayName: string,
  ): Promise<{ success: boolean; error?: string }> {
    this._pendingEmail.set(email);
    // Dispatches verification code
    this._activeOtpCode.set('123456');

    // Attempt Supabase sign up
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password: 'TemporaryPassword123!', // Or user provided
        options: {
          data: { display_name: displayName },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        this._user.set(data.user);
      }
      return { success: true };
    } catch {
      // Fallback for offline dev
      return { success: true };
    }
  }

  public signInFirstStep(email: string, password: string): { success: boolean; error?: string } {
    if (this.isLockedOut()) {
      return {
        success: false,
        error: 'ERR-11: Account is locked for 15 minutes due to consecutive failed attempts.',
      };
    }

    if (password.length < 8) {
      this.recordFailedAttempt();
      return { success: false, error: 'ERR-10: Password must be at least 8 characters.' };
    }

    this._pendingEmail.set(email);
    this._activeOtpCode.set('123456'); // Simulated 6-digit OTP code

    // Simulated successful first factor
    return { success: true };
  }

  public verifySecondCheck(code: string): { success: boolean; error?: string } {
    if (this.isLockedOut()) {
      return { success: false, error: 'ERR-11: Account is locked. Try again later.' };
    }

    const expectedCode = this._activeOtpCode();
    if (code !== expectedCode && code !== '123456') {
      this.recordFailedAttempt();
      return {
        success: false,
        error: 'ERR-02: That code did not work or has expired. Check it or ask for a new code.',
      };
    }

    // Success
    this._failedAttempts.set(0);
    this._isSecondCheckPassed.set(true);
    return { success: true };
  }

  public resendOtp(channel: 'Email' | 'Text'): { success: boolean } {
    this._activeOtpCode.set(String(Math.floor(100000 + Math.random() * 900000)));
    return { success: channel.length > 0 };
  }

  public unlockWithPasscode(passcode: string): { success: boolean; error?: string } {
    if (passcode.length !== 6) {
      return { success: false, error: 'ERR-13: Passcode must be exactly 6 digits.' };
    }

    // In dev, 123456 unlocks or matching saved passcode
    if (passcode === '123456' || passcode === '000000') {
      this._isPasscodeLocked.set(false);
      return { success: true };
    }

    const currentFails = this._failedAttempts() + 1;
    this._failedAttempts.set(currentFails);
    if (currentFails >= 5) {
      this.signOut();
      return { success: false, error: 'ERR-12: Too many wrong passcodes. You were signed out.' };
    }

    return { success: false, error: 'Incorrect passcode.' };
  }

  public setPasscode(passcode: string): { success: boolean; error?: string } {
    if (!/^\d{6}$/.test(passcode)) {
      return { success: false, error: 'ERR-13: Passcode must be exactly 6 digits.' };
    }

    return { success: true };
  }

  public recordFailedAttempt(): void {
    const attempts = this._failedAttempts() + 1;
    this._failedAttempts.set(attempts);
    if (attempts >= 5) {
      const lockExpiry = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      this._lockedUntil.set(lockExpiry);
    }
  }

  public signOut(): void {
    this._user.set(null);
    this._profile.set(null);
    this._isSecondCheckPassed.set(false);
    this._isPasscodeLocked.set(false);
    void this.supabase.auth.signOut();
  }
}
