import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pp-error-page',
  imports: [RouterLink],
  template: `
    <main class="system-page" role="main">
      <header class="public-header">
        <a routerLink="/" class="brand-link" aria-label="ParentPath home">
          <span class="brand-title">ParentPath</span>
        </a>
        <div class="header-nav">
          <a routerLink="/help" class="btn btn-outline">Help</a>
        </div>
      </header>

      <div class="page-content">
        <div class="card-wrap">
          <section class="error-card" aria-labelledby="error-title">
            <span class="badge badge-error">Error</span>
            <div class="title-group">
              <h1 id="error-title" class="title">Something went wrong</h1>
            </div>
            <p class="description">
              Something went wrong. Please try again. If it keeps happening, contact support.
            </p>
            <div class="actions-group">
              <a routerLink="/help" class="btn btn-primary">Contact support</a>
              <button type="button" class="btn btn-outline" (click)="onRetry()">Try again</button>
              <a routerLink="/home" class="btn btn-text">Go home</a>
            </div>
          </section>
        </div>
      </div>
    </main>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100dvh;
      background: var(--pp-bg);
    }

    .system-page {
      display: flex;
      flex-direction: column;
      min-height: 100dvh;
    }

    .public-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 32px;
      background: var(--pp-surface);
      border-bottom: 1px solid var(--pp-outline-variant);
    }

    .brand-link {
      text-decoration: none;
      color: var(--pp-ink);
    }

    .brand-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--pp-primary-600);
    }

    .page-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 16px;
    }

    .card-wrap {
      width: 100%;
      max-width: 560px;
    }

    .error-card {
      padding: 32px;
      background: var(--pp-surface);
      border: 1px solid var(--pp-outline-variant);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: 0 1px 2px rgb(22 35 46 / 6%);
    }

    .badge {
      display: inline-block;
      align-self: flex-start;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 999px;
      white-space: nowrap;
    }

    .badge-error {
      background: var(--pp-error-subtle);
      color: var(--pp-error);
    }

    .title-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .title {
      margin: 0;
      font-size: 1.625rem;
      font-weight: 700;
      color: var(--pp-ink);
      line-height: 1.25;
    }

    .description {
      margin: 0;
      font-size: 0.9375rem;
      line-height: 1.5;
      color: var(--pp-ink-2);
    }

    .actions-group {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      margin-top: 8px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      height: 44px;
      padding: 0 18px;
      border-radius: 8px;
      font-size: 0.9375rem;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      border: none;
      transition: background 150ms ease;

      &:focus-visible {
        outline: var(--pp-focus-ring);
        outline-offset: 2px;
      }
    }

    .btn-primary {
      background: var(--pp-primary-600);
      color: #ffffff;

      &:hover {
        background: var(--pp-primary-700);
      }
    }

    .btn-outline {
      background: var(--pp-surface);
      color: var(--pp-primary-600);
      border: 1px solid var(--pp-primary-600);

      &:hover {
        background: var(--pp-primary-50);
      }
    }

    .btn-text {
      background: transparent;
      color: var(--pp-primary-600);

      &:hover {
        background: var(--pp-primary-50);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPage {
  public onRetry(): void {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
}
