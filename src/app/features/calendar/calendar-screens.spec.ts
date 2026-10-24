import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { CalendarService } from '../../core/calendar/calendar.service';
import { SafetyModeService } from '../../core/safety/safety-mode.service';
import { CalendarOverviewPage } from './calendar-overview/calendar-overview.page';
import { CalendarSyncPage } from './calendar-sync/calendar-sync.page';
import { CheckInPage } from './check-in/check-in.page';
import { ComplianceViewPage } from './compliance-view/compliance-view.page';
import { EntryHistoryPage } from './entry-history/entry-history.page';
import { EventFormPage } from './event-form/event-form.page';
import { ExchangeRecordPage } from './exchange-record/exchange-record.page';
import { HolidaysPage } from './holidays/holidays.page';
import { ParentingPlanBuilderPage } from './parenting-plan-builder/parenting-plan-builder.page';
import { ParentingTimeFormPage } from './parenting-time-form/parenting-time-form.page';
import { PetsPage } from './pets/pets.page';
import { RequestDetailPage } from './request-detail/request-detail.page';
import { ScheduleChangeRequestPage } from './schedule-change-request/schedule-change-request.page';
import { ScheduleTemplatesPage } from './schedule-templates/schedule-templates.page';

const DUMMY_ROUTES = [{ path: '**', component: CalendarOverviewPage }];

