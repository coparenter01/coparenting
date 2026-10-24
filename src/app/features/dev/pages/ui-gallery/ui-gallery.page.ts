import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ConfirmDialogComponent,
  DataListComponent,
  EmptyStateComponent,
  ErrorStateComponent,
  LoadingSkeletonComponent,
  PageHeaderComponent,
  StatusChipComponent,
  TestModeBadgeComponent,
} from '@shared/ui';
import type { DataColumn, StatusChipVariant } from '@shared/ui';

interface SampleExpense {
  [key: string]: unknown;
  readonly id: string;
  readonly date: string;
  readonly category: string;
  readonly description: string;
  readonly amount: string;
  readonly paidBy: string;
  readonly status: StatusChipVariant;
}

@Component({
  selector: 'pp-ui-gallery',
  imports: [
    PageHeaderComponent,
    StatusChipComponent,
    TestModeBadgeComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    LoadingSkeletonComponent,
    ConfirmDialogComponent,
    DataListComponent,
  ],
  template: `
    <div class="gallery-container">
      <pp-page-header
        title="Component Gallery"
        subtitle="Shared UI kit showcase rendering components across all lifecycle states."
        screenId="DEV-UI-01"
      >
        <div actions class="header-action-wrap">
          <pp-test-mode-badge label="Dev sandbox" />
        </div>
      </pp-page-header>

      <!-- Section: Status Chips & Badges -->
      <section class="gallery-section">
        <h2>1. Status Chips & Badges</h2>
        <p class="section-desc">Semantic badges with accessible contrast and status icons.</p>
        <div class="chips-grid">
          <div class="chip-item">
            <span class="chip-label">Success:</span>
            <pp-status-chip variant="approved" />
            <pp-status-chip variant="paid" />
            <pp-status-chip variant="delivered" />
          </div>
          <div class="chip-item">
            <span class="chip-label">Warning:</span>
            <pp-status-chip variant="pending" />
            <pp-status-chip variant="disputed" />
          </div>
          <div class="chip-item">
            <span class="chip-label">Danger:</span>
            <pp-status-chip variant="declined" />
            <pp-status-chip variant="overdue" />
            <pp-status-chip variant="failed" />
          </div>
          <div class="chip-item">
            <span class="chip-label">Neutral & Privacy:</span>
            <pp-status-chip variant="draft" />
            <pp-status-chip variant="archived" />
            <pp-status-chip variant="private" />
            <pp-test-mode-badge />
          </div>
        </div>
      </section>

      <!-- Section: Loading Skeletons -->
      <section class="gallery-section">
        <h2>2. Loading Skeletons (Shape-matched)</h2>
        <p class="section-desc">
          Shimmer animations shaped like content instead of generic spinners.
        </p>
        <div class="skeletons-grid">
          <div class="card">
            <h3>Text lines</h3>
            <pp-loading-skeleton variant="text" [count]="3" />
          </div>
          <div class="card">
            <h3>Card shape</h3>
            <pp-loading-skeleton variant="card" />
          </div>
          <div class="card">
            <h3>Avatar circle</h3>
            <pp-loading-skeleton variant="circle" size="56px" />
          </div>
        </div>
      </section>

      <!-- Section: Empty & Error States -->
      <section class="gallery-section">
        <h2>3. Empty & Error States</h2>
        <div class="states-grid">
          <div class="card">
            <h3>Empty State</h3>
            <pp-empty-state
              icon="receipt_long"
              title="No expenses recorded yet"
              description="Add shared receipts and child expenses to track reimbursement balances."
              actionLabel="Add expense"
              actionIcon="add"
              (actionClicked)="onActionToast('Add expense clicked')"
            />
          </div>
          <div class="card">
            <h3>Error State (Inline)</h3>
            <pp-error-state
              title="Failed to load sync status"
              message="The agency connection timed out. Your local records are safe."
              (retryClicked)="onActionToast('Retry clicked')"
            />
          </div>
        </div>
      </section>

      <!-- Section: Confirmation Dialogs -->
      <section class="gallery-section">
        <h2>4. Confirmation Dialogs</h2>
        <p class="section-desc">Modal on desktop, full-screen bottom sheet on mobile (<600px).</p>
        <div class="dialog-triggers">
          <button type="button" class="btn btn-secondary" (click)="openNormalDialog.set(true)">
            Open approval confirm
          </button>
          <button type="button" class="btn btn-danger" (click)="openDestructiveDialog.set(true)">
            Open destructive confirm
          </button>
        </div>

        <pp-confirm-dialog
          [open]="openNormalDialog()"
          title="Approve Schedule Swap?"
          message="This will update both parent calendars for the weekend of Nov 14–16. You have a 10-minute undo window."
          confirmText="Approve swap"
          (confirmClicked)="onDialogConfirmed('Swap approved', openNormalDialog)"
          (cancelClicked)="openNormalDialog.set(false)"
        />

        <pp-confirm-dialog
          [open]="openDestructiveDialog()"
          [destructive]="true"
          title="Archive Expense Record?"
          message="Archiving will remove this expense from the current reimbursement cycle. Earlier versions remain in the court-ready audit record."
          confirmText="Archive expense"
          (confirmClicked)="onDialogConfirmed('Expense archived', openDestructiveDialog)"
          (cancelClicked)="openDestructiveDialog.set(false)"
        />
      </section>

      <!-- Section: Responsive Data List (4 States) -->
      <section class="gallery-section">
        <h2>5. Responsive Data List (Table ↔ Cards)</h2>
        <p class="section-desc">
          Automatically renders as a responsive data table on desktop (≥768px) and converts to
          stacked cards on mobile (<768px).
        </p>

        <!-- State switch buttons -->
        <div class="state-switcher" role="group" aria-label="Data list state preview">
          <span class="switcher-label">Simulate state:</span>
          <button
            type="button"
            class="switch-btn"
            [class.active]="dataListState() === 'success'"
            (click)="dataListState.set('success')"
          >
            Success (Data)
          </button>
          <button
            type="button"
            class="switch-btn"
            [class.active]="dataListState() === 'loading'"
            (click)="dataListState.set('loading')"
          >
            Loading
          </button>
          <button
            type="button"
            class="switch-btn"
            [class.active]="dataListState() === 'empty'"
            (click)="dataListState.set('empty')"
          >
            Empty
          </button>
          <button
            type="button"
            class="switch-btn"
            [class.active]="dataListState() === 'error'"
            (click)="dataListState.set('error')"
          >
            Error
          </button>
        </div>

        <div class="data-list-preview">
          <pp-data-list
            [columns]="expenseColumns"
            [items]="dataListState() === 'success' ? sampleExpenses : []"
            [loading]="dataListState() === 'loading'"
            [error]="dataListState() === 'error'"
            [hasMore]="dataListState() === 'success'"
            emptyTitle="No shared expenses"
            emptyDescription="All child medical, school, and extracurricular expenses will be listed here."
            emptyActionLabel="Record first expense"
            (emptyAction)="onActionToast('Create expense clicked')"
            (loadMore)="onActionToast('Loading more rows...')"
            (retry)="dataListState.set('success')"
          />
        </div>
      </section>

      <!-- Toast banner for interactive actions -->
      @if (toastMessage()) {
        <div class="toast-banner" role="status">
          <span class="material-symbols-rounded">info</span>
          {{ toastMessage() }}
        </div>
      }
    </div>
  `,
  styleUrl: './ui-gallery.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiGalleryPage {
  public readonly openNormalDialog = signal(false);
  public readonly openDestructiveDialog = signal(false);
  public readonly dataListState = signal<'success' | 'loading' | 'empty' | 'error'>('success');
  public readonly toastMessage = signal<string | null>(null);

  public readonly expenseColumns: readonly DataColumn<SampleExpense>[] = [
    { key: 'date', header: 'Date', width: '120px' },
    { key: 'category', header: 'Category', width: '140px' },
    { key: 'description', header: 'Description' },
    { key: 'amount', header: 'Amount', width: '110px', align: 'right' },
    { key: 'paidBy', header: 'Paid By', width: '120px' },
    { key: 'status', header: 'Status', width: '120px', align: 'center' },
  ];

  public readonly sampleExpenses: readonly SampleExpense[] = [
    {
      id: 'exp-1',
      date: '2026-10-20',
      category: 'Medical',
      description: 'Pediatric dental cleaning & fluoride',
      amount: '$140.00',
      paidBy: 'Sarah',
      status: 'approved',
    },
    {
      id: 'exp-2',
      date: '2026-10-18',
      category: 'School',
      description: 'Fall semester textbooks & lab fees',
      amount: '$215.50',
      paidBy: 'Michael',
      status: 'paid',
    },
    {
      id: 'exp-3',
      date: '2026-10-15',
      category: 'Extracurricular',
      description: 'Soccer club registration & uniform',
      amount: '$95.00',
      paidBy: 'Sarah',
      status: 'pending',
    },
    {
      id: 'exp-4',
      date: '2026-10-10',
      category: 'Clothing',
      description: 'Winter boots & waterproof jacket',
      amount: '$88.00',
      paidBy: 'Michael',
      status: 'disputed',
    },
  ];

  public onActionToast(message: string): void {
    this.toastMessage.set(message);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3000);
  }

  public onDialogConfirmed(
    toastMsg: string,
    dialogSignal: ReturnType<typeof signal<boolean>>,
  ): void {
    dialogSignal.set(false);
    this.onActionToast(toastMsg);
  }
}
