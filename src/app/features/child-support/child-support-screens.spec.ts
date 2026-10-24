import { provideLocationMocks } from '@angular/common/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';
import { SafetyModeService } from '@core/safety/safety-mode.service';
import { describe, expect, it } from 'vitest';

import { AgencyCalendarPage } from './pages/agency-calendar/agency-calendar.page';
import { AgencyInvitePage } from './pages/agency-invite/agency-invite.page';
import { ConsentPage } from './pages/consent/consent.page';
import { CssOverviewPage } from './pages/css-overview/css-overview.page';
import { DueDatesPage } from './pages/due-dates/due-dates.page';
import { HearingPacketPage } from './pages/hearing-packet/hearing-packet.page';
import { LinkCasePage } from './pages/link-case/link-case.page';
import { LoadLogPage } from './pages/load-log/load-log.page';
import { PaymentsComparisonPage } from './pages/payments-comparison/payments-comparison.page';
import { ProofPackagePage } from './pages/proof-package/proof-package.page';
import { SafetyOfferPage } from './pages/safety-offer/safety-offer.page';
import { SendProofPage } from './pages/send-proof/send-proof.page';
import { SharedItemsPage } from './pages/shared-items/shared-items.page';
import { ShareItemPage } from './pages/share-item/share-item.page';
import { TimelinePage } from './pages/timeline/timeline.page';
import { UnlinkExportPage } from './pages/unlink-export/unlink-export.page';

describe('Phase 9: Child Support Screens (CSS-SCR-01..16)', () => {
  const setupScreen = async <T>(
    componentType: new (...args: unknown[]) => T,
  ): Promise<ComponentFixture<T>> => {
    await TestBed.configureTestingModule({
      imports: [componentType],
      providers: [
        ChildSupportService,
        SafetyModeService,
        provideRouter([]),
        provideLocationMocks(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
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

  it('CSS-SCR-01: LinkCasePage renders form with State, Case number and send code', async () => {
    const fixture = await setupScreen(LinkCasePage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Link your child support case');
    expect(text).toContain('State');
    expect(text).toContain('Agency case number');
  });

  it('CSS-SCR-02: ConsentPage renders scope, read-only and privacy disclosures', async () => {
    const fixture = await setupScreen(ConsentPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Scope of agency sync & consent');
    expect(text).toContain('Strictly Read-Only Invariant');
    expect(text).toContain('Co-parent privacy');
  });

  it('CSS-SCR-03: CssOverviewPage renders order, balance, arrears, and sync labels', async () => {
    const fixture = await setupScreen(CssOverviewPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Child support');
    expect(text).toContain('Monthly order');
    expect(text).toContain('Current balance owed');
    expect(text).toContain('Arrears balance');
  });

  it('CSS-SCR-04: PaymentsComparisonPage renders side by side ledger and flags', async () => {
    const fixture = await setupScreen(PaymentsComparisonPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Payments side by side');
    expect(text).toContain('Agency record');
    expect(text).toContain('Your record');
  });

  it('CSS-SCR-05: DueDatesPage renders schedule and reminder lead time options', async () => {
    const fixture = await setupScreen(DueDatesPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Due dates & reminder times');
    expect(text).toContain('7 days before due date');
    expect(text).toContain('Save preferences');
  });

  it('CSS-SCR-06: AgencyCalendarPage renders hearings, documents and filter', async () => {
    const fixture = await setupScreen(AgencyCalendarPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Agency items in calendar');
    expect(text).toContain('Annual Support Review');
  });

  it('CSS-SCR-07: ShareItemPage renders sharing selector and privacy safeguards', async () => {
    const fixture = await setupScreen(ShareItemPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Share an agency item');
    expect(text).toContain('Privacy safeguard');
    expect(text).toContain('Share with co-parent');
  });

  it('CSS-SCR-08: SharedItemsPage renders records received from co-parent', async () => {
    const fixture = await setupScreen(SharedItemsPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Shared with you');
    expect(text).toContain('Read-only agency record');
  });

  it('CSS-SCR-09: UnlinkExportPage renders 30-day retention notice and unlink confirmation', async () => {
    const fixture = await setupScreen(UnlinkExportPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Unlink & export');
    expect(text).toContain('30 days');
    expect(text).toContain('Download archive');
  });

  it('CSS-SCR-10: SendProofPage renders payment proof form with factual invariant', async () => {
    const fixture = await setupScreen(SendProofPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Send proof to the agency');
    expect(text).toContain('Strict Agency Invariant');
  });

  it('CSS-SCR-11: ProofPackagePage renders compiled receipt with verification record ID', async () => {
    const fixture = await setupScreen(ProofPackagePage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Proof package');
    expect(text).toContain('7K9F-4M2L-99XP-B22A');
  });

  it('CSS-SCR-12: SafetyOfferPage renders confidential offer with quick exit details', async () => {
    const fixture = await setupScreen(SafetyOfferPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Offer of Safety Mode');
    expect(text).toContain('Confidentiality guarantee');
    expect(text).toContain('Turn on Safety Mode');
  });

  it('CSS-SCR-13: AgencyInvitePage renders docket invitation template', async () => {
    const fixture = await setupScreen(AgencyInvitePage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Invite through agency notice');
    expect(text).toContain('DR-2024-8831');
    expect(text).toContain('Send invitation');
  });

  it('CSS-SCR-14: TimelinePage renders chronological agency sync history', async () => {
    const fixture = await setupScreen(TimelinePage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Child support timeline');
    expect(text).toContain('Disbursement recorded');
  });

  it('CSS-SCR-15: HearingPacketPage renders court-ready packet with arrears & ledger', async () => {
    const fixture = await setupScreen(HearingPacketPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Court hearing packet');
    expect(text).toContain('Compliance statement');
    expect(text).toContain('Download hearing packet (PDF)');
  });

  it('CSS-SCR-16: LoadLogPage renders technical operations sync logs without PII', async () => {
    const fixture = await setupScreen(LoadLogPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Load log');
    expect(text).toContain('BATCH-20261023-01');
    expect(text).toContain('VA Division of Child Support Enforcement');
  });
});
