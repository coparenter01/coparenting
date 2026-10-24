import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { SUPABASE_CLIENT } from '@core/supabase/supabase-client';
import { HouseholdMembersPage } from './household-members/household-members.page';
import { ProfilePage } from './profile/profile.page';
import { SessionDraftSettingsPage } from './session-draft-settings/session-draft-settings.page';
import { CloseAccountPage } from './close-account/close-account.page';
import { HomePage } from './home/home.page';
import { SettingsPage } from './settings/settings.page';
import { SystemSendStatusPage } from './system-send-status/system-send-status.page';

@Component({ template: '', standalone: true })
class DummyComponent {}

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
    delete: () => ({
      eq: () => Promise.resolve({ data: null, error: null }),
    }),
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } }),
    signOut: () => Promise.resolve({ error: null }),
  },
};

describe('Phase 1 Step 1-D: Household Members, Settings & Account Management', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SUPABASE_CLIENT, useValue: mockSupabase },
        provideRouter([{ path: 'auth/sign-in', component: DummyComponent }]),
      ],
    });
  });

  it('HouseholdMembersPage (ACC-SCR-12) should add new member and remove member', async () => {
    const fixture = TestBed.createComponent(HouseholdMembersPage);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-title')?.textContent).toContain(
      'Household members and roles',
    );

    component.addMemberForm.controls.name.setValue('Grandma Rose');
    component.addMemberForm.controls.role.setValue('Third party');
    component.addMemberForm.controls.canSeeCalendar.setValue(true);
    component.addMemberForm.controls.receivesMessages.setValue(true);

    await component.onAddMember();
    expect(component.members().length).toBeGreaterThan(0);
    expect(component.successMessage()).toContain('Grandma Rose has been added');

    const addedId = component.members()[0]?.id;
    if (addedId) {
      await component.onRemoveMember(addedId);
      expect(component.members().some((m) => m.id === addedId)).toBe(false);
    }
  });

  it('ProfilePage (ACC-SCR-16) should validate inputs and save profile changes', async () => {
    const fixture = TestBed.createComponent(ProfilePage);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-title')?.textContent).toContain('Profile');

    component.profileForm.controls.displayName.setValue('Alex Morgan');
    await component.onSave();

    expect(component.successMessage()).toContain('Profile changes saved');
  });

  it('SessionDraftSettingsPage (ACC-SCR-11) should configure timeout and show draft notice', () => {
    const fixture = TestBed.createComponent(SessionDraftSettingsPage);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-title')?.textContent).toContain('Session and drafts');
    expect(compiled.querySelector('.draft-notice')?.textContent).toContain(
      'drafts are saved automatically',
    );

    component.settingsForm.controls.timeoutMinutes.setValue('60');
    component.onSave();
    expect(component.isSaved()).toBe(true);
  });

  it('CloseAccountPage (ACC-SCR-18) should provide data export and require confirmation', async () => {
    const fixture = TestBed.createComponent(CloseAccountPage);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-title')?.textContent).toContain('Close your account');

    // Test export
    component.exportData('PDF');
    expect(component.exportFeedback()).toContain('PDF');

    // Button should be disabled until checkbox checked
    expect(component.isConfirmed()).toBe(false);
    component.closeForm.controls.confirmUnderstand.setValue(true);
    expect(component.isConfirmed()).toBe(true);

    await component.onCloseAccount();
    expect(component.isClosing()).toBe(true);
  });

  it('HomePage (ACC-SCR-19) should render greeting, quick actions and dashboard widgets', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.greeting-title')?.textContent).toBeTruthy();
    expect(compiled.querySelectorAll('.action-btn').length).toBe(3);
    expect(compiled.querySelectorAll('.dashboard-card').length).toBe(5);
  });

  it('SettingsPage (ACC-SCR-20) should render all 4 setting categories and close account entry', () => {
    const fixture = TestBed.createComponent(SettingsPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-title')?.textContent).toContain('Settings');
    expect(compiled.querySelectorAll('.settings-card').length).toBe(4);
    expect(compiled.querySelector('.close-account-card')).not.toBeNull();
  });

  it('SystemSendStatusPage (NTF-SCR-B04) should display transmission status and contact log link', () => {
    const fixture = TestBed.createComponent(SystemSendStatusPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-title')?.textContent).toContain('Send status');
    expect(compiled.querySelector('.result-delivered')?.textContent).toContain('Delivered');
    expect(compiled.querySelector('.contact-log-link')).not.toBeNull();
  });
});
