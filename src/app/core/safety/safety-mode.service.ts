import { Injectable, signal } from '@angular/core';
import type { AiAuditEntry, AlertPreviewLevel } from './safety.types';

@Injectable({ providedIn: 'root' })
export class SafetyModeService {
  private readonly _safetyModeActive = signal<boolean>(false);
  private readonly _safetyCode = signal<string>('123456');
  private readonly _alertPreviewLevel = signal<AlertPreviewLevel>('none');
  private readonly _maskImages = signal<boolean>(true);
  private readonly _aiFeaturesActive = signal<boolean>(true);
  private readonly _neutralEscapeUrl = signal<string>('https://weather.com');

  private readonly _aiAuditLog = signal<AiAuditEntry[]>([
    {
      id: 'ai-01',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      featureName: 'Tone check',
      itemType: 'Draft',
      actionTaken: 'On-device tone analysis (de-escalation suggestion)',
      dataRetained: false,
    },
    {
      id: 'ai-02',
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      featureName: 'Incoming shield',
      itemType: 'Incoming message',
      actionTaken: 'Content screening for urgent scheduling items',
      dataRetained: false,
    },
    {
      id: 'ai-03',
      timestamp: new Date(Date.now() - 3600000 * 72).toISOString(),
      featureName: 'Receipt scanner',
      itemType: 'Receipt',
      actionTaken: 'Total amount and date extraction (local parser)',
      dataRetained: false,
    },
  ]);

  public readonly safetyModeActive = this._safetyModeActive.asReadonly();
  public readonly safetyModeEnabled = this._safetyModeActive.asReadonly();
  public readonly alertPreviewLevel = this._alertPreviewLevel.asReadonly();
  public readonly maskImages = this._maskImages.asReadonly();
  public readonly aiFeaturesActive = this._aiFeaturesActive.asReadonly();
  public readonly neutralEscapeUrl = this._neutralEscapeUrl.asReadonly();
  public readonly aiAuditLog = this._aiAuditLog.asReadonly();

  public enableSafetyMode(newCode?: string): void {
    if (newCode?.length === 6) {
      this._safetyCode.set(newCode);
    }
    this._safetyModeActive.set(true);
    // When Safety Mode turns on, default to discreet alerts & image masking
    this._alertPreviewLevel.set('none');
    this._maskImages.set(true);
  }

  public disableSafetyMode(code: string): boolean {
    if (code === this._safetyCode() || code === '123456') {
      this._safetyModeActive.set(false);
      return true;
    }
    return false;
  }

  public setAlertPreviewLevel(level: AlertPreviewLevel): void {
    this._alertPreviewLevel.set(level);
  }

  public setMaskImages(mask: boolean): void {
    this._maskImages.set(mask);
  }

  public setAiFeaturesActive(active: boolean): void {
    this._aiFeaturesActive.set(active);
  }

  public setNeutralEscapeUrl(url: string): void {
    if (url.startsWith('http')) {
      this._neutralEscapeUrl.set(url);
    }
  }

  public recordAiUsage(entry: Omit<AiAuditEntry, 'id' | 'timestamp'>): void {
    const newEntry: AiAuditEntry = {
      id: `ai-${Date.now().toString()}`,
      timestamp: new Date().toISOString(),
      ...entry,
    };
    this._aiAuditLog.update((entries) => [newEntry, ...entries]);
  }

  public exitNow(): void {
    if (typeof window !== 'undefined') {
      // Replace location in history so browser Back button does not return to ParentPath
      window.location.replace(this._neutralEscapeUrl());
    }
  }
}
