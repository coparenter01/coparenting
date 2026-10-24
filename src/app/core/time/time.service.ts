import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TimeService {
  private readonly _timeZone = signal<string>(
    typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC',
  );

  public readonly timeZone = this._timeZone.asReadonly();

  public setTimeZone(tz: string): void {
    this._timeZone.set(tz);
  }

  public nowUtc(): string {
    return new Date().toISOString();
  }

  public toUtcIso(date: Date): string {
    return date.toISOString();
  }

  public formatLocal(utcIso: string, mode: 'datetime' | 'date' | 'time' = 'datetime'): string {
    const date = new Date(utcIso);
    if (isNaN(date.getTime())) {
      return '—';
    }

    const tz = this._timeZone();
    const options: Intl.DateTimeFormatOptions = { timeZone: tz };

    if (mode === 'date') {
      options.year = 'numeric';
      options.month = 'short';
      options.day = 'numeric';
    } else if (mode === 'time') {
      options.hour = 'numeric';
      options.minute = '2-digit';
    } else {
      options.year = 'numeric';
      options.month = 'short';
      options.day = 'numeric';
      options.hour = 'numeric';
      options.minute = '2-digit';
    }

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
