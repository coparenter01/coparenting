import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { ChildrenService } from '@core/children/children.service';
import { HouseholdService } from '@core/household/household.service';
import { ChildEntryDetailPage } from './child-entry-detail/child-entry-detail.page';
import { ChildInformationPage } from './child-information/child-information.page';
import { ChildInformationEntryPage } from './child-information-entry/child-information-entry.page';
import { ChildrenListPage } from './children-list/children-list.page';
import { EmergencyConsentPage } from './emergency-consent/emergency-consent.page';
import { EmergencyContactsPage } from './emergency-contacts/emergency-contacts.page';
import { TaskListsPage } from './task-lists/task-lists.page';
import { WishListPage } from './wish-list/wish-list.page';

describe(
  'Phase 3: Children Module Screens (DOC-SCR-01..04, 10, 11, 14, 15)',
  { timeout: 30000 },
  () => {
    it('ChildrenService should manage children, entries, and emergency contacts', async () => {
      TestBed.configureTestingModule({
        providers: [ChildrenService, HouseholdService, provideRouter([])],
      });
      const service = TestBed.inject(ChildrenService);
      const children = await service.loadChildren('h-test-01');
      expect(children.length).toBeGreaterThanOrEqual(2);

      const res = await service.addChild({
        householdId: 'h-test-01',
        firstName: 'Samantha',
        lastName: 'Vance',
        birthDate: '2020-05-10',
      });
      expect(res.child?.first_name).toBe('Samantha');

      const entries = await service.loadInformationEntries('h-test-01', res.child?.id);
      expect(entries.length).toBeGreaterThanOrEqual(1);

      const newContact = await service.addEmergencyContact({
        householdId: 'h-test-01',
        name: 'Uncle David',
        relationship: 'Uncle',
        phone: '+1 555-019-9999',
      });
      expect(newContact.consent_status).toBe('Pending');

      await service.updateEmergencyConsent(newContact.consent_token, 'Consented');
      const updated = service.emergencyContacts().find((c) => c.id === newContact.id);
      expect(updated?.consent_status).toBe('Consented');
    });

    it('ChildrenListPage (DOC-SCR-01) should render children list and toggle add form', async () => {
      await TestBed.configureTestingModule({
        imports: [ChildrenListPage],
        providers: [provideRouter([]), provideLocationMocks(), ChildrenService, HouseholdService],
      }).compileComponents();

      const childService = TestBed.inject(ChildrenService);
      await childService.loadChildren('demo-household-01');

      const fixture = TestBed.createComponent(ChildrenListPage);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain('Children');
      expect(fixture.componentInstance.children().length).toBeGreaterThan(0);

      fixture.componentInstance.startAddChild();
      fixture.detectChanges();
      expect(fixture.componentInstance.formOpen()).toBe(true);
    });

    it('ChildInformationPage (DOC-SCR-02) should filter entries by section and child', async () => {
      await TestBed.configureTestingModule({
        imports: [ChildInformationPage],
        providers: [provideRouter([]), provideLocationMocks(), ChildrenService, HouseholdService],
      }).compileComponents();

      const childService = TestBed.inject(ChildrenService);
      await childService.loadChildren('demo-household-01');
      await childService.loadInformationEntries('demo-household-01');

      const fixture = TestBed.createComponent(ChildInformationPage);
      fixture.detectChanges();

      const comp = fixture.componentInstance;
      expect(comp.sections).toContain('Medical');
      comp.setSection('School');
      fixture.detectChanges();
      expect(comp.selectedSection()).toBe('School');
    });

    it('ChildInformationEntryPage (DOC-SCR-03) should validate required fields', async () => {
      await TestBed.configureTestingModule({
        imports: [ChildInformationEntryPage],
        providers: [provideRouter([]), provideLocationMocks(), ChildrenService, HouseholdService],
      }).compileComponents();

      const childService = TestBed.inject(ChildrenService);
      await childService.loadChildren('demo-household-01');

      const fixture = TestBed.createComponent(ChildInformationEntryPage);
      fixture.detectChanges();

      const comp = fixture.componentInstance;
      expect(comp.entryForm.valid).toBe(false);
      comp.entryForm.patchValue({
        title: 'Pediatric Asthma Action Plan',
        details: 'Inhaler stored in backpack',
      });
      expect(comp.entryForm.valid).toBe(true);
    });

    it('ChildEntryDetailPage (DOC-SCR-04) should render entry details', async () => {
      await TestBed.configureTestingModule({
        imports: [ChildEntryDetailPage],
        providers: [provideRouter([]), provideLocationMocks(), ChildrenService, HouseholdService],
      }).compileComponents();

      const childService = TestBed.inject(ChildrenService);
      await childService.loadChildren('demo-household-01');
      await childService.loadInformationEntries('demo-household-01');

      const fixture = TestBed.createComponent(ChildEntryDetailPage);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.entry-heading')?.textContent).toBeTruthy();
    });

    it('WishListPage (DOC-SCR-10) should add wish item and toggle reservation claim', async () => {
      await TestBed.configureTestingModule({
        imports: [WishListPage],
        providers: [provideRouter([]), provideLocationMocks(), ChildrenService, HouseholdService],
      }).compileComponents();

      const fixture = TestBed.createComponent(WishListPage);
      const docService = (
        fixture.componentInstance as unknown as {
          documentsService: { loadWishItems: (id: string) => Promise<unknown> };
        }
      ).documentsService;
      await docService.loadWishItems('demo-household-01');
      fixture.detectChanges();

      const comp = fixture.componentInstance;
      expect(comp.items().length).toBeGreaterThan(0);
      const firstItem = comp.items()[0];
      if (firstItem) {
        await comp.toggleClaim(firstItem.id);
        fixture.detectChanges();
        const updated = comp.items().find((i) => i.id === firstItem.id);
        expect(updated?.reserved_by).toBeTruthy();
      }
    });

    it('TaskListsPage (DOC-SCR-11) should render tasks and toggle completion status', async () => {
      await TestBed.configureTestingModule({
        imports: [TaskListsPage],
        providers: [provideRouter([]), provideLocationMocks(), ChildrenService, HouseholdService],
      }).compileComponents();

      const fixture = TestBed.createComponent(TaskListsPage);
      const docService = (
        fixture.componentInstance as unknown as {
          documentsService: { loadTaskLists: (id: string) => Promise<unknown> };
        }
      ).documentsService;
      await docService.loadTaskLists('demo-household-01');
      fixture.detectChanges();

      const comp = fixture.componentInstance;
      expect(comp.tasks().length).toBeGreaterThan(0);
      const firstTask = comp.tasks()[0];
      if (firstTask) {
        const prev = firstTask.is_completed;
        await comp.toggleTask(firstTask.id);
        fixture.detectChanges();
        const updated = comp.tasks().find((t) => t.id === firstTask.id);
        expect(updated?.is_completed).toBe(!prev);
      }
    });

    it('EmergencyContactsPage (DOC-SCR-14) and Consent (DOC-SCR-15) should manage consent', async () => {
      await TestBed.configureTestingModule({
        imports: [EmergencyContactsPage],
        providers: [provideRouter([]), provideLocationMocks(), ChildrenService, HouseholdService],
      }).compileComponents();

      const childService = TestBed.inject(ChildrenService);
      await childService.loadEmergencyContacts('demo-household-01');

      const fixture = TestBed.createComponent(EmergencyContactsPage);
      fixture.detectChanges();

      const comp = fixture.componentInstance;
      expect(comp.contacts().length).toBeGreaterThan(0);

      const consentFixture = TestBed.createComponent(EmergencyConsentPage);
      consentFixture.detectChanges();

      const consentComp = consentFixture.componentInstance;
      await consentComp.setConsent('Consented');
      expect(consentComp.currentStatus()).toBe('Consented');
    }, 15000);
  },
);
