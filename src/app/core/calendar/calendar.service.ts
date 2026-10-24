import { computed, inject, Injectable, signal } from '@angular/core';
import { SafetyModeService } from '../safety/safety-mode.service';
import { buildInitialHolidays, SCHEDULE_PATTERN_CONFIGS } from './calendar-templates.utils';
import type {
  CalendarComplianceMetrics,
  CalendarEntryModel,
  CalendarHolidayModel,
  CalendarSyncSettingsModel,
  CustodyExchangeModel,
  ExchangeCheckInModel,
  HouseholdPetModel,
  ParentingPlanModel,
  ScheduleChangeRequestModel,
  ScheduleTemplateModel,
} from './calendar.types';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private readonly safetyMode = inject(SafetyModeService);

  readonly entries = signal<CalendarEntryModel[]>([
    {
      id: 'entry-1',
      householdId: 'hh-1',
      entryType: 'Parenting time',
      title: 'Parenting Time — Rivera',
      startAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      endAt: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
      responsibleParentId: 'user-1',
      responsibleParentName: 'Elena Rivera',
      responsibleParentColor: '#0E5A63',
      visibility: 'Shared',
      status: 'Active',
      repeatRule: 'Weekly',
      source: 'Schedule',
      childIds: ['child-1', 'child-2'],
      childNames: ['Maya Rivera', 'Leo Rivera'],
      createdBy: 'user-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'entry-2',
      householdId: 'hh-1',
      entryType: 'Event',
      title: 'Pediatric Dental Checkup',
      details: 'Routine clean and fluoride check at Children’s Health Clinic.',
      location: '124 Elm Street, Suite 300',
      startAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      endAt: new Date(Date.now() + 26 * 3600 * 1000).toISOString(),
      responsibleParentId: 'user-1',
      responsibleParentName: 'Elena Rivera',
      visibility: 'Shared',
      status: 'Active',
      source: 'Parent',
      childIds: ['child-1'],
      childNames: ['Maya Rivera'],
      createdBy: 'user-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  readonly requests = signal<ScheduleChangeRequestModel[]>([
    {
      id: 'req-1',
      householdId: 'hh-1',
      requestType: 'Swap days',
      requestedBy: 'user-2',
      requestedByName: 'David Chen',
      changeStartAt: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
      changeEndAt: new Date(Date.now() + 96 * 3600 * 1000).toISOString(),
      tradeStartAt: new Date(Date.now() + 144 * 3600 * 1000).toISOString(),
      tradeEndAt: new Date(Date.now() + 168 * 3600 * 1000).toISOString(),
      reason: 'Work conference trip on Thursday; offering weekend in return.',
      respondByAt: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
      status: 'Pending',
      childIds: ['child-1', 'child-2'],
      childNames: ['Maya Rivera', 'Leo Rivera'],
      createdAt: new Date().toISOString(),
    },
  ]);

  readonly templates = signal<ScheduleTemplateModel[]>([
    {
      id: 'tmpl-1',
      householdId: 'hh-1',
      name: '2-2-3 Standard Schedule',
      patternType: '2_2_3',
      cycleDays: 14,
      cycleDefinition: {
        parentDays: SCHEDULE_PATTERN_CONFIGS['2_2_3'].defaultDays.map((role, idx) => ({
          dayIndex: idx,
          parentRole: role,
        })),
      },
      startDate: new Date().toISOString().slice(0, 10),
      createdBy: 'user-1',
      createdAt: new Date().toISOString(),
    },
  ]);

  readonly holidays = signal<CalendarHolidayModel[]>(buildInitialHolidays('hh-1'));

  readonly syncSettings = signal<CalendarSyncSettingsModel>({
    id: 'sync-1',
    householdId: 'hh-1',
    userId: 'user-1',
    provider: 'ics',
    icsToken: 'cal_sec_tok_991823746152',
    icsFeedUrl: 'webcal://app.parentpath.org/api/calendar/feed/cal_sec_tok_991823746152.ics',
    sendMode: 'both',
    isConnected: true,
    lastSyncedAt: new Date().toISOString(),
  });

  readonly exchanges = signal<CustodyExchangeModel[]>([
    {
      id: 'exch-1',
      householdId: 'hh-1',
      entryId: 'entry-1',
      entryTitle: 'Parenting Time — Rivera',
      handedOverBy: 'user-2',
      handedOverByName: 'David Chen',
      receivedBy: 'user-1',
      receivedByName: 'Elena Rivera',
      scheduledTime: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      actualTime: new Date(Date.now() - 24 * 3600 * 1000 + 300000).toISOString(), // 5 min
      isLate: false,
      status: 'Confirmed',
      notes: 'Handover at library parking lot went smoothly.',
      createdBy: 'user-1',
      createdAt: new Date(Date.now() - 23 * 3600 * 1000).toISOString(),
    },
  ]);

  readonly checkIns = signal<ExchangeCheckInModel[]>([
    {
      id: 'chk-1',
      householdId: 'hh-1',
      exchangeId: 'exch-1',
      userId: 'user-1',
      userName: 'Elena Rivera',
      checkedInAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      latitude: 37.7749,
      longitude: -122.4194,
      accuracyMeters: 8,
      address: 'Central Library, San Francisco, CA',
      mapUrl: 'https://maps.google.com/?q=37.7749,-122.4194',
      isShared: true,
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
  ]);

  readonly plans = signal<ParentingPlanModel[]>([
    {
      id: 'plan-1',
      householdId: 'hh-1',
      title: 'Agreed 2026 Parenting Plan',
      answers: {
        scheduleRoutine: '2-2-3 rotation alternating weekends on Friday 18:00',
        holidayApproach: 'Alternating major holidays by odd/even calendar year',
        exchangeLocations: 'School curbside on school days, public library on weekends',
        transportation: 'Receiving parent provides transportation',
        communicationRules: 'All logistics conducted exclusively via ParentPath messaging',
        medicalDecisions:
          'Joint consultation with 48 hours to reply before non-emergency treatment',
        travelNoticeDays: 30,
      },
      isShared: true,
      legalReviewCompleted: true,
      createdBy: 'user-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  readonly pets = signal<HouseholdPetModel[]>([
    {
      id: 'pet-1',
      householdId: 'hh-1',
      name: 'Barnaby',
      species: 'Golden Retriever',
      breed: 'Retriever',
      notes: 'Dietary medication with dinner. Travels with children during weekend swaps.',
      createdBy: 'user-1',
      createdAt: new Date().toISOString(),
    },
  ]);

  readonly compliance = computed<CalendarComplianceMetrics>(() => {
    const exchs = this.exchanges();
    const reqs = this.requests();
    let lateCount = 0;
    let unconfirmedCount = 0;
    let disputedCount = 0;

    for (const e of exchs) {
      if (e.isLate) lateCount++;
      if (e.status === 'Unconfirmed') unconfirmedCount++;
      if (e.status === 'Disputed') disputedCount++;
    }

    return {
      month: new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      parentAScheduledHours: 168,
      parentAActualHours: 166,
      parentBScheduledHours: 168,
      parentBActualHours: 170,
      totalScheduledHours: 336,
      totalActualHours: 336,
      lateExchangesCount: lateCount,
      unconfirmedCount,
      disputedCount,
      changeRequestsPending: reqs.filter((r) => r.status === 'Pending').length,
      changeRequestsApproved: reqs.filter((r) => r.status === 'Approved').length,
      changeRequestsDeclined: reqs.filter((r) => r.status === 'Declined').length,
    };
  });

  // Entry Actions
  createEvent(
    data: Omit<CalendarEntryModel, 'id' | 'createdAt' | 'updatedAt'>,
  ): CalendarEntryModel {
    const newEntry: CalendarEntryModel = {
      ...data,
      id: 'entry-' + Date.now().toString(36),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.entries.update((list) => [newEntry, ...list]);
    return newEntry;
  }

  cancelEvent(entryId: string): void {
    this.entries.update((list) =>
      list.map((e) =>
        e.id === entryId ? { ...e, status: 'Cancelled', updatedAt: new Date().toISOString() } : e,
      ),
    );
  }

  checkOverlap(startAt: string, endAt: string, excludeId?: string): boolean {
    const s = new Date(startAt).getTime();
    const e = new Date(endAt).getTime();
    return this.entries().some((item) => {
      if (excludeId && item.id === excludeId) return false;
      if (item.status === 'Cancelled') return false;
      const itemS = new Date(item.startAt).getTime();
      const itemE = new Date(item.endAt).getTime();
      return Math.max(s, itemS) < Math.min(e, itemE);
    });
  }

  // Request Actions
  createChangeRequest(
    data: Omit<ScheduleChangeRequestModel, 'id' | 'createdAt' | 'status'>,
  ): ScheduleChangeRequestModel {
    const newReq: ScheduleChangeRequestModel = {
      ...data,
      id: 'req-' + Date.now().toString(36),
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    this.requests.update((list) => [newReq, ...list]);
    return newReq;
  }

  approveRequest(requestId: string, respondedBy: string): void {
    // 10-minute undo countdown window
    const undoUntil = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    this.requests.update((list) =>
      list.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'Approved',
              respondedBy,
              respondedAt: new Date().toISOString(),
              undoUntil,
            }
          : r,
      ),
    );
  }

  undoApproval(requestId: string): void {
    this.requests.update((list) =>
      list.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'Pending',
              undoUntil: undefined,
              respondedBy: undefined,
              respondedAt: undefined,
            }
          : r,
      ),
    );
  }

  declineRequest(requestId: string, respondedBy: string, reason?: string): void {
    this.requests.update((list) =>
      list.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'Declined',
              respondedBy,
              responseReason: reason,
              respondedAt: new Date().toISOString(),
            }
          : r,
      ),
    );
  }

  withdrawRequest(requestId: string): void {
    this.requests.update((list) =>
      list.map((r) => (r.id === requestId ? { ...r, status: 'Withdrawn' } : r)),
    );
  }

  // Exchange actions
  recordExchange(
    data: Omit<CustodyExchangeModel, 'id' | 'createdAt' | 'isLate'>,
  ): CustodyExchangeModel {
    const sTime = new Date(data.scheduledTime).getTime();
    const aTime = new Date(data.actualTime).getTime();
    const isLate = aTime - sTime > 15 * 60 * 1000;

    const newExch: CustodyExchangeModel = {
      ...data,
      id: 'exch-' + Date.now().toString(36),
      isLate,
      createdAt: new Date().toISOString(),
    };
    this.exchanges.update((list) => [newExch, ...list]);
    return newExch;
  }

  confirmExchange(exchangeId: string): void {
    this.exchanges.update((list) =>
      list.map((e) => (e.id === exchangeId ? { ...e, status: 'Confirmed' } : e)),
    );
  }

  disputeExchange(exchangeId: string, reason: string): void {
    this.exchanges.update((list) =>
      list.map((e) =>
        e.id === exchangeId ? { ...e, status: 'Disputed', disputeReason: reason } : e,
      ),
    );
  }

  // Check-In actions
  recordCheckIn(params: {
    lat: number;
    lng: number;
    address?: string;
    exchangeId?: string;
    entryId?: string;
  }): ExchangeCheckInModel | null {
    if (this.safetyMode.safetyModeActive()) {
      return null; // Suppressed in Safety Mode (FR-CAL-09-04)
    }

    const newCheckIn: ExchangeCheckInModel = {
      id: 'chk-' + Date.now().toString(36),
      householdId: 'hh-1',
      exchangeId: params.exchangeId,
      entryId: params.entryId,
      userId: 'user-1',
      userName: 'Elena Rivera',
      checkedInAt: new Date().toISOString(),
      latitude: params.lat,
      longitude: params.lng,
      accuracyMeters: 5,
      address: params.address ?? 'Exchange Location',
      mapUrl: `https://maps.google.com/?q=${params.lat.toString()},${params.lng.toString()}`,
      isShared: true,
      createdAt: new Date().toISOString(),
    };
    this.checkIns.update((list) => [newCheckIn, ...list]);
    return newCheckIn;
  }

  // Sync token regeneration
  regenerateIcsToken(): string {
    const newToken = 'cal_sec_tok_' + Math.random().toString(36).substring(2, 12);
    this.syncSettings.update((s) => ({
      ...s,
      icsToken: newToken,
      icsFeedUrl: 'webcal://app.parentpath.org/api/calendar/feed/' + newToken + '.ics',
      lastSyncedAt: new Date().toISOString(),
    }));
    return newToken;
  }

  // Pet actions
  addPet(name: string, species: string, breed?: string, notes?: string): HouseholdPetModel {
    const newPet: HouseholdPetModel = {
      id: 'pet-' + Date.now().toString(36),
      householdId: 'hh-1',
      name,
      species,
      breed,
      notes,
      createdBy: 'user-1',
      createdAt: new Date().toISOString(),
    };
    this.pets.update((list) => [...list, newPet]);
    return newPet;
  }
}
