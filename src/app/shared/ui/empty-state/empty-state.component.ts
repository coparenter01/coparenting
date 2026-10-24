import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pp-empty-state',
  imports: [RouterLink],
  template: `
    <div class="empty-state" role="status">
      <div class="empty-icon-wrap" aria-hidden="true">
        <span class="material-symbols-rounded empty-icon">{{ icon() }}</span>
      </div>
      <h2 class="empty-title">{{ title() }}</h2>
      @if (description()) {
        <p class="empty-desc">{{ description() }}</p>
      }

      @if (actionLabel()) {
        <div class="empty-action">
          @if (actionUrl()) {
            <a [routerLink]="actionUrl()" class="btn btn-primary">
              @if (actionIcon()) {
                <span class="material-symbols-rounded btn-icon" aria-hidden="true">{{
                  actionIcon()
                }}</span>
              }
              {{ actionLabel() }}
            </a>
          } @else {
            <button type="button" class="btn btn-primary" (click)="actionClicked.emit()">
              @if (actionIcon()) {
                <span class="material-symbols-rounded btn-icon" aria-hidden="true">{{
                  actionIcon()
                }}</span>
              }
              {{ actionLabel() }}
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      text-align: center;
      background: var(--pp-surface);
      border: 1px dashed var(--pp-outline-variant);
      border-radius: 12px;
      margin: 16px 0;
    }

    .empty-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--pp-primary-50);
      margin-bottom: 16px;
    }

    .empty-icon {
      font-size: 32px;
      color: var(--pp-primary-600);
    }

    .empty-title {
      margin: 0 0 8px;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--pp-ink);
    }

    .empty-desc {
      margin: 0 0 20px;
      font-size: 0.9375rem;
      color: var(--pp-ink-2);
      max-width: 48ch;
      line-height: 1.5;
    }

    .empty-action {
      display: flex;
      justify-content: center;
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
      text-decoration: none;
      cursor: pointer;
      border: none;
      transition:
        background 150ms ease,
        box-shadow 150ms ease;

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

    .btn-icon {
      font-size: 18px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  public readonly icon = input<string>('inbox');
  public readonly title = input.required<string>();
  public readonly description = input<string>();
  public readonly actionLabel = input<string>();
  public readonly actionUrl = input<string>();
  public readonly actionIcon = input<string>();

  public readonly actionClicked = output();
}
