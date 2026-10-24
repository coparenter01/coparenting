import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'pp-error-state',
  template: `
    <div class="error-card" role="alert">
      <div class="error-icon-wrap" aria-hidden="true">
        <span class="material-symbols-rounded error-icon">error_outline</span>
      </div>

      <div class="error-body">
        <h3 class="error-title">{{ title() }}</h3>
        <p class="error-message">{{ message() }}</p>
      </div>

      @if (retryable()) {
        <button type="button" class="btn btn-outline" (click)="retryClicked.emit()">
          <span class="material-symbols-rounded btn-icon" aria-hidden="true">refresh</span>
          {{ retryLabel() }}
        </button>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .error-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      background: var(--pp-error-subtle);
      border: 1px solid var(--pp-error);
      border-radius: 12px;
      color: var(--pp-ink);
      margin: 12px 0;

      @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .error-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #fee2e2;
      flex-shrink: 0;
    }

    .error-icon {
      font-size: 24px;
      color: var(--pp-error);
    }

    .error-body {
      flex: 1;
      min-width: 0;
    }

    .error-title {
      margin: 0 0 4px;
      font-size: 0.9375rem;
      font-weight: 700;
      color: var(--pp-error);
    }

    .error-message {
      margin: 0;
      font-size: 0.875rem;
      color: var(--pp-ink-2);
      line-height: 1.4;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 38px;
      padding: 0 16px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      background: var(--pp-surface);
      color: var(--pp-ink);
      border: 1px solid var(--pp-outline-variant);
      transition: background 150ms ease;
      flex-shrink: 0;

      &:hover {
        background: var(--pp-surface-variant);
      }

      &:focus-visible {
        outline: var(--pp-focus-ring);
        outline-offset: 2px;
      }
    }

    .btn-icon {
      font-size: 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorStateComponent {
  public readonly title = input<string>('Unable to load data');
  public readonly message = input<string>('An error occurred while loading. Please try again.');
  public readonly retryable = input<boolean>(true);
  public readonly retryLabel = input<string>('Try again');

  public readonly retryClicked = output();
}
