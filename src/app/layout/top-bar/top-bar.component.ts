import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Top application bar component.
 * Shows household name and mode badge, time zone, user menu trigger,
 * and (when safety mode is active) the prominent red "Exit now" button.
 */
@Component({
  selector: 'pp-top-bar',
  imports: [RouterLink],
  template: `
    <header class="top-bar" role="banner">
      <!-- Left: page title / household name -->
      <div class="top-bar-start">
        <span class="top-bar-household" aria-label="Household: {{ householdName() }}">
          {{ householdName() }}
        </span>
        <span
          class="top-bar-mode-badge"
          [class.top-bar-mode-badge--linked]="householdMode() === 'linked'"
          [class.top-bar-mode-badge--solo]="householdMode() === 'solo'"
          aria-label="Household mode: {{ householdMode() }}"
        >
          {{ householdMode() === 'linked' ? 'Linked' : 'Solo' }}
        </span>
        @if (timeZone()) {
          <span class="top-bar-tz" aria-label="Time zone: {{ timeZone() }}">
            {{ timeZone() }}
          </span>
        }
      </div>

      <!-- Right: Exit now + user menu -->
      <div class="top-bar-end">
        @if (safetyModeEnabled()) {
          <a
            id="exit-now-btn"
            routerLink="/safety/exit-confirmation"
            class="top-bar-exit-btn"
            aria-label="Exit now – immediately leave ParentPath"
            (click)="exitClicked.emit()"
          >
            <span class="material-symbols-rounded" aria-hidden="true">exit_to_app</span>
            Exit now
          </a>
        }

        <button
          id="user-menu-btn"
          type="button"
          class="top-bar-user-btn"
          (click)="userMenuClicked.emit()"
        >
          <span class="material-symbols-rounded" aria-hidden="true">account_circle</span>
          <span class="top-bar-user-name">{{ userDisplayName() }}</span>
          <span class="material-symbols-rounded top-bar-chevron" aria-hidden="true">
            expand_more
          </span>
        </button>
      </div>
    </header>
  `,
  styles: `
    :host {
      display: block;
    }

    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      padding: 0 16px;
      background: var(--pp-surface);
      border-bottom: 1px solid var(--pp-outline-variant);
      gap: 12px;
    }

    .top-bar-start {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      flex: 1;
    }

    .top-bar-household {
      font-size: 1rem;
      font-weight: 600;
      color: var(--pp-ink);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .top-bar-mode-badge {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      border-radius: 99px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .top-bar-mode-badge--linked {
      background: var(--pp-success-subtle);
      color: var(--pp-success);
    }

    .top-bar-mode-badge--solo {
      background: var(--pp-warn-subtle);
      color: var(--pp-warn);
    }

    .top-bar-tz {
      flex-shrink: 0;
      font-size: 0.8125rem;
      color: var(--pp-ink-2);
    }

    .top-bar-end {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .top-bar-exit-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background: var(--pp-error);
      color: #fff;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.875rem;
      letter-spacing: 0.02em;
      transition: opacity 160ms ease;

      &:hover {
        opacity: 0.88;
      }

      &:focus-visible {
        outline: 3px solid var(--pp-error);
        outline-offset: 2px;
      }
    }

    .top-bar-user-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border: 1px solid var(--pp-outline-variant);
      border-radius: 99px;
      background: transparent;
      cursor: pointer;
      color: var(--pp-ink);
      font: inherit;
      font-size: 0.875rem;
      transition: background 160ms ease;

      &:hover {
        background: var(--pp-primary-50);
      }

      &:focus-visible {
        outline: var(--pp-focus-ring);
        outline-offset: 2px;
      }
    }

    .top-bar-user-name {
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      @media (max-width: 480px) {
        display: none;
      }
    }

    .top-bar-chevron {
      font-size: 18px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  public readonly householdName = input<string>('My Household');
  public readonly householdMode = input<'linked' | 'solo'>('solo');
  public readonly timeZone = input<string>('');
  public readonly userDisplayName = input<string>('You');
  public readonly safetyModeEnabled = input<boolean>(false);

  public readonly exitClicked = output();
  public readonly userMenuClicked = output();
}
