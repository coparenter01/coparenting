import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { describe, expect, it, vi } from 'vitest';
import { SafetyModeService } from '@core/safety/safety-mode.service';
import { AiDataPage } from './ai-data/ai-data.page';
import { AiUseLogPage } from './ai-use-log/ai-use-log.page';
import { AlertsImagesSettingsPage } from './alerts-images-settings/alerts-images-settings.page';
import { AlertsWarningPage } from './alerts-warning/alerts-warning.page';
import { ExitConfirmationPage } from './exit-confirmation/exit-confirmation.page';
import { ExitNeutralPage } from './exit-neutral/exit-neutral.page';
import { FamilyViolenceOfferPage } from './family-violence-offer/family-violence-offer.page';
import { HiddenImagePreviewPage } from './hidden-image-preview/hidden-image-preview.page';
import { SafetyNoticePage } from './safety-notice/safety-notice.page';
import { SafetyResourcesPage } from './safety-resources/safety-resources.page';
import { SafetySettingsPage } from './safety-settings/safety-settings.page';
import { SafetyTurnOffPage } from './safety-turn-off/safety-turn-off.page';

describe('Phase 2: Safety and Privacy Module (SAF-SCR-01..12)', () => {
  it('SafetyModeService should manage state, 6-digit code, and AI audit log', () => {
    const service = new SafetyModeService();

    expect(service.safetyModeActive()).toBe(false);

    // Turn on
    service.enableSafetyMode('654321');
    expect(service.safetyModeActive()).toBe(true);
    expect(service.alertPreviewLevel()).toBe('none');
    expect(service.maskImages()).toBe(true);

    // Fail turn off with wrong code
    expect(service.disableSafetyMode('000000')).toBe(false);
    expect(service.safetyModeActive()).toBe(true);

    // Success turn off with correct code
    expect(service.disableSafetyMode('654321')).toBe(true);
    expect(service.safetyModeActive()).toBe(false);

    // Test AI audit log
    service.recordAiUsage({
      featureName: 'Tone check',
      itemType: 'Draft',
      actionTaken: 'De-escalation check',
      dataRetained: false,
    });
    expect(service.aiAuditLog().length).toBeGreaterThanOrEqual(4);
  });

  it('SafetySettingsPage (SAF-SCR-01) should render and navigate to turn on/off', async () => {
    await TestBed.configureTestingModule({
      imports: [SafetySettingsPage],
      providers: [provideRouter([]), provideLocationMocks(), SafetyModeService],
    }).compileComponents();

    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(SafetySettingsPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h1');
    expect(title?.textContent).toContain('Privacy and safety');

    fixture.componentInstance.onToggleClick();
    expect(navigateSpy).toHaveBeenCalledWith(['/safety/turn-on']);
  });

  it('SafetyNoticePage (SAF-SCR-02) should enable safety mode on confirmation', async () => {
    await TestBed.configureTestingModule({
      imports: [SafetyNoticePage],
      providers: [provideRouter([]), provideLocationMocks(), SafetyModeService],
    }).compileComponents();

    const safety = TestBed.inject(SafetyModeService);
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(SafetyNoticePage);
    fixture.detectChanges();

    fixture.componentInstance.onConfirmTurnOn();
    expect(safety.safetyModeActive()).toBe(true);
    expect(navigateSpy).toHaveBeenCalledWith(['/safety']);
  });

  it('SafetyTurnOffPage (SAF-SCR-03) should validate 6-digit code and disable safety mode', async () => {
    await TestBed.configureTestingModule({
      imports: [SafetyTurnOffPage],
      providers: [provideRouter([]), provideLocationMocks(), SafetyModeService],
    }).compileComponents();

    const safety = TestBed.inject(SafetyModeService);
    safety.enableSafetyMode('123456');

    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(SafetyTurnOffPage);
    fixture.detectChanges();

    // Invalid code length
    fixture.componentInstance.turnOffForm.controls.code.setValue('12');
    expect(fixture.componentInstance.turnOffForm.invalid).toBe(true);

    // Wrong 6-digit code
    fixture.componentInstance.turnOffForm.controls.code.setValue('999999');
    fixture.componentInstance.onSubmit();
    expect(fixture.componentInstance.errorMessage()).toContain('Incorrect');

    // Correct code
    fixture.componentInstance.turnOffForm.controls.code.setValue('123456');
    fixture.componentInstance.onSubmit();
    expect(safety.safetyModeActive()).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/safety']);
  });

  it('ExitNeutralPage (SAF-SCR-04) should render disguise explanation', async () => {
    await TestBed.configureTestingModule({
      imports: [ExitNeutralPage],
      providers: [provideRouter([]), provideLocationMocks(), SafetyModeService],
    }).compileComponents();

    const fixture = TestBed.createComponent(ExitNeutralPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h2');
    expect(heading?.textContent).toContain('What Exit now does');
  });

  it('SafetyResourcesPage (SAF-SCR-05) should render 911 urgent alert and hotline', async () => {
    await TestBed.configureTestingModule({
      imports: [SafetyResourcesPage],
      providers: [provideRouter([]), provideLocationMocks(), SafetyModeService],
    }).compileComponents();

    const fixture = TestBed.createComponent(SafetyResourcesPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const mainText = compiled.textContent;
    expect(mainText).toContain('National Domestic Violence Hotline');
    expect(mainText).toContain('1-800-799-7233');
  });

  it('FamilyViolenceOfferPage (SAF-SCR-06) should enable safety mode when accepted', async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyViolenceOfferPage],
      providers: [provideRouter([]), provideLocationMocks(), SafetyModeService],
    }).compileComponents();

    const safety = TestBed.inject(SafetyModeService);
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(FamilyViolenceOfferPage);
    fixture.detectChanges();

    fixture.componentInstance.onAccept();
    expect(safety.safetyModeActive()).toBe(true);
    expect(navigateSpy).toHaveBeenCalledWith(['/safety']);
  });

  it('AlertsImagesSettingsPage (SAF-SCR-07) and AlertsWarningPage (SAF-SCR-08) should manage preview levels', async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsImagesSettingsPage, AlertsWarningPage],
      providers: [provideRouter([]), provideLocationMocks(), SafetyModeService],
    }).compileComponents();

    const safety = TestBed.inject(SafetyModeService);
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    const fixture7 = TestBed.createComponent(AlertsImagesSettingsPage);
    fixture7.detectChanges();

    // Selecting name_and_text prompts warning route
    fixture7.componentInstance.onSelectLevel('name_and_text');
    expect(navigateSpy).toHaveBeenCalledWith(['/safety/alerts-warning']);

    // In warning page, confirm sets level
    const fixture8 = TestBed.createComponent(AlertsWarningPage);
    fixture8.detectChanges();
    fixture8.componentInstance.onConfirm();
    expect(safety.alertPreviewLevel()).toBe('name_and_text');
  });

  it('HiddenImagePreviewPage (SAF-SCR-09) should toggle revealed state', async () => {
    await TestBed.configureTestingModule({
      imports: [HiddenImagePreviewPage],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();

    const fixture = TestBed.createComponent(HiddenImagePreviewPage);
    fixture.detectChanges();

    expect(fixture.componentInstance.imageRevealed()).toBe(false);
    fixture.componentInstance.toggleReveal();
    expect(fixture.componentInstance.imageRevealed()).toBe(true);
  });

  it('AiDataPage (SAF-SCR-10) and AiUseLogPage (SAF-SCR-11) should manage AI disclosure and filters', async () => {
    await TestBed.configureTestingModule({
      imports: [AiDataPage, AiUseLogPage],
      providers: [provideRouter([]), provideLocationMocks(), SafetyModeService],
    }).compileComponents();

    const safety = TestBed.inject(SafetyModeService);
    const fixture10 = TestBed.createComponent(AiDataPage);
    fixture10.detectChanges();

    expect(safety.aiFeaturesActive()).toBe(true);
    fixture10.componentInstance.onToggleAi();
    expect(safety.aiFeaturesActive()).toBe(false);

    const fixture11 = TestBed.createComponent(AiUseLogPage);
    fixture11.detectChanges();
    expect(fixture11.componentInstance.filteredEntries().length).toBeGreaterThan(0);

    fixture11.componentInstance.selectedFeature.set('Tone check');
    for (const entry of fixture11.componentInstance.filteredEntries()) {
      expect(entry.featureName).toBe('Tone check');
    }
  });

  it('ExitConfirmationPage (SAF-SCR-12) should invoke exitNow', async () => {
    await TestBed.configureTestingModule({
      imports: [ExitConfirmationPage],
      providers: [provideRouter([]), provideLocationMocks(), SafetyModeService],
    }).compileComponents();

    const safety = TestBed.inject(SafetyModeService);
    const exitSpy = vi.spyOn(safety, 'exitNow').mockReturnValue();

    const fixture = TestBed.createComponent(ExitConfirmationPage);
    fixture.detectChanges();

    fixture.componentInstance.onLeaveNow();
    expect(exitSpy).toHaveBeenCalled();
  });
});
