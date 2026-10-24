import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'pp-test-mode-badge',
  template: `
    <span class="test-badge" role="note" [attr.aria-label]="label() + ': simulated feature'">
      <span class="material-symbols-rounded test-badge-icon" aria-hidden="true">science</span>
      <span class="test-badge-text">{{ label() }}</span>
    </span>
  `,
  styles: `
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    .test-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 0.6875rem;
      font-weight: 600;
      line-height: 1.25;
      letter-spacing: 0.02em;
      background: var(--pp-surface-variant);
      color: var(--pp-ink-2);
      border: 1px solid var(--pp-outline-variant);
      white-space: nowrap;
    }

    .test-badge-icon {
      font-size: 13px;
      color: var(--pp-accent-600);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestModeBadgeComponent {
  public readonly label = input<string>('Test mode');
}
