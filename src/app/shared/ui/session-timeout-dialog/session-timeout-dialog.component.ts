import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

// screenId: 'ACC-SCR-25'
@Component({
  selector: 'pp-session-timeout-dialog',
  template: `
    @if (open()) {
      <div class="timeout-backdrop" role="presentation">
        <div
          class="timeout-card"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="timeout-title"
          aria-describedby="timeout-desc"
        >
          <div class="card-header">
            <span class="timeout-badge">Session security</span>
            <h2 id="timeout-title" class="timeout-title">Are you still there?</h2>
          </div>

          <p id="timeout-desc" class="timeout-body">
            You will be signed out in 2 minutes. Do you want to stay signed in?
          </p>

          <div class="timer-display" aria-live="polite" role="timer">
            {{ formattedTime() }}
          </div>

          <p class="draft-note">Anything you have not saved is kept as a draft on this device.</p>

          <div class="card-actions">
            <button type="button" class="btn btn-secondary" (click)="signOut.emit()">
              Sign out
            </button>
            <button type="button" class="btn btn-primary" (click)="staySignedIn.emit()">
              Stay signed in
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      display: contents;
    }

    .timeout-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(23, 33, 43, 0.65);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      z-index: 1200;
      animation: fadeIn 150ms ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .timeout-card {
      background: var(--pp-surface);
      border-radius: 14px;
      width: 100%;
      max-width: 520px;
      padding: 32px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
      border: 1px solid var(--pp-outline-variant);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .card-header {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .timeout-badge {
      display: inline-block;
      align-self: flex-start;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 999px;
      background: var(--pp-warn-subtle);
      color: var(--pp-warn);
    }

    .timeout-title {
      margin: 0;
      font-size: 1.375rem;
      font-weight: 700;
      color: var(--pp-ink);
    }

    .timeout-body {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--pp-ink-2);
      line-height: 1.5;
    }

    .timer-display {
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--pp-primary-600);
      font-variant-numeric: tabular-nums;
      padding: 8px 0;
    }

    .draft-note {
      margin: 0;
      font-size: 0.8125rem;
      color: var(--pp-ink-3);
      line-height: 1.4;
    }

    .card-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 8px;
      flex-wrap: wrap;

      @media (max-width: 480px) {
        flex-direction: column-reverse;

        .btn {
          width: 100%;
          justify-content: center;
        }
      }
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      height: 44px;
      padding: 0 20px;
      border-radius: 8px;
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: background 150ms ease;

      &:focus-visible {
        outline: var(--pp-focus-ring);
        outline-offset: 2px;
      }
    }

    .btn-secondary {
      background: var(--pp-surface);
      color: var(--pp-ink);
      border: 1px solid var(--pp-outline-variant);

      &:hover {
        background: var(--pp-surface-variant);
      }
    }

    .btn-primary {
      background: var(--pp-primary-600);
      color: #ffffff;

      &:hover {
        background: var(--pp-primary-700);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionTimeoutDialogComponent {
  public readonly open = input<boolean>(false);
  public readonly secondsRemaining = input<number>(120);

  public readonly signOut = output();
  public readonly staySignedIn = output();

  public readonly formattedTime = computed(() => {
    const total = Math.max(0, this.secondsRemaining());
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    const secStr = secs < 10 ? `0${String(secs)}` : String(secs);
    return `${String(mins)}:${secStr}`;
  });
}
