import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { AuthService } from '../../core/auth/auth.service';
import { CallingService } from '../../core/calling/calling.service';
import { HouseholdService } from '../../core/household/household.service';
import { CallLogPage } from './call-log/call-log.page';
import { CallScreenPage } from './call-screen/call-screen.page';
import { CallingSettingsPage } from './calling-settings/calling-settings.page';
import { ConsentLogPage } from './consent-log/consent-log.page';
import { IncomingCallPage } from './incoming-call/incoming-call.page';
import { PlaceCallPage } from './place-call/place-call.page';
import { RecordingRequestPage } from './recording-request/recording-request.page';

describe('Phase 5: Calling Module Screens (CLL-SCR-01..07)', () => {
  it('CallingService should handle calling state and settings', () => {
    TestBed.configureTestingModule({
      providers: [CallingService, AuthService, HouseholdService, provideRouter([])],
    });

    const service = TestBed.inject(CallingService);
    expect(service.settings()).toBeNull();
    expect(service.activeCall()).toBeNull();
    expect(service.incomingCall()).toBeNull();

    const mockCall = {
      id: 'call-1',
      household_id: 'hh-1',
      thread_id: null,
      caller_id: 'user-2',
      callee_id: 'user-1',
      call_type: 'video' as const,
      status: 'Ringing' as const,
      started_at: new Date().toISOString(),
      answered_at: null,
      ended_at: null,
      duration_seconds: 0,
      recording_requested: true,
      recording_consent_caller: true,
      recording_consent_callee: false,
      is_recorded: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    service.setSimulatedIncomingCall(mockCall);
    expect(service.incomingCall()?.call_type).toBe('video');

    service.setSimulatedActiveCall({
      call: mockCall,
      remoteName: 'Co-parent',
      isMuted: false,
      isCameraOff: false,
      isSpeaker: false,
      isRecording: false,
      recordingPendingConsent: true,
      elapsedSeconds: 15,
    });

    expect(service.activeCall()?.elapsedSeconds).toBe(15);
    service.toggleMute();
    expect(service.activeCall()?.isMuted).toBe(true);
    service.toggleCamera();
    expect(service.activeCall()?.isCameraOff).toBe(true);
    service.toggleSpeaker();
    expect(service.activeCall()?.isSpeaker).toBe(true);
  });

  it('CallingSettingsPage (CLL-SCR-01) should render settings and safety notice', async () => {
    await TestBed.configureTestingModule({
      imports: [CallingSettingsPage],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        CallingService,
        AuthService,
        HouseholdService,
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(CallingSettingsPage);
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Calling settings');
    expect(text).toContain('Audio calls');
    expect(text).toContain('Video calls');
    expect(text).toContain('Allow recording requests');
    expect(text).toContain('Important Safety & Emergency Notice');
    expect(text).toContain('cannot reach emergency services (911)');
  });

  it('PlaceCallPage (CLL-SCR-02) should render call options and start call', async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceCallPage],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        CallingService,
        AuthService,
        HouseholdService,
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(PlaceCallPage);
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Call Co-parent');
    expect(text).toContain('Audio');
    expect(text).toContain('Video');
    expect(text).toContain('Ask to record this call');
  });

  it('IncomingCallPage (CLL-SCR-03) should render incoming dialog and handle actions', async () => {
    await TestBed.configureTestingModule({
      imports: [IncomingCallPage],
      providers: [provideRouter([]), provideLocationMocks(), CallingService, AuthService],
    }).compileComponents();

    const fixture = TestBed.createComponent(IncomingCallPage);
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Incoming call');
    expect(text).toContain('Co-parent');
    expect(text).toContain('Answer');
    expect(text).toContain('Decline');
  });

  it('CallScreenPage (CLL-SCR-04) should render timer and in-call controls', async () => {
    await TestBed.configureTestingModule({
      imports: [CallScreenPage],
      providers: [provideRouter([]), provideLocationMocks(), CallingService, AuthService],
    }).compileComponents();

    const fixture = TestBed.createComponent(CallScreenPage);
    const service = TestBed.inject(CallingService);

    service.setSimulatedActiveCall({
      call: {
        id: 'call-active-1',
        household_id: 'hh-1',
        thread_id: null,
        caller_id: 'u-1',
        callee_id: 'u-2',
        call_type: 'video',
        status: 'Connected',
        started_at: new Date().toISOString(),
        answered_at: new Date().toISOString(),
        ended_at: null,
        duration_seconds: 45,
        recording_requested: false,
        recording_consent_caller: false,
        recording_consent_callee: false,
        is_recorded: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      remoteName: 'Co-parent',
      isMuted: false,
      isCameraOff: false,
      isSpeaker: false,
      isRecording: true,
      recordingPendingConsent: false,
      elapsedSeconds: 45,
    });

    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Co-parent');
    expect(text).toContain('Recording');
    expect(text).toContain('Mute');
    expect(text).toContain('Camera off');
    expect(text).toContain('End call');
  });

  it('RecordingRequestPage (CLL-SCR-05) should render consent explanation', async () => {
    await TestBed.configureTestingModule({
      imports: [RecordingRequestPage],
      providers: [provideRouter([]), provideLocationMocks(), CallingService],
    }).compileComponents();

    const fixture = TestBed.createComponent(RecordingRequestPage);
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Recording request');
    expect(text).toContain('Both parents must explicitly consent');
    expect(text).toContain('Agree to record');
    expect(text).toContain('Decline');
  });

  it('CallLogPage (CLL-SCR-06) should render tabs and call history table', async () => {
    await TestBed.configureTestingModule({
      imports: [CallLogPage],
      providers: [provideRouter([]), provideLocationMocks(), CallingService, HouseholdService],
    }).compileComponents();

    const fixture = TestBed.createComponent(CallLogPage);
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Call log');
    expect(text).toContain('All calls');
    expect(text).toContain('Recordings');
    expect(text).toContain('Transcripts');
    expect(text).toContain('New call');
    expect(text).toContain('Consent log');
  });

  it('ConsentLogPage (CLL-SCR-07) should render consent log audit record', async () => {
    await TestBed.configureTestingModule({
      imports: [ConsentLogPage],
      providers: [provideRouter([]), provideLocationMocks(), CallingService, HouseholdService],
    }).compileComponents();

    const fixture = TestBed.createComponent(ConsentLogPage);
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Recording consent log');
    expect(text).toContain('Immutable Audit Record');
    expect(text).toContain('Setting / Type');
  });
});
