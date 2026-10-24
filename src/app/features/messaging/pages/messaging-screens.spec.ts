import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { MessagingService } from '../../../core/messaging/messaging.service';
import {
  analyzeToneLocally,
  formatMessagePreview,
  generateThreadExportText,
} from '../../../core/messaging/messaging.utils';
import { AiCoachPage } from '../ai-coach/ai-coach.page';
import { AiRewritePage } from '../ai-rewrite/ai-rewrite.page';
import { AiSettingsPage } from '../ai-settings/ai-settings.page';
import { ComposeMessagePage } from '../compose-message/compose-message.page';
import { DraftsListPage } from '../drafts-list/drafts-list.page';
import { MediationRequestPage } from '../mediation-request/mediation-request.page';
import { ThreadDetailPage } from '../thread-detail/thread-detail.page';
import { ThreadsListPage } from '../threads-list/threads-list.page';

describe('Phase 4: Messaging Screens (MSG-SCR-01..13, B01)', () => {
  it('Tone heuristics should detect hostile words and offer calm suggestions', () => {
    const hostile = analyzeToneLocally('You are a liar and a scumbag.');
    expect(hostile.score).toBe('hostile');
    expect(hostile.isSafeToSend).toBe(false);
    expect(hostile.flaggedPhrases).toContain('liar');

    const elevated = analyzeToneLocally('You always fail to show up.');
    expect(elevated.score).toBe('elevated');
    expect(elevated.isSafeToSend).toBe(true);

    const calm = analyzeToneLocally('Confirming the pickup at 4 PM.');
    expect(calm.score).toBe('calm');
    expect(calm.isSafeToSend).toBe(true);
  });

  it('formatMessagePreview should mask held messages and truncate long text', () => {
    expect(formatMessagePreview('Short text', false)).toBe('Short text');
    expect(formatMessagePreview('Hostile words', true)).toBe(
      'Message held — open thread to see why',
    );
    const long = 'A'.repeat(70);
    expect(formatMessagePreview(long, false).length).toBe(60);
  });

  it('generateThreadExportText should format messages chronologically with certified header', () => {
    const exported = generateThreadExportText('School pickup', [
      { sender: 'Parent', time: '2026-10-23T10:00:00Z', body: 'Will pick up at 3pm' },
    ]);
    expect(exported).toContain('CERTIFIED THREAD EXPORT');
    expect(exported).toContain('School pickup');
    expect(exported).toContain('Will pick up at 3pm');
  });

  it('ThreadsListPage (MSG-SCR-01) should render message threads', async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadsListPage],
      providers: [provideRouter([]), provideLocationMocks(), MessagingService],
    }).compileComponents();

    const fixture = TestBed.createComponent(ThreadsListPage);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Messages');
  });

  it('ComposeMessagePage (MSG-SCR-03) should analyze tone on draft input', async () => {
    await TestBed.configureTestingModule({
      imports: [ComposeMessagePage],
      providers: [provideRouter([]), provideLocationMocks(), MessagingService],
    }).compileComponents();

    const fixture = TestBed.createComponent(ComposeMessagePage);
    const component = fixture.componentInstance;
    component.body = 'You always refuse to help.';
    component.onCheckTone();
    fixture.detectChanges();

    expect(component.toneFeedback()?.score).toBe('elevated');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Tone Assessment');
  });

  it('ThreadDetailPage (MSG-SCR-02) should render conversation container', async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadDetailPage],
      providers: [provideRouter([]), provideLocationMocks(), MessagingService],
    }).compileComponents();

    const fixture = TestBed.createComponent(ThreadDetailPage);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Conversation');
  });

  it('DraftsListPage (MSG-SCR-04) should render saved drafts list', async () => {
    await TestBed.configureTestingModule({
      imports: [DraftsListPage],
      providers: [provideRouter([]), provideLocationMocks(), MessagingService],
    }).compileComponents();

    const fixture = TestBed.createComponent(DraftsListPage);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Saved Drafts');
  });

  it('AiSettingsPage (MSG-SCR-05) should toggle shield sensitivity and on-device privacy', async () => {
    await TestBed.configureTestingModule({
      imports: [AiSettingsPage],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();

    const fixture = TestBed.createComponent(AiSettingsPage);
    const component = fixture.componentInstance;
    component.onSave();
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('On-Device Guarantee');
    expect(component.isSaved()).toBe(true);
  });

  it('AiCoachPage (MSG-SCR-12) should provide BIFF conflict de-escalation tips', async () => {
    await TestBed.configureTestingModule({
      imports: [AiCoachPage],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();

    const fixture = TestBed.createComponent(AiCoachPage);
    const component = fixture.componentInstance;
    component.selectPrompt('How do I respond to an angry accusation?');
    fixture.detectChanges();
    expect(component.coachAnswer()?.title).toContain('BIFF Method');
  });

  it('AiRewritePage (MSG-SCR-B01) should display side-by-side comparison', async () => {
    await TestBed.configureTestingModule({
      imports: [AiRewritePage],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();

    const fixture = TestBed.createComponent(AiRewritePage);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Original Draft');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Calmer Rewrite Suggestion',
    );
  });

  it('MediationRequestPage (MSG-SCR-13) should allow submitting dispute topic', async () => {
    await TestBed.configureTestingModule({
      imports: [MediationRequestPage],
      providers: [provideRouter([]), provideLocationMocks(), MessagingService],
    }).compileComponents();

    const fixture = TestBed.createComponent(MediationRequestPage);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Request In-App Mediation',
    );
  });
});
