import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  TemplateRef,
  computed,
  contentChild,
  inject,
  input,
  output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { ErrorStateComponent } from '../error-state/error-state.component';
import { LoadingSkeletonComponent } from '../loading-skeleton/loading-skeleton.component';

export interface DataColumn<T> {
  readonly key: keyof T | string;
  readonly header: string;
  readonly width?: string;
  readonly align?: 'left' | 'center' | 'right';
}

@Directive({
  selector: '[ppCardTemplate]',
})
export class CardTemplateDirective {
  public readonly template = inject(TemplateRef);
}

@Directive({
  selector: '[ppRowTemplate]',
})
export class RowTemplateDirective {
  public readonly template = inject(TemplateRef);
}

@Component({
  selector: 'pp-data-list',
  imports: [EmptyStateComponent, ErrorStateComponent, LoadingSkeletonComponent, NgTemplateOutlet],
  template: `
    <div class="data-list-wrapper">
      @if (loading() && items().length === 0) {
        <pp-loading-skeleton [variant]="isMobile() ? 'card' : 'table'" [count]="skeletonCount()" />
      } @else if (error()) {
        <pp-error-state
          [title]="errorTitle()"
          [message]="errorMessage()"
          (retryClicked)="retry.emit()"
        />
      } @else if (items().length === 0) {
        <pp-empty-state
          [icon]="emptyIcon()"
          [title]="emptyTitle()"
          [description]="emptyDescription()"
          [actionLabel]="emptyActionLabel()"
          [actionIcon]="emptyActionIcon()"
          (actionClicked)="emptyAction.emit()"
        />
      } @else {
        <!-- Desktop / Tablet Table View (≥768px) -->
        @if (!isMobile()) {
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  @for (col of columns(); track col.header) {
                    <th [class]="'align-' + (col.align ?? 'left')">
                      {{ col.header }}
                    </th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (item of items(); track trackBy() ? trackBy()!(item) : $index) {
                  <tr>
                    @if (rowTemplate(); as rt) {
                      <ng-container
                        *ngTemplateOutlet="rt.template; context: { $implicit: item, index: $index }"
                      />
                    } @else {
                      @for (col of columns(); track col.header) {
                        <td [class]="'align-' + (col.align ?? 'left')">
                          {{ getItemValue(item, col.key) }}
                        </td>
                      }
                    }
                  </tr>
                }
              </tbody>
            </table>
          </div>
        } @else {
          <!-- Mobile Stacked Cards View (<768px) -->
          <div class="cards-container">
            @for (item of items(); track trackBy() ? trackBy()!(item) : $index) {
              <div class="data-card">
                @if (cardTemplate(); as ct) {
                  <ng-container
                    *ngTemplateOutlet="ct.template; context: { $implicit: item, index: $index }"
                  />
                } @else {
                  <div class="card-default-body">
                    @for (col of columns(); track col.header) {
                      <div class="card-field">
                        <span class="field-label">{{ col.header }}</span>
                        <span class="field-value">{{ getItemValue(item, col.key) }}</span>
                      </div>
                    }
                  </div>
                }
              </div>
            }
          </div>
        }

        <!-- Load More Pagination -->
        @if (hasMore()) {
          <div class="load-more-wrap">
            <button
              type="button"
              class="btn btn-outline"
              [disabled]="loadingMore()"
              (click)="loadMore.emit()"
            >
              @if (loadingMore()) {
                <span class="material-symbols-rounded btn-spinner" aria-hidden="true"
                  >progress_activity</span
                >
                Loading...
              } @else {
                Load more
              }
            </button>
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

    .data-list-wrapper {
      width: 100%;
    }

    /* ── Desktop Table ── */
    .table-container {
      width: 100%;
      overflow-x: auto;
      background: var(--pp-surface);
      border: 1px solid var(--pp-outline-variant);
      border-radius: 12px;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.9375rem;

      th {
        padding: 14px 16px;
        background: var(--pp-surface-variant);
        font-weight: 600;
        color: var(--pp-ink);
        border-bottom: 1px solid var(--pp-outline-variant);
        white-space: nowrap;
      }

      td {
        padding: 14px 16px;
        border-bottom: 1px solid var(--pp-outline-variant);
        color: var(--pp-ink);
        font-variant-numeric: tabular-nums;
      }

      tr:last-child td {
        border-bottom: none;
      }

      tbody tr:hover {
        background: var(--pp-primary-50);
      }
    }

    .align-left {
      text-align: left;
    }
    .align-center {
      text-align: center;
    }
    .align-right {
      text-align: right;
    }

    /* ── Mobile Stacked Cards ── */
    .cards-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .data-card {
      background: var(--pp-surface);
      border: 1px solid var(--pp-outline-variant);
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 1px 2px rgb(22 35 46 / 4%);
    }

    .card-default-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .card-field {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      font-size: 0.875rem;
    }

    .field-label {
      color: var(--pp-ink-3);
      font-weight: 500;
    }

    .field-value {
      color: var(--pp-ink);
      font-weight: 600;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }

    /* ── Load More ── */
    .load-more-wrap {
      display: flex;
      justify-content: center;
      padding: 24px 0 12px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      height: 42px;
      padding: 0 24px;
      border-radius: 8px;
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
      background: var(--pp-surface);
      color: var(--pp-primary-600);
      border: 1px solid var(--pp-primary-600);
      transition: background 150ms ease;

      &:hover:not(:disabled) {
        background: var(--pp-primary-50);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:focus-visible {
        outline: var(--pp-focus-ring);
        outline-offset: 2px;
      }
    }

    .btn-spinner {
      font-size: 18px;
      animation: spin 1s infinite linear;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataListComponent<T extends Record<string, unknown>> {
  public readonly items = input<readonly T[]>([]);
  public readonly columns = input<readonly DataColumn<T>[]>([]);
  public readonly loading = input<boolean>(false);
  public readonly loadingMore = input<boolean>(false);
  public readonly hasMore = input<boolean>(false);
  public readonly skeletonCount = input<number>(5);

  public readonly error = input<boolean>(false);
  public readonly errorTitle = input<string>('Unable to load items');
  public readonly errorMessage = input<string>('We could not load this list. Please try again.');

  public readonly emptyIcon = input<string>('inbox');
  public readonly emptyTitle = input<string>('No items yet');
  public readonly emptyDescription = input<string>('Items will appear here once added.');
  public readonly emptyActionLabel = input<string>();
  public readonly emptyActionIcon = input<string>();

  public readonly trackBy = input<(item: T) => unknown>();

  public readonly retry = output();
  public readonly loadMore = output();
  public readonly emptyAction = output();

  public readonly cardTemplate = contentChild(CardTemplateDirective);
  public readonly rowTemplate = contentChild(RowTemplateDirective);

  private readonly _bp = inject(BreakpointObserver);
  private readonly _isMobileSignal = toSignal(
    this._bp.observe('(max-width: 767px)').pipe(map((s) => s.matches)),
    { initialValue: false },
  );

  public readonly isMobile = computed(() => this._isMobileSignal());

  public getItemValue(item: T, key: keyof T | string): string {
    const val = (item as Record<string, unknown>)[key as string];
    if (val === null || val === undefined) {
      return '—';
    }
    if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
      return String(val);
    }
    return JSON.stringify(val);
  }
}