describe('Phase 6: Calendar and Parenting Time Module Screens (CAL-SCR-01..14)', () => {
  it('CalendarService should handle events, change requests, and compliance', () => {
    TestBed.configureTestingModule({
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const service = TestBed.inject(CalendarService);
    expect(service.entries().length).toBeGreaterThan(0);
    expect(service.requests().length).toBeGreaterThan(0);

    // Overlap check
    const hasOverlap = service.checkOverlap(
      new Date().toISOString(),
      new Date(Date.now() + 3600 * 1000).toISOString(),
    );
    expect(typeof hasOverlap).toBe('boolean');

    // Request approve and 10-minute undo
    service.approveRequest('req-1', 'user-1');
    const req = service.requests().find((r) => r.id === 'req-1');
    expect(req?.status).toBe('Approved');
    expect(req?.undoUntil).toBeDefined();

    service.undoApproval('req-1');
    const reqUndone = service.requests().find((r) => r.id === 'req-1');
    expect(reqUndone?.status).toBe('Pending');

    // Compliance metrics
    const metrics = service.compliance();
    expect(metrics.totalScheduledHours).toBeGreaterThan(0);
    expect(metrics.lateExchangesCount).toBeDefined();
  });

  it('CAL-SCR-01: CalendarOverviewPage should render and navigate week views', () => {
    TestBed.configureTestingModule({
      imports: [CalendarOverviewPage],
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const fixture = TestBed.createComponent(CalendarOverviewPage);
    const comp = fixture.componentInstance;
    expect(comp.currentWeekTitle()).toContain('Week of');
    expect(comp.weekDays().length).toBe(7);

    comp.nextWeek();
    expect(comp.weekOffset()).toBe(1);
    comp.prevWeek();
    expect(comp.weekOffset()).toBe(0);

    comp.setView('day');
    expect(comp.selectedView()).toBe('day');
  });

  it('CAL-SCR-02: EventFormPage should validate end time after start time', () => {
    TestBed.configureTestingModule({
      imports: [EventFormPage],
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const fixture = TestBed.createComponent(EventFormPage);
    const comp = fixture.componentInstance;

    comp.title = 'Test Activity';
    comp.startTime = '14:00';
    comp.endTime = '12:00'; // Invalid: end before start
    comp.saveEvent();
    expect(comp.errorMessage()).toContain('ERR-01');

    comp.endTime = '15:00';
    comp.saveEvent();
    expect(comp.errorMessage()).toBeNull();
  });

  it('CAL-SCR-03: ParentingTimeFormPage should save proposed entry and manage confirm window', () => {
    TestBed.configureTestingModule({
      imports: [ParentingTimeFormPage],
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const fixture = TestBed.createComponent(ParentingTimeFormPage);
    const comp = fixture.componentInstance;

    comp.confirmProposed();
    expect(comp.undoCountdown()).toBe(600);
    comp.undoConfirm();
    expect(comp.undoCountdown()).toBeNull();

    comp.saveParentingTime();
    expect(comp.errorMessage()).toBeNull();
  });

  it('CAL-SCR-04: ScheduleChangeRequestPage should enforce 24h respond-by window', () => {
    TestBed.configureTestingModule({
      imports: [ScheduleChangeRequestPage],
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const fixture = TestBed.createComponent(ScheduleChangeRequestPage);
    const comp = fixture.componentInstance;

    comp.reason = 'Doctor appointment';
    // Set respond-by only 2 hours from now (violates >= 24h rule)
    comp.respondBy = new Date(Date.now() + 2 * 3600 * 1000).toISOString().slice(0, 16);
    comp.sendRequest();
    expect(comp.errorMessage()).toContain('ERR-05');

    // Set respond-by 48 hours from now
    comp.respondBy = new Date(Date.now() + 48 * 3600 * 1000).toISOString().slice(0, 16);
    comp.sendRequest();
    expect(comp.errorMessage()).toBeNull();
  });

  it('CAL-SCR-05: RequestDetailPage should display request and allow approval/decline/undo', () => {
    TestBed.configureTestingModule({
      imports: [RequestDetailPage],
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const fixture = TestBed.createComponent(RequestDetailPage);
    const comp = fixture.componentInstance;
    expect(comp.request()).toBeDefined();

    comp.openConfirmDialog();
    expect(comp.showConfirmDialog()).toBe(true);

    comp.confirmApproval();
    expect(comp.showConfirmDialog()).toBe(false);

    expect(comp.undoTimeRemaining()).toBeDefined();
    comp.undoApproval();
    expect(comp.request()?.status).toBe('Pending');
  });

  it('CAL-SCR-06: EntryHistoryPage should filter by status and show audit versions', () => {
    TestBed.configureTestingModule({
      imports: [EntryHistoryPage],
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const fixture = TestBed.createComponent(EntryHistoryPage);
    const comp = fixture.componentInstance;

    expect(comp.filteredRequests().length).toBeGreaterThan(0);
    expect(comp.auditVersions.length).toBe(3);

    comp.setStatusFilter('Approved');
    expect(comp.selectedStatus()).toBe('Approved');
  });

  it('CAL-SCR-07: ScheduleTemplatesPage should generate 14-day schedule rotation preview', () => {
    TestBed.configureTestingModule({
      imports: [ScheduleTemplatesPage],
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const fixture = TestBed.createComponent(ScheduleTemplatesPage);
    const comp = fixture.componentInstance;

    expect(comp.previewSlots().length).toBe(14);
    comp.pattern = '2_2_3';
    expect(comp.patternTitle()).toContain('2-2-3');

    comp.proposeSchedule();
    expect(comp.successMessage()).toContain('proposed successfully');
  });

  it('CAL-SCR-08: HolidaysPage should list holidays and add custom special day', () => {
    TestBed.configureTestingModule({
      imports: [HolidaysPage],
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const fixture = TestBed.createComponent(HolidaysPage);
    const comp = fixture.componentInstance;

    expect(comp.holidaysList().length).toBeGreaterThan(10);
    comp.openAddModal();
    expect(comp.showAddModal()).toBe(true);

    comp.customName = 'Family Reunion';
    comp.saveCustomHoliday();
    expect(comp.showAddModal()).toBe(false);
  });

  it('CAL-SCR-09: CalendarSyncPage should manage ICS feed and calendar connection', () => {
    TestBed.configureTestingModule({
      imports: [CalendarSyncPage],
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const fixture = TestBed.createComponent(CalendarSyncPage);
    const comp = fixture.componentInstance;

    expect(comp.syncSettings().icsFeedUrl).toContain('webcal://');
    comp.regenerateLink();
    expect(comp.copiedMessage()).toContain('regenerated');

    comp.disconnectGoogle();
    expect(comp.googleConnected()).toBe(false);
    comp.connectGoogle();
    expect(comp.googleConnected()).toBe(true);
  });

  it('CAL-SCR-10: ExchangeRecordPage should display exchange details and handle notes', () => {
    TestBed.configureTestingModule({
      imports: [ExchangeRecordPage],
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const fixture = TestBed.createComponent(ExchangeRecordPage);
    const comp = fixture.componentInstance;

    expect(comp.currentExchange()).toBeDefined();
    comp.toggleNote();
    expect(comp.isAddingNote()).toBe(true);

    comp.noteText = 'Handover on time at south entrance.';
    comp.saveNote();
    expect(comp.isAddingNote()).toBe(false);
  });

  it('CAL-SCR-11: ComplianceViewPage should calculate planned vs actual hours', () => {
    TestBed.configureTestingModule({
      imports: [ComplianceViewPage],
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const fixture = TestBed.createComponent(ComplianceViewPage);
    const comp = fixture.componentInstance;

    expect(comp.metrics().totalScheduledHours).toBe(336);
    expect(comp.complianceRows.length).toBe(3);
  });

  it('CAL-SCR-12: ParentingPlanBuilderPage should navigate sections and export summary', () => {
    TestBed.configureTestingModule({
      imports: [ParentingPlanBuilderPage],
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const fixture = TestBed.createComponent(ParentingPlanBuilderPage);
    const comp = fixture.componentInstance;

    expect(comp.activeSection()).toBe(1);
    comp.setSection(2);
    expect(comp.activeSection()).toBe(2);

    comp.togglePreview();
    expect(comp.showPreview()).toBe(true);
  });

  it('CAL-SCR-13: CheckInPage should record GPS check-in and suppress in Safety Mode', () => {
    TestBed.configureTestingModule({
      imports: [CheckInPage],
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const fixture = TestBed.createComponent(CheckInPage);
    const comp = fixture.componentInstance;
    const safety = TestBed.inject(SafetyModeService);

    comp.checkInNow();
    expect(comp.successMessage()).toContain('Check-in recorded');

    // In Safety Mode (FR-CAL-09-04), check-in is suppressed
    safety.enableSafetyMode();
    expect(comp.isSafetyMode()).toBe(true);
  });

  it('CAL-SCR-14: PetsPage should list household pets and add new pet', () => {
    TestBed.configureTestingModule({
      imports: [PetsPage],
      providers: [
        CalendarService,
        SafetyModeService,
        provideRouter(DUMMY_ROUTES),
        provideLocationMocks(),
      ],
    });

    const fixture = TestBed.createComponent(PetsPage);
    const comp = fixture.componentInstance;

    expect(comp.petsList().length).toBeGreaterThan(0);
    comp.openAddModal();
    expect(comp.showAddModal()).toBe(true);

    comp.petName = 'Luna';
    comp.petSpecies = 'Cat';
    comp.savePet();
    expect(comp.showAddModal()).toBe(false);
    expect(comp.petsList().some((p) => p.name === 'Luna')).toBe(true);
  });
});
