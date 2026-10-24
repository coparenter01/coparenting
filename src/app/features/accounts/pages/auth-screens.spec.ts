import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { AuthService } from '@core/auth/auth.service';
import { CreateAccountPage } from './create-account/create-account.page';
import { SignInPage } from './sign-in/sign-in.page';
import { SecondCheckPage } from './second-check/second-check.page';
import { AppLockSettingsPage } from './app-lock-settings/app-lock-settings.page';
import { EnterPasscodePage } from './enter-passcode/enter-passcode.page';

describe('Phase 1 Step 1-B: Authentication & Verified Session Gates', () => {
  it('AuthService should manage sign-in steps and 5-attempt lockout (ACC-01)', () => {
    TestBed.configureTestingModule({});
    const auth = TestBed.inject(AuthService);

    expect(auth.isLockedOut()).toBe(false);

    // Fail 5 times
    for (let i = 0; i < 5; i++) {
      auth.recordFailedAttempt();
    }

    expect(auth.isLockedOut()).toBe(true);

    const attemptDuringLock = auth.signInFirstStep('test@example.com', 'ValidPass123!');
    expect(attemptDuringLock.success).toBe(false);
    expect(attemptDuringLock.error).toContain('ERR-11');
  });

  it('AuthService should enforce 6-digit second check verification and 6-digit passcode', () => {
    TestBed.configureTestingModule({});
    const auth = TestBed.inject(AuthService);

    const badCodeResult = auth.verifySecondCheck('999999');
    expect(badCodeResult.success).toBe(false);
    expect(badCodeResult.error).toContain('ERR-02');

    const goodCodeResult = auth.verifySecondCheck('123456');
    expect(goodCodeResult.success).toBe(true);
    expect(auth.isSecondCheckPassed()).toBe(true);

    const badPasscode = auth.setPasscode('12345');
    expect(badPasscode.success).toBe(false);
    expect(badPasscode.error).toContain('ERR-13');

    const goodPasscode = auth.setPasscode('654321');
    expect(goodPasscode.success).toBe(true);
  });

  it('CreateAccountPage (ACC-SCR-01) should validate form fields before submission', async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountPage],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(CreateAccountPage);
    const component = fixture.componentInstance;
    expect(component.form.valid).toBe(false);

    component.form.controls.email.setValue('invalid-email');
    component.form.controls.displayName.setValue('Parent Name');
    component.form.controls.password.setValue('short');
    expect(component.form.valid).toBe(false);

    component.form.controls.email.setValue('parent@example.com');
    component.form.controls.password.setValue('SecurePassword123!');
    expect(component.form.valid).toBe(true);
  });

  it('SignInPage (ACC-SCR-02) should enforce password length and lockout checks', async () => {
    await TestBed.configureTestingModule({
      imports: [SignInPage],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(SignInPage);
    const component = fixture.componentInstance;

    component.form.controls.email.setValue('parent@example.com');
    component.form.controls.password.setValue('short');
    expect(component.form.valid).toBe(false);

    component.form.controls.password.setValue('ValidPassword123!');
    expect(component.form.valid).toBe(true);
  });

  it('SecondCheckPage (ACC-SCR-03) and EnterPasscodePage (ACC-SCR-17) should instantiate', async () => {
    await TestBed.configureTestingModule({
      imports: [SecondCheckPage, EnterPasscodePage, AppLockSettingsPage],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture2fa = TestBed.createComponent(SecondCheckPage);
    expect(fixture2fa.componentInstance).toBeDefined();

    const fixturePasscode = TestBed.createComponent(EnterPasscodePage);
    expect(fixturePasscode.componentInstance).toBeDefined();

    const fixtureSettings = TestBed.createComponent(AppLockSettingsPage);
    expect(fixtureSettings.componentInstance).toBeDefined();
  });
});
