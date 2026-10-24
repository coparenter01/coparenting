import type { ElementRef } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'pp-confirm-dialog',
  template: `
    @if (open()) {
      <div class="dialog-overlay" (click)="onBackdropClick($event)" role="presentation">
        <div
          #dialogPanel
          class="dialog-panel"
          [class.dialog-panel--destructive]="destructive()"
          role="alertdialog"
          [attr.aria-modal]="true"
          [attr.aria-labelledby]="dialogTitleId"
          [attr.aria-describedby]="dialogDescId"
          tabindex="-1"
        >
          <div class="dialog-header">
            @if (destructive()) {
              <div class="icon-wrap icon-wrap--destructive" aria-hidden="true">
                <span class="material-symbols-rounded">warning</span>
              </div>
            } @else {
              <div class="icon-wrap icon-wrap--info" aria-hidden="true">
                <span class="material-symbols-rounded">help_outline</span>
              </div>
            }
            <div class="header-text">
              <h2 [id]="dialogTitleId" class="dialog-title">{{ title() }}</h2>
            </div>
          </div>

          <div class="dialog-content">
            <p [id]="dialogDescId" class="dialog-message">{{ message() }}</p>
          </div>

          <div class="dialog-actions">
            <button type="button" class="btn btn-secondary" (click)="cancelClicked.emit()">
              {{ cancelText() }}
            </button>
            <button
              type="button"
              class="btn"
              [class.btn-danger]="destructive()"
              [class.btn-primary]="!destructive()"
              (click)="confirmClicked.emit()"
            >
              {{ confirmText() }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      display: contents;
    }

    .dialog-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.48);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 1000;
      animation: fadeIn 150ms ease-out;

      @media (max-width: 599px) {
        padding: 0;
        align-items: flex-end;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .dialog-panel {
      background: var(--pp-surface);
      border-radius: 16px;
      width: 100%;
      max-width: 480px;
      box-shadow:
        0 10px 25px -5px rgba(0, 0, 0, 0.1),
        0 8px 10px -6px rgba(0, 0, 0, 0.1);
      border: 1px solid var(--pp-outline-variant);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: scaleIn 150ms ease-out;

      @media (max-width: 599px) {
        max-width: 100%;
        border-radius: 16px 16px 0 0;
        animation: slideUp 200ms ease-out;
      }
    }

    @keyframes scaleIn {
      from {
        transform: scale(0.96);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    @keyframes slideUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 24px 12px;
    }

    .icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .icon-wrap--destructive {
      background: var(--pp-error-subtle);
      color: var(--pp-error);
    }

    .icon-wrap--info {
      background: var(--pp-primary-50);
      color: var(--pp-primary-600);
    }

    .dialog-title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--pp-ink);
      line-height: 1.3;
    }

    .dialog-content {
      padding: 0 24px 20px;
    }

    .dialog-message {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--pp-ink-2);
      line-height: 1.5;
    }

    .dialog-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 24px;
      background: var(--pp-surface-variant);
      border-top: 1px solid var(--pp-outline-variant);

      @media (max-width: 480px) {
        flex-direction: column-reverse;
        width: 100%;

        .btn {
          width: 100%;
          justify-content: center;
        }
      }
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      height: 42px;
      padding: 0 20px;
      border-radius: 8px;
      font-size: 0.9375rem;
      font-weight: 600;
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

    .btn-secondary {
      background: transparent;
      color: var(--pp-ink);
      border: 1px solid var(--pp-outline-variant);

      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }
    }

    .btn-primary {
      background: var(--pp-primary-600);
      color: #ffffff;

      &:hover {
        background: var(--pp-primary-700);
      }
    }

    .btn-danger {
      background: var(--pp-error);
      color: #ffffff;

      &:hover {
        background: #b91c1c;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  public readonly open = input<boolean>(false);
  public readonly title = input<string>('Confirm action');
  public readonly message = input.required<string>();
  public readonly confirmText = input<string>('Confirm');
  public readonly cancelText = input<string>('Cancel');
  public readonly destructive = input<boolean>(false);

  public readonly confirmClicked = output();
  public readonly cancelClicked = output();

  public readonly dialogPanel = viewChild<ElementRef<HTMLElement>>('dialogPanel');

  public readonly dialogTitleId = `confirm-title-${Math.random().toString(36).substring(2, 9)}`;
  public readonly dialogDescId = `confirm-desc-${Math.random().toString(36).substring(2, 9)}`;

  @HostListener('document:keydown.escape')
  public onEscape(): void {
    if (this.open()) {
      this.cancelClicked.emit();
    }
  }

  public onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.cancelClicked.emit();
    }
  }
}
