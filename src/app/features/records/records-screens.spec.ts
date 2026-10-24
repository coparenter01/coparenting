import { provideLocationMocks } from '@angular/common/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { HouseholdService } from '@core/household/household.service';
import { RecordsService } from '@core/records/records.service';
import { describe, expect, it } from 'vitest';
import { AffidavitRequestsPage } from './pages/affidavit-requests/affidavit-requests.page';
import { AffidavitReviewsPage } from './pages/affidavit-reviews/affidavit-reviews.page';
import { CourtNotesPage } from './pages/court-notes/court-notes.page';
import { CreateExportPage } from './pages/create-export/create-export.page';
import { DeleteDataRequestPage } from './pages/delete-data-request/delete-data-request.page';
import { ExportHistoryPage } from './pages/export-history/export-history.page';
import { JournalDetailPage } from './pages/journal-detail/journal-detail.page';
import { JournalEntryFormPage } from './pages/journal-entry-form/journal-entry-form.page';
import { JournalListPage } from './pages/journal-list/journal-list.page';
import { LegalHoldPage } from './pages/legal-hold/legal-hold.page';
import { ModelOrderLanguagePage } from './pages/model-order-language/model-order-language.page';
import { PublicRecordsRequestPage } from './pages/public-records-request/public-records-request.page';
import { RecordsHomePage } from './pages/records-home/records-home.page';
import { RequestAffidavitPage } from './pages/request-affidavit/request-affidavit.page';
import { RetentionPolicyPage } from './pages/retention-policy/retention-policy.page';
import { VerifyRecordPage } from './pages/verify-record/verify-record.page';

describe('Phase 8: Records Screens (REC-SCR-B01, REC-SCR-01..15)', () => {
  const setupScreen = async <T>(
    componentType: new (...args: unknown[]) => T,
    routeParams: Record<string, string> = { id: 'entry-1' },
  ): Promise<ComponentFixture<T>> => {
    await TestBed.configureTestingModule({
      imports: [componentType],
      providers: [
        RecordsService,
        AuthService,
        HouseholdService,
        provideRouter([]),
        provideLocationMocks(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap(routeParams),
              queryParamMap: convertToParamMap(routeParams),
            },
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(componentType);
    fixture.detectChanges();
    return fixture;
  };

  it('REC-SCR-B01: RecordsHomePage renders hub cards and export action', async () => {
    const fixture = await setupScreen(RecordsHomePage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Records');
    expect(text).toContain('Export records');
    expect(text).toContain('Export history');
    expect(text).toContain('Journal');
  });

  it('REC-SCR-01: CreateExportPage renders export form and date range', async () => {
    const fixture = await setupScreen(CreateExportPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Export records');
    expect(text).toContain('Format');
    expect(text).toContain('Include');
    expect(text).toContain('Start date');
  });

  it('REC-SCR-02: ExportHistoryPage renders exports list and verification badges', async () => {
    const fixture = await setupScreen(ExportHistoryPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Export history');
    expect(text).toContain('Record ID');
    expect(text).toContain('Format');
  });

  it('REC-SCR-03: VerifyRecordPage renders verification input and certificate details', async () => {
    const fixture = await setupScreen(VerifyRecordPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Verify a ParentPath record');
    expect(text).toContain('Record ID');
    expect(text).toContain('Compare a file');
  });

  it('REC-SCR-04: JournalListPage renders parenting journal list and category filters', async () => {
    const fixture = await setupScreen(JournalListPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Journal');
    expect(text).toContain('Add journal entry');
    expect(text).toContain('Private notes');
  });

  it('REC-SCR-05: JournalEntryFormPage renders entry form fields', async () => {
    const fixture = await setupScreen(JournalEntryFormPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Edit journal entry');
    expect(text).toContain('Type');
    expect(text).toContain('Title');
  });

  it('REC-SCR-06: JournalDetailPage renders journal entry with version history', async () => {
    const fixture = await setupScreen(JournalDetailPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Journal entry');
  });

  it('REC-SCR-07: RequestAffidavitPage renders business records affidavit form', async () => {
    const fixture = await setupScreen(RequestAffidavitPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Request a notarized affidavit');
    expect(text).toContain('Record ID');
    expect(text).toContain('Delivery');
  });

  it('REC-SCR-08: AffidavitRequestsPage renders submitted requests table', async () => {
    const fixture = await setupScreen(AffidavitRequestsPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Affidavit requests');
  });

  it('REC-SCR-09: AffidavitReviewsPage renders operations review interface', async () => {
    const fixture = await setupScreen(AffidavitReviewsPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Affidavit reviews');
    expect(text).toContain('Staff verification portal');
  });

  it('REC-SCR-10: PublicRecordsRequestPage renders subpoena submission intake form', async () => {
    const fixture = await setupScreen(PublicRecordsRequestPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Records requests');
    expect(text).toContain('Official submission portal');
  });

  it('REC-SCR-11: CourtNotesPage renders evidentiary compliance guidelines', async () => {
    const fixture = await setupScreen(CourtNotesPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Court notes by state');
    expect(text).toContain('Jurisdiction-specific guidance');
  });

  it('REC-SCR-12: ModelOrderLanguagePage renders courtroom stipulation clauses', async () => {
    const fixture = await setupScreen(ModelOrderLanguagePage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Model order language');
    expect(text).toContain('Neutral stipulations');
  });

  it('REC-SCR-13: RetentionPolicyPage renders data retention schedules', async () => {
    const fixture = await setupScreen(RetentionPolicyPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Retention policy');
    expect(text).toContain('Definition of Evidentiary Records');
  });

  it('REC-SCR-14: DeleteDataRequestPage renders deletion disclosure and request button', async () => {
    const fixture = await setupScreen(DeleteDataRequestPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Ask to delete data');
    expect(text).toContain('Send deletion request');
  });

  it('REC-SCR-15: LegalHoldPage renders legal hold banner and placement form', async () => {
    const fixture = await setupScreen(LegalHoldPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Legal hold');
    expect(text).toContain('Preserve all electronic records');
  });
});
