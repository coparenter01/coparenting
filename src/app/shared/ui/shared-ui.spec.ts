import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import {
  ConfirmDialogComponent,
  DataListComponent,
  EmptyStateComponent,
  ErrorStateComponent,
  LoadingSkeletonComponent,
  PageHeaderComponent,
  StatusChipComponent,
  TestModeBadgeComponent,
} from './index';

describe('Shared UI Components', () => {
  it('should render StatusChipComponent with appropriate category', () => {
    const fixture = TestBed.createComponent(StatusChipComponent);
    fixture.componentRef.setInput('variant', 'approved');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const chip = element.querySelector('.chip');
    expect(chip).toBeTruthy();
    expect(chip?.classList.contains('chip--success')).toBe(true);
    expect(element.textContent).toContain('approved');
  });

  it('should render TestModeBadgeComponent with flask icon', () => {
    const fixture = TestBed.createComponent(TestModeBadgeComponent);
    fixture.componentRef.setInput('label', 'Test mode');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Test mode');
    const icon = element.querySelector('.material-symbols-rounded');
    expect(icon?.textContent).toContain('science');
  });

  it('should render PageHeaderComponent with title and screenId badge', () => {
    const fixture = TestBed.createComponent(PageHeaderComponent);
    fixture.componentRef.setInput('title', 'Expense Log');
    fixture.componentRef.setInput('screenId', 'EXP-SCR-01');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const title = element.querySelector('.page-title');
    const badge = element.querySelector('.screen-id-badge');

    expect(title?.textContent).toContain('Expense Log');
    expect(badge?.textContent).toContain('EXP-SCR-01');
  });

  it('should render EmptyStateComponent and trigger actionClicked', () => {
    const fixture = TestBed.createComponent(EmptyStateComponent);
    fixture.componentRef.setInput('title', 'No events found');
    fixture.componentRef.setInput('actionLabel', 'Add Event');
    fixture.detectChanges();

    let clicked = false;
    fixture.componentInstance.actionClicked.subscribe(() => {
      clicked = true;
    });

    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector('button');
    expect(button).toBeTruthy();
    button?.click();
    expect(clicked).toBe(true);
  });

  it('should render ErrorStateComponent and trigger retryClicked', () => {
    const fixture = TestBed.createComponent(ErrorStateComponent);
    fixture.componentRef.setInput('title', 'Connection failed');
    fixture.componentRef.setInput('retryable', true);
    fixture.detectChanges();

    let retried = false;
    fixture.componentInstance.retryClicked.subscribe(() => {
      retried = true;
    });

    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector('button');
    expect(button).toBeTruthy();
    button?.click();
    expect(retried).toBe(true);
  });

  it('should render LoadingSkeletonComponent with requested variant', () => {
    const fixture = TestBed.createComponent(LoadingSkeletonComponent);
    fixture.componentRef.setInput('variant', 'card');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.skeleton-card')).toBeTruthy();
  });

  it('should render ConfirmDialogComponent when open', () => {
    const fixture = TestBed.createComponent(ConfirmDialogComponent);
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('title', 'Confirm Deletion');
    fixture.componentRef.setInput('message', 'Are you sure?');
    fixture.componentRef.setInput('destructive', true);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.dialog-overlay')).toBeTruthy();
    expect(element.querySelector('.dialog-title')?.textContent).toContain('Confirm Deletion');
  });

  it('should render DataListComponent in empty state when items array is empty', () => {
    const fixture = TestBed.createComponent(DataListComponent);
    fixture.componentRef.setInput('items', []);
    fixture.componentRef.setInput('columns', [{ key: 'id', header: 'ID' }]);
    fixture.componentRef.setInput('emptyTitle', 'No items in table');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('pp-empty-state')).toBeTruthy();
    expect(element.textContent).toContain('No items in table');
  });
});
