import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { NavItem } from '../nav/nav-items';

/**
 * Bottom navigation bar component.
 * Shown on mobile screens (<600 px).
 * Displays up to 5 items (icons + labels).
 */
@Component({
  selector: 'pp-bottom-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bottom-nav" aria-label="Main navigation">
      <ul class="bottom-nav-list" role="list">
        @for (item of items(); track item.path) {
          <li class="bottom-nav-item">
            <a
              [routerLink]="item.path"
              routerLinkActive="bottom-link--active"
              [routerLinkActiveOptions]="{ exact: item.path === '/home' }"
              class="bottom-link"
              [attr.aria-label]="item.ariaLabel ?? item.label"
            >
              <span class="material-symbols-rounded bottom-icon" aria-hidden="true">
                {{ item.icon }}
              </span>
              <span class="bottom-label">{{ item.label }}</span>
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    :host {
      display: block;
    }

    .bottom-nav {
      background: var(--pp-surface);
      border-top: 1px solid var(--pp-outline-variant);
      padding-bottom: env(safe-area-inset-bottom, 0px);
    }

    .bottom-nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .bottom-nav-item {
      flex: 1;
    }

    .bottom-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 8px 4px;
      text-decoration: none;
      color: var(--pp-ink-2);
      transition: color 160ms ease;
      min-height: 56px;

      &:focus-visible {
        outline: var(--pp-focus-ring);
        outline-offset: -2px;
        border-radius: 8px;
      }

      &.bottom-link--active {
        color: var(--pp-primary-600);

        .bottom-icon {
          font-variation-settings: 'FILL' 1;
        }
      }
    }

    .bottom-icon {
      font-size: 22px;
      transition: font-variation-settings 160ms ease;
    }

    .bottom-label {
      font-size: 0.6875rem;
      font-weight: 500;
      line-height: 1.2;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNavComponent {
  public readonly items = input.required<readonly NavItem[]>();
}
