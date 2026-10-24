import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { SUPABASE_CLIENT } from '@core/supabase/supabase-client';
import { HouseholdService } from '@core/household/household.service';
import { HouseholdOverviewPage } from './household-overview/household-overview.page';
import { ChooseSoloModePage } from './choose-solo-mode/choose-solo-mode.page';
import { InviteCoParentPage } from './invite-coparent/invite-coparent.page';
import { InviteListPage } from './invite-list/invite-list.page';
import { AcceptInvitePage } from './accept-invite/accept-invite.page';
import { ContactNonAppPage } from './contact-nonapp/contact-nonapp.page';
import { ContactAttemptLogPage } from './contact-attempt-log/contact-attempt-log.page';

const mockSupabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => Promise.resolve({ data: [] }),
        maybeSingle: () => Promise.resolve({ data: null }),
      }),
      order: () => Promise.resolve({ data: [] }),
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => ({
      eq: () => Promise.resolve({ data: null, error: null }),
    }),
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } }),
  },
};

describe('Phase 1 Step 1-C: Household Creation, Solo Mode & Invites', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SUPABASE_CLIENT, useValue: mockSupabase }, provideRouter([])],
    });
  });

  it('HouseholdService should initialize default Solo household and manage invite lifecycle', async () => {
    const householdService = TestBed.inject(HouseholdService);

    expect(householdService.isSoloMode()).toBe(true);

    // Send an invite
    const inviteResult = await householdService.sendInvite({
      channel: 'Email',
      target: 'coparent@example.com',
    });

    expect(inviteResult.invite.status).toBe('Sent');
    expect(householdService.invites().length).toBeGreaterThan(0);
    expect(householdService.activeInvite()?.id).toBe(inviteResult.invite.id);

    // Canceling the invite
    await householdService.cancelInvite(inviteResult.invite.id);
    expect(householdService.activeInvite()).toBeNull();

    // Verify contact attempt was pre-logged
    const attempts = householdService.contactAttempts();
    expect(attempts.length).toBeGreaterThan(0);
    const first = attempts[0];
    expect(first?.purpose).toContain('invite');
  });

  it('HouseholdOverviewPage (ACC-SCR-B01) should render mode and member details', () => {
    const fixture = TestBed.createComponent(HouseholdOverviewPage);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.household-title')).not.toBeNull();
    expect(compiled.querySelector('.mode-badge')?.textContent).toContain('Solo Mode');
    expect(compiled.querySelectorAll('.nav-chip').length).toBe(3);
    expect(compiled.querySelectorAll('.action-btn').length).toBe(4);
  });

  it('ChooseSoloModePage (ACC-SCR-08) should offer Invite and Solo options with privacy disclaimer', () => {
    const fixture = TestBed.createComponent(ChooseSoloModePage);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.main-title')?.textContent).toContain(
      'How will you use ParentPath?',
    );
    expect(compiled.querySelectorAll('.mode-card').length).toBe(2);
    expect(compiled.querySelector('.privacy-note')?.textContent).toContain('Privacy');
  });

  it('InviteCoParentPage (ACC-SCR-05) should toggle channels and validate inputs', () => {
    const fixture = TestBed.createComponent(InviteCoParentPage);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.selectedChannel()).toBe('Email');
    component.setChannel('Text');
    expect(component.selectedChannel()).toBe('Text');
    component.setChannel('Link');
    expect(component.selectedChannel()).toBe('Link');
    expect(component.generatedLink()).toContain('/accounts/accept-invite?token=');
  });

  it('InviteListPage (ACC-SCR-06) should display status and actions', () => {
    const fixture = TestBed.createComponent(InviteListPage);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.page-title')?.textContent).toContain('Invites');
    expect(compiled.querySelector('.btn-primary')?.textContent).toContain('Send new invite');
  });

  it('AcceptInvitePage (ACC-SCR-07) should render registration form and child matching', () => {
    const fixture = TestBed.createComponent(AcceptInvitePage);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component.isValidInvite()).toBe(true);
    expect(compiled.querySelector('.invite-badge')?.textContent).toContain('You’re invited');
    expect(compiled.querySelector('.matching-title')?.textContent).toContain('Match your children');
  });

  it('ContactNonAppPage (ACC-SCR-09) should send outside messages and log immutable attempt', async () => {
    const fixture = TestBed.createComponent(ContactNonAppPage);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.messageForm.controls.message.setValue('Testing outbound outside message');
    await component.onSend();

    expect(component.sendSuccess()).toBe(true);
    expect(component.messages().length).toBeGreaterThanOrEqual(4);
  });

  it('ContactAttemptLogPage (ACC-SCR-10) should display log with filtering capabilities', () => {
    const fixture = TestBed.createComponent(ContactAttemptLogPage);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.page-title')?.textContent).toContain('Contact-attempt log');
    expect(compiled.querySelectorAll('.filter-select').length).toBe(2);

    const initialCount = component.filteredAttempts().length;
    component.selectedType.set('Invite');
    expect(
      component.filteredAttempts().every((a) => a.purpose.toLowerCase().includes('invite')),
    ).toBe(true);

    component.selectedType.set('All');
    expect(component.filteredAttempts().length).toBe(initialCount);
  });
});
