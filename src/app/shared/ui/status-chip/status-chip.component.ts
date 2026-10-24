import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type StatusChipVariant =
  | 'pending'
  | 'approved'
  | 'paid'
  | 'delivered'
  | 'declined'
  | 'overdue'
  | 'failed'
  | 'draft'
  | 'archived'
  | 'disputed'
  | 'private'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger';

@Component({
  selector: 'pp-status-chip',
  template: `
    <span class="chip" [class]="'chip--' + category()" role="status">
      @if (iconName()) {
        <span class="material-symbols-rounded chip-icon" aria-hidden="true">{{ iconName() }}</span>
      }
      <span class="chip-label">{{ label() }}</span>
    </span>
  `,
  styles: `
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      line-height: 1.25;
      letter-spacing: 0.02em;
      white-space: nowrap;
      text-transform: capitalize;
    }

    .chip-icon {
      font-size: 14px;
      line-height: 1;
    }

    .chip--success {
      background: var(--pp-success-subtle);
      color: var(--pp-success);
    }

    .chip--warning {
      background: var(--pp-warn-subtle);
      color: var(--pp-warn);
    }

    .chip--danger {
      background: var(--pp-error-subtle);
      color: var(--pp-error);
    }

    .chip--neutral {
      background: var(--pp-surface-variant);
      color: var(--pp-ink-2);
      border: 1px solid var(--pp-outline-variant);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusChipComponent {
  public readonly variant = input.required<StatusChipVariant>();
  public readonly text = input<string>();

  public readonly label = computed(() => {
    return this.text() ?? this.variant();
  });

  private static readonly categoryMap: Record<
    StatusChipVariant,
    'success' | 'warning' | 'danger' | 'neutral'
  > = {
    approved: 'success',
    paid: 'success',
    delivered: 'success',
    success: 'success',
    pending: 'warning',
    disputed: 'warning',
    warning: 'warning',
    declined: 'danger',
    overdue: 'danger',
    failed: 'danger',
    danger: 'danger',
    draft: 'neutral',
    archived: 'neutral',
    private: 'neutral',
    neutral: 'neutral',
  };

  public readonly category = computed(() => {
    return StatusChipComponent.categoryMap[this.variant()];
  });

  public readonly iconName = computed(() => {
    const v = this.variant();
    if (v === 'disputed') {
      return 'priority_high';
    }
    if (v === 'private') {
      return 'lock';
    }
    return null;
  });
}
