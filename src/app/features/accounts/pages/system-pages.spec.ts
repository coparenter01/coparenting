import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { ErrorPage } from './error/error.page';
import { MaintenancePage } from './maintenance/maintenance.page';
import { NotFoundPage } from './not-found/not-found.page';
import { OfflineBannerComponent } from '@shared/ui/offline-banner/offline-banner.component';
import { SessionTimeoutDialogComponent } from '@shared/ui/session-timeout-dialog/session-timeout-dialog.component';
import { NetworkService } from '@core/network/network.service';

describe('System screens & components (0-E)', () => {
  it('should render ErrorPage (ACC-SCR-21) with error title and support action', async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorPage],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(ErrorPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Something went wrong');
    expect(element.querySelector('.btn-primary')?.textContent).toContain('Contact support');
  });

  it('should render NotFoundPage (ACC-SCR-22) in not-found mode', async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundPage],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(NotFoundPage);
    fixture.componentRef.setInput('mode', 'not-found');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Page not found');
    expect(element.querySelector('.badge-neutral')?.textContent).toContain('Not found');
  });

  it('should render NotFoundPage (ACC-SCR-22) in forbidden mode', async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundPage],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(NotFoundPage);
    fixture.componentRef.setInput('mode', 'forbidden');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('No access');
    expect(element.querySelector('.badge-warn')?.textContent).toContain('Not allowed');
  });

  it('should render MaintenancePage (ACC-SCR-23) with estimated time', async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenancePage],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(MaintenancePage);
    fixture.componentRef.setInput('estimatedTime', '2:00 PM UTC');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Down for planned maintenance');
    expect(element.textContent).toContain('2:00 PM UTC');
  });

  it('should display OfflineBannerComponent (ACC-SCR-24) when offline', () => {
    const networkServiceMock = {
      isOnline: () => false,
      checkConnection: () => false,
    };

    TestBed.configureTestingModule({
      imports: [OfflineBannerComponent],
      providers: [{ provide: NetworkService, useValue: networkServiceMock }],
    });

    const fixture = TestBed.createComponent(OfflineBannerComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.offline-banner')).toBeTruthy();
    expect(element.textContent).toContain('You are offline');
  });

  it('should render SessionTimeoutDialogComponent (ACC-SCR-25) and format timer', () => {
    const fixture = TestBed.createComponent(SessionTimeoutDialogComponent);
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('secondsRemaining', 119);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const timerEl = element.querySelector('.timer-display');
    expect(timerEl?.textContent.trim()).toBe('1:59');

    let stayed = false;
    fixture.componentInstance.staySignedIn.subscribe(() => {
      stayed = true;
    });

    const primaryBtn = element.querySelector('.btn-primary');
    if (primaryBtn instanceof HTMLButtonElement) {
      primaryBtn.click();
    }
    expect(stayed).toBe(true);
  });
});
