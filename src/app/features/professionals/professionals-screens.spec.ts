import { provideLocationMocks } from '@angular/common/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { ProfessionalsService } from '@core/professionals/professionals.service';
import { describe, expect, it } from 'vitest';

import { AcceptInvitePage } from './pages/accept-invite/accept-invite.page';
import { AccessLogPage } from './pages/access-log/access-log.page';
import { AccessSettingsPage } from './pages/access-settings/access-settings.page';
import { ClientMessagesPage } from './pages/client-messages/client-messages.page';
import { ClientViewPage } from './pages/client-view/client-view.page';
import { InviteProfessionalPage } from './pages/invite-professional/invite-professional.page';
import { ProfessionalHomePage } from './pages/professional-home/professional-home.page';
import { ProfessionalsListPage } from './pages/professionals-list/professionals-list.page';
import { SendMessagePage } from './pages/send-message/send-message.page';
import { ShareItemPage } from './pages/share-item/share-item.page';

describe('Phase 10: Professionals Screens (PRO-SCR-01..10)', () => {
  const setupScreen = async <T>(
    componentType: new (...args: unknown[]) => T,
    params: Record<string, string> = {},
  ): Promise<ComponentFixture<T>> => {
    await TestBed.configureTestingModule({
      imports: [componentType],
      providers: [
        ProfessionalsService,
        provideRouter([]),
        provideLocationMocks(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap(params),
              queryParamMap: convertToParamMap({}),
            },
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(componentType);
    fixture.detectChanges();
    return fixture;
  };

  it('PRO-SCR-01: ProfessionalsListPage renders professionals list table and invite button', async () => {
    const fixture = await setupScreen(ProfessionalsListPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('My professionals');
    expect(text).toContain('Invite a professional');
    expect(text).toContain('Send message');
    expect(text).toContain('Access log');
  });

  it('PRO-SCR-02: InviteProfessionalPage renders name, email, type, and scopes', async () => {
    const fixture = await setupScreen(InviteProfessionalPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Invite a professional');
    expect(text).toContain('What they can see');
    expect(text).toContain('Send invite');
  });

  it('PRO-SCR-03: AccessSettingsPage renders professional settings, save, and end access', async () => {
    const fixture = await setupScreen(AccessSettingsPage, { id: 'acc-001' });
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Sarah Jenkins, Esq.');
    expect(text).toContain('What they can see');
    expect(text).toContain('Save changes');
    expect(text).toContain('End access');
  });

  it('PRO-SCR-04: ShareItemPage renders item dropdown, professional selector, and confirm notice', async () => {
    const fixture = await setupScreen(ShareItemPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Share an item with a professional');
    expect(text).toContain('Item');
    expect(text).toContain('Professional');
    expect(text).toContain('You are about to share');
  });

  it('PRO-SCR-05: AccessLogPage renders access audit logs table', async () => {
    const fixture = await setupScreen(AccessLogPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Access log');
    expect(text).toContain('What they opened');
    expect(text).toContain('Sarah Jenkins, Esq.');
  });

  it('PRO-SCR-06: AcceptInvitePage renders professional terms acceptance form', async () => {
    const fixture = await setupScreen(AcceptInvitePage, {
      token: 'inv_token_david_vance_2026',
    });
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Accept invitation');
    expect(text).toContain('I accept the professional terms');
    expect(text).toContain('Create account and accept');
  });

  it('PRO-SCR-07: ProfessionalHomePage renders professional workspace client roster', async () => {
    const fixture = await setupScreen(ProfessionalHomePage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Professional workspace');
    expect(text).toContain('Clients');
    expect(text).toContain('2-step verified');
  });

  it('PRO-SCR-08: ClientViewPage renders strict read only banner and category tabs', async () => {
    const fixture = await setupScreen(ClientViewPage, {
      clientId: 'client-001',
    });
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Alex Morgan');
    expect(text).toContain('Read only');
    expect(text).toContain('Messages');
    expect(text).toContain('Calendar');
  });

  it('PRO-SCR-09: SendMessagePage renders private forwarded message form', async () => {
    const fixture = await setupScreen(SendMessagePage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Send a message to');
    expect(text).toContain('Subject');
    expect(text).toContain('Message');
    expect(text).toContain('Send');
  });

  it('PRO-SCR-10: ClientMessagesPage renders forwarded messages inbox with no-reply notice', async () => {
    const fixture = await setupScreen(ClientMessagesPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Messages from parents');
    expect(text).toContain('You cannot reply here');
    expect(text).toContain('Exchange schedule confirmation');
  });
});
