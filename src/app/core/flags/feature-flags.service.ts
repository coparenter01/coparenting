import type { Signal } from '@angular/core';
import { computed, Injectable, signal } from '@angular/core';

/** All feature flag keys */
export type FeatureFlagKey =
  | 'messaging'
  | 'calling'
  | 'calendar'
  | 'expenses'
  | 'child-support'
  | 'children'
  | 'documents'
  | 'records'
  | 'professionals'
  | 'safety'
  | 'support'
  | 'dev-ui';

/** Default flag state – all off until the Supabase table is ready */
const DEFAULT_FLAGS: Record<FeatureFlagKey, boolean> = {
  messaging: true,
  calling: true,
  calendar: true,
  expenses: true,
  'child-support': true,
  children: true,
  documents: true,
  records: true,
  professionals: true,
  safety: true,
  support: true,
  'dev-ui': true, // only shows in non-production
};

@Injectable({ providedIn: 'root' })
export class FeatureFlagsService {
  /** Reactive map of all flags */
  private readonly _flags = signal<Record<FeatureFlagKey, boolean>>({ ...DEFAULT_FLAGS });

  /** Read a single flag as a computed signal */
  public flag(key: FeatureFlagKey): Signal<boolean> {
    return computed(() => this._flags()[key]);
  }

  /** Check a flag synchronously */
  public isEnabled(key: FeatureFlagKey): boolean {
    return this._flags()[key];
  }

  /**
   * Patch flags (called once after loading from Supabase feature_flags table).
   * Phase 0-F will wire this up to the Supabase client.
   */
  public patch(overrides: Partial<Record<FeatureFlagKey, boolean>>): void {
    this._flags.update((current) => ({ ...current, ...overrides }));
  }
}
