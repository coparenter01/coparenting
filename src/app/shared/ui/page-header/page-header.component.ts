import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pp-page-header',
  imports: [RouterLink],
  template: `
    <header class="page-header" role="region" [attr.aria-label]="title()">
      <div class="header-main">
        @if (backUrl()) {
          <a
            [routerLink]="backUrl()"
            class="back-button"
            [attr.aria-label]="backLabel() ?? 'Go back'"
          >
            <span class="material-symbols-rounded" aria-hidden="true">arrow_back</span>
          </a>
        }

        <div class="title-group">
          <div class="title-row">
            <h1 class="page-title">{{ title() }}</h1>
            @if (screenId()) {
              <span class="screen-id-badge" aria-label="Screen identifier: {{ screenId() }}">
                {{ screenId() }}
              </span>
            }
          </div>
          @if (subtitle()) {
            <p class="page-subtitle">{{ subtitle() }}</p>
          }
        </div>
      </div>

      <div class="header-actions">
        <ng-content select="[actions]" />
      </div>
    </header>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .page-header {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      padding: 24px 0 16px;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--pp-outline-variant);
    }

    .header-main {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      min-width: 0;
      flex: 1;
    }

    .back-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: var(--pp-ink);
      text-decoration: none;
      background: transparent;
      border: 1px solid var(--pp-outline-variant);
      transition: background 150ms ease;
      flex-shrink: 0;
      margin-top: 2px;

      &:hover {
        background: var(--pp-primary-50);
      }

      &:focus-visible {
        outline: var(--pp-focus-ring);
        outline-offset: 2px;
      }
    }

    .title-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .title-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }

    .page-title {
      margin: 0;
      font-size: var(--pp-h1-size, 1.75rem);
      font-weight: 700;
      color: var(--pp-ink);
      line-height: 1.25;
    }

    .screen-id-badge {
      display: inline-flex;
      align-items: center;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.6875rem;
      font-weight: 600;
      font-family: monospace;
      background: var(--pp-surface-variant);
      color: var(--pp-ink-3);
      border: 1px solid var(--pp-outline-variant);
    }

    .page-subtitle {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--pp-ink-2);
      line-height: 1.5;
      max-width: 72ch;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  public readonly title = input.required<string>();
  public readonly subtitle = input<string>();
  public readonly backUrl = input<string>();
  public readonly backLabel = input<string>();
  public readonly screenId = input<string>();
}
