import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NetworkService } from '@core/network/network.service';

// screenId: 'ACC-SCR-24'
@Component({
  selector: 'pp-offline-banner',
  template: `
    @if (!network.isOnline()) {
      <aside class="offline-banner" role="status" aria-live="polite">
        <div class="banner-content">
          <div class="banner-message">
            <span class="material-symbols-rounded banner-icon" aria-hidden="true">cloud_off</span>
            <span
              >You are offline. What you typed stays on this device until you are back online.</span
            >
          </div>
          <button type="button" class="retry-btn" (click)="onRetry()">Retry</button>
        </div>
      </aside>
    }
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .offline-banner {
      background: var(--pp-warn-subtle, #fff7e8);
      color: var(--pp-warn, #7a2e0e);
      border-bottom: 1px solid var(--pp-outline-variant);
      padding: 10px 16px;
      font-size: 0.875rem;
      line-height: 1.4;
      animation: slideDown 150ms ease-out;
    }

    @keyframes slideDown {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }

    .banner-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .banner-message {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
    }

    .banner-icon {
      font-size: 18px;
      flex-shrink: 0;
    }

    .retry-btn {
      display: inline-flex;
      align-items: center;
      height: 32px;
      padding: 0 14px;
      border-radius: 6px;
      font-size: 0.8125rem;
      font-weight: 600;
      border: 1px solid var(--pp-primary-600);
      background: #ffffff;
      color: var(--pp-primary-600);
      cursor: pointer;
      transition: background 150ms ease;

      &:hover {
        background: var(--pp-primary-50);
      }

      &:focus-visible {
        outline: var(--pp-focus-ring);
        outline-offset: 2px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfflineBannerComponent {
  public readonly network = inject(NetworkService);

  public onRetry(): void {
    this.network.checkConnection();
  }
}
