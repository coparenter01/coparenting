import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private readonly _isOnline = signal<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true,
  );

  public readonly isOnline = this._isOnline.asReadonly();

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this._isOnline.set(true);
      });
      window.addEventListener('offline', () => {
        this._isOnline.set(false);
      });
    }
  }

  public checkConnection(): boolean {
    const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
    this._isOnline.set(online);
    return online;
  }
}
