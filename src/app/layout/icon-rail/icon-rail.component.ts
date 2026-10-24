import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { NavItem } from '../nav/nav-items';

/**
 * Icon-rail navigation component.
 * Shown on medium screens (600–1023 px).
 * Displays icons only; labels shown in a tooltip via title attribute.
 */
@Component({
  selector: 'pp-icon-rail',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="icon-rail" aria-label="Main navigation">
      <a routerLink="/home" class="rail-brand" aria-label="ParentPath – go to home">
        <img
          src="/assets/brand/parentpath-mark.svg"
          alt="ParentPath"
          class="rail-logo"
          width="32"
          height="32"
        />
      </a>

      <ul class="rail-list" role="list">
        @for (item of items(); track item.path) {
          <li>
            <a
              [routerLink]="item.path"
              routerLinkActive="rail-link--active"
              [routerLinkActiveOptions]="{ exact: item.path === '/home' }"
              class="rail-link"
              [title]="item.label"
              [attr.aria-label]="item.ariaLabel ?? item.label"
            >
              <span class="material-symbols-rounded rail-icon" aria-hidden="true">
                {{ item.icon }}
              </span>
            </a>
          </li>
        }
      </ul>

      @if (safetyModeEnabled()) {
        <div class="rail-exit">
          <a href="https://www.google.com" class="rail-exit-btn" aria-label="Exit now">
            <span class="material-symbols-rounded" aria-hidden="true">exit_to_app</span>
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

    .icon-rail {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      padding: 16px 0 24px;
      background: var(--pp-surface);
      border-right: 1px solid var(--pp-outline-variant);
      width: 64px;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .rail-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      padding: 4px;
    }

    .rail-logo {
      width: 32px;
      height: 32px;
      border-radius: 8px;
    }

    .rail-list {
      flex: 1;
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .rail-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      text-decoration: none;
      color: var(--pp-ink-2);
      transition:
        background 160ms ease,
        color 160ms ease;

      &:hover {
        background: var(--pp-primary-50);
        color: var(--pp-primary-600);
      }

      &:focus-visible {
        outline: var(--pp-focus-ring);
        outline-offset: 2px;
      }

      &.rail-link--active {
        background: var(--pp-primary-100);
        color: var(--pp-primary-700);
      }
    }

    .rail-icon {
      font-size: 22px;
    }

    .rail-exit {
      padding-top: 12px;
      border-top: 1px solid var(--pp-outline-variant);
    }

    .rail-exit-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--pp-error);
      color: #fff;
      text-decoration: none;
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
export class IconRailComponent {
  public readonly items = input.required<readonly NavItem[]>();
  public readonly safetyModeEnabled = input<boolean>(false);
}
