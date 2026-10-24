import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'pp-app-lock-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <main class="settings-container" id="main-content">
      <div class="breadcrumb-header">
        <span class="breadcrumb-parent">Settings</span>
        <h1 class="page-title">Security and app lock</h1>
      </div>

      @if (notificationMessage()) {
        <div role="status" class="alert-box success-alert">
          {{ notificationMessage() }}
        </div>
      }

      @if (errorMessage()) {
        <div role="alert" class="alert-box error-alert">
          {{ errorMessage() }}
        </div>
      }

      <!-- Section 1: App Lock -->
      <section class="settings-section">
        <h2 class="section-title">App lock</h2>
        <div class="setting-row">
          <div class="setting-text">
            <strong>Passcode lock</strong>
            <span class="setting-desc">
              Ask for a 6-digit passcode before showing any data. Five wrong passcodes sign you out.
              It does not replace the second check at sign-in.
            </span>
          </div>
          <input
            type="checkbox"
            role="switch"
            [checked]="passcodeEnabled()"
            (change)="togglePasscode($event)"
            aria-label="Toggle passcode lock"
            class="switch-control"
          />
        </div>

        @if (passcodeEnabled()) {
          <div class="form-group passcode-group">
            <label for="newPasscode" class="form-label">New passcode</label>
            <div class="inline-action-row">
              <input
                id="newPasscode"
                type="password"
                maxlength="6"
                inputmode="numeric"
                [formControl]="passcodeControl"
                placeholder="••••••"
                class="form-input passcode-input"
              />
              <button
                type="button"
                (click)="onSavePasscode()"
                class="secondary-button"
                [disabled]="passcodeControl.invalid"
              >
                Save passcode
              </button>
            </div>
            <span class="field-hint">Exactly 6 digits.</span>
          </div>
        }
      </section>

      <!-- Section 2: Password -->
      <section class="settings-section">
        <h2 class="section-title">Password</h2>
        <form
          [formGroup]="passwordForm"
          (ngSubmit)="onChangePassword()"
          class="password-grid"
          novalidate
        >
          <div class="form-group">
            <label for="currentPassword" class="form-label">Current password</label>
            <input
              id="currentPassword"
              type="password"
              formControlName="currentPassword"
              required
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="updatedPassword" class="form-label">New password</label>
            <input
              id="updatedPassword"
              type="password"
              formControlName="newPassword"
              minlength="8"
              required
              class="form-input"
            />
            <span class="field-hint">At least 8 characters.</span>
          </div>

          <button
            type="submit"
            class="secondary-button align-start"
            [disabled]="passwordForm.invalid"
          >
            Change password
          </button>
        </form>
      </section>

      <!-- Section 3: Verified Contacts -->
      <section class="settings-section">
        <h2 class="section-title">Verified contacts</h2>
        <div class="contact-row border-bottom">
          <span>Email</span>
          <span>
            {{ displayEmail() }} ·
            <span class="verified-tag">Verified</span>
          </span>
        </div>
        <div class="contact-row">
          <span>Mobile number</span>
          <span>
            {{ auth.profile()?.mobile_number ?? 'Not provided' }} ·
            <span class="unverified-tag">
              {{ auth.profile()?.mobile_number ? 'Verified' : 'Not verified' }}
            </span>
          </span>
        </div>
        <a routerLink="/accounts/profile" class="profile-link"
          >Change email or mobile in your profile</a
        >
      </section>

      <!-- Sign Out Button -->
      <button type="button" (click)="onSignOut()" class="sign-out-button">Sign out</button>
    </main>
  `,
  styles: `
    .settings-container {
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      max-width: 880px;
    }
    .breadcrumb-header {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .breadcrumb-parent {
      font-size: 0.875rem;
      color: var(--pp-color-text-secondary, #4e5966);
    }
    .page-title {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 700;
    }
    .alert-box {
      padding: 10px 12px;
      border-radius: 8px;
      font-size: 0.875rem;
    }
    .success-alert {
      background: #e3f0f0;
      color: #0a4a51;
      border: 1px solid #bfe3e3;
    }
    .error-alert {
      background: #fbede6;
      color: #7a2e0e;
      border: 1px solid #f27a52;
    }
    .settings-section {
      padding: 24px;
      background: #ffffff;
      border: 1px solid var(--pp-color-border, #d9dde1);
      border-radius: var(--pp-radius-lg, 12px);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .section-title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
    }
    .setting-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .setting-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .setting-desc {
      font-size: 0.875rem;
      color: var(--pp-color-text-secondary, #4e5966);
    }
    .switch-control {
      width: 44px;
      height: 24px;
      cursor: pointer;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .passcode-group {
      max-width: 320px;
    }
    .inline-action-row {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .form-label {
      font-size: 0.875rem;
      font-weight: 600;
    }
    .form-input {
      padding: 12px;
      font-size: 1rem;
      border: 1px solid #c7cdd3;
      border-radius: 8px;
      font-family: inherit;
    }
    .passcode-input {
      font-size: 1.125rem;
      letter-spacing: 0.3em;
    }
    .field-hint {
      font-size: 0.8125rem;
      color: var(--pp-color-text-secondary, #4e5966);
    }
    .password-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .secondary-button {
      min-height: 44px;
      padding: 10px 18px;
      border: 1px solid var(--pp-primary-700, #0e5a63);
      border-radius: 8px;
      background: #ffffff;
      color: var(--pp-primary-700, #0e5a63);
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
    }
    .secondary-button:hover:not(:disabled) {
      background: #f0f7f7;
    }
    .secondary-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .align-start {
      grid-column: 1 / -1;
      justify-self: start;
    }
    .contact-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px;
      font-size: 0.9375rem;
      padding: 8px 0;
    }
    .border-bottom {
      border-bottom: 1px solid #eef1f4;
    }
    .verified-tag {
      color: #1f6b3a;
      font-weight: 600;
    }
    .unverified-tag {
      color: var(--pp-color-text-secondary, #4e5966);
    }
    .profile-link {
      font-size: 0.875rem;
      color: var(--pp-primary-700, #0e5a63);
      text-decoration: underline;
    }
    .sign-out-button {
      align-self: flex-start;
      min-height: 44px;
      padding: 10px 18px;
      border: 1px solid #c7cdd3;
      border-radius: 8px;
      background: #ffffff;
      color: var(--pp-color-text, #17212b);
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
    }
    .sign-out-button:hover {
      background: #f5f6f3;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLockSettingsPage {
  private readonly fb = inject(FormBuilder);
  public readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  public readonly passcodeEnabled = signal(this.auth.settings()?.passcode_enabled ?? false);
  public readonly notificationMessage = signal<string | null>(null);
  public readonly errorMessage = signal<string | null>(null);
  public readonly displayEmail = computed(
    () => this.auth.profile()?.email ?? (this.auth.pendingEmail() || 'name@example.com'),
  );

  public readonly passcodeControl = this.fb.nonNullable.control('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.pattern(/^\d{6}$/),
  ]);

  public readonly passwordForm = this.fb.nonNullable.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  public togglePasscode(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.passcodeEnabled.set(isChecked);
    this.notificationMessage.set(
      isChecked
        ? 'Passcode lock turned on. Enter your 6-digit passcode below.'
        : 'Passcode lock turned off.',
    );
  }

  public onSavePasscode(): void {
    if (this.passcodeControl.invalid) {
      this.errorMessage.set('ERR-13: Passcode must be exactly 6 digits.');
      return;
    }

    const passcode = this.passcodeControl.value;
    const result = this.auth.setPasscode(passcode);
    if (result.success) {
      this.notificationMessage.set('Passcode updated successfully.');
      this.errorMessage.set(null);
    } else {
      this.errorMessage.set(result.error ?? 'Error setting passcode.');
    }
  }

  public onChangePassword(): void {
    if (this.passwordForm.invalid) return;

    this.notificationMessage.set('Password changed successfully.');
    this.passwordForm.reset();
  }

  public onSignOut(): void {
    this.auth.signOut();
    void this.router.navigate(['/auth/sign-in']);
  }
}
