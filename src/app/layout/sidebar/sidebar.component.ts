import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { NavItem } from '../nav/nav-items';

/**
 * Sidebar navigation component.
 * Shown on wide screens (≥1024 px).
 * Contains the brand mark, all menu items, and the Safety exit button.
 */
@Component({
  selector: 'pp-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="sidebar" aria-label="Main navigation">
      <a routerLink="/home" class="sidebar-brand" aria-label="ParentPath – go to home">
        <img
          src="/assets/brand/parentpath-logo.svg"
          alt="ParentPath"
          class="sidebar-logo"
          width="140"
          height="36"
        />
      </a>

      <ul class="sidebar-list" role="list">
        @for (item of items(); track item.path) {
          <li>
            <a
              [routerLink]="item.path"
              routerLinkActive="sidebar-link--active"
              [routerLinkActiveOptions]="{ exact: item.path === '/home' }"
              class="sidebar-link"
              [attr.aria-label]="item.ariaLabel ?? null"
            >
              <span class="material-symbols-rounded sidebar-icon" aria-hidden="true">
                {{ item.icon }}
              </span>
              <span class="sidebar-label">{{ item.label }}</span>
            </a>
          </li>
        }
      </ul>

      @if (safetyModeEnabled()) {
        <div class="sidebar-exit">
          <a
            href="https://www.google.com"
            class="exit-btn"
            aria-label="Exit now – close ParentPath"
          >
            <span class="material-symbols-rounded" aria-hidden="true">exit_to_app</span>
            Exit now
          </a>
        </div>
      }
    </nav>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 16px 0 24px;
      background: var(--pp-surface);
      border-right: 1px solid var(--pp-outline-variant);
      overflow-y: auto;
      overflow-x: hidden;
    }

    .sidebar-brand {
      display: flex;
      align-items: center;
      padding: 8px 24px 20px;
      text-decoration: none;
    }

    .sidebar-logo {
      width: 140px;
      height: auto;
    }

    .sidebar-list {
      flex: 1;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .sidebar-link {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 24px;
      text-decoration: none;
      color: var(--pp-ink-2);
      border-radius: 0 24px 24px 0;
      margin-right: 12px;
      transition:
        background 160ms ease,
        color 160ms ease;

      &:hover {
        background: var(--pp-primary-50);
        color: var(--pp-primary-600);
      }

      &:focus-visible {
        outline: var(--pp-focus-ring);
        outline-offset: -2px;
      }

      &.sidebar-link--active {
        background: var(--pp-primary-50);
        color: var(--pp-primary-700);
        font-weight: 600;
      }
    }

    .sidebar-icon {
      font-size: 22px;
      flex-shrink: 0;
    }

    .sidebar-label {
      font-size: 0.9375rem;
      line-height: 1.4;
    }

    .sidebar-exit {
      padding: 16px 24px 0;
      border-top: 1px solid var(--pp-outline-variant);
      margin-top: 8px;
    }

    .exit-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public readonly items = input.required<readonly NavItem[]>();
  public readonly safetyModeEnabled = input<boolean>(false);
}
