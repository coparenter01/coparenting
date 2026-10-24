import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type SkeletonVariant = 'text' | 'card' | 'table' | 'circle';

@Component({
  selector: 'pp-loading-skeleton',
  template: `
    <div
      class="skeleton-container"
      [class]="'skeleton--' + variant()"
      role="status"
      aria-busy="true"
      aria-label="Loading..."
    >
      @switch (variant()) {
        @case ('circle') {
          <div class="skeleton-shimmer skeleton-circle"></div>
        }
        @case ('card') {
          <div class="skeleton-card">
            <div class="skeleton-shimmer skeleton-card-header"></div>
            <div class="skeleton-shimmer skeleton-line width-80"></div>
            <div class="skeleton-shimmer skeleton-line width-60"></div>
          </div>
        }
        @case ('table') {
          <div class="skeleton-table">
            @for (row of countArray(); track $index) {
              <div class="skeleton-table-row">
                <div class="skeleton-shimmer skeleton-cell cell-lg"></div>
                <div class="skeleton-shimmer skeleton-cell cell-md"></div>
                <div class="skeleton-shimmer skeleton-cell cell-sm"></div>
              </div>
            }
          </div>
        }
        @default {
          <div class="skeleton-text">
            @for (item of countArray(); track $index) {
              <div
                class="skeleton-shimmer skeleton-line"
                [class.width-70]="$index === countArray().length - 1"
                [class.width-100]="$index !== countArray().length - 1"
              ></div>
            }
          </div>
        }
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .skeleton-container {
      width: 100%;
    }

    .skeleton-shimmer {
      background: linear-gradient(
        90deg,
        var(--pp-surface-variant, #f1f5f9) 25%,
        #e2e8f0 50%,
        var(--pp-surface-variant, #f1f5f9) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite linear;
      border-radius: 4px;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }

    .skeleton-circle {
      border-radius: 50%;
    }

    .skeleton-text {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .skeleton-line {
      height: 16px;
      border-radius: 4px;
    }

    .skeleton-card {
      padding: 16px;
      border-radius: 12px;
      border: 1px solid var(--pp-outline-variant);
      background: var(--pp-surface);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .skeleton-card-header {
      height: 24px;
      width: 40%;
    }

    .skeleton-table {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }

    .skeleton-table-row {
      display: flex;
      gap: 16px;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid var(--pp-outline-variant);
    }

    .skeleton-cell {
      height: 16px;
    }

    .width-100 {
      width: 100%;
    }
    .width-80 {
      width: 80%;
    }
    .width-70 {
      width: 70%;
    }
    .width-60 {
      width: 60%;
    }
    .cell-sm {
      width: 20%;
    }
    .cell-md {
      width: 45%;
    }
    .cell-lg {
      width: 30%;
    }
    .skeleton-circle {
      width: 44px;
      height: 44px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSkeletonComponent {
  public readonly variant = input<SkeletonVariant>('text');
  public readonly count = input<number>(3);
  public readonly size = input<string>('44px');

  public readonly countArray = computed(() => {
    return Array.from({ length: Math.max(1, this.count()) });
  });
}
