import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CalendarService } from '@core/calendar/calendar.service';

@Component({
  selector: 'pp-parenting-plan-builder',
  imports: [FormsModule, RouterLink],
  templateUrl: './parenting-plan-builder.page.html',
  styleUrl: './parenting-plan-builder.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentingPlanBuilderPage {
  private readonly calendarService = inject(CalendarService);

  readonly activeSection = signal<number>(1);
  readonly showPreview = signal<boolean>(false);

  scheduleRoutine = '2-2-3 rotation alternating weekends on Friday 18:00';
  handoverRoutine = 'Curbside at school on school days; library parking lot on non-school days';
  holidayApproach = 'Alternating odd/even years';
  travelNoticeDays = 30;
  exchangeLocations = 'Central Library Parking Lot, San Francisco';
  transportation = 'Receiving parent provides transportation for the exchange';
  communicationRules = 'All logistical communication via ParentPath messaging';
  medicalDecisions = 'Joint consultation with 48 hours notice for elective medical appointments';

  setSection(sec: number): void {
    this.activeSection.set(sec);
  }

  saveAndContinue(): void {
    this.calendarService.plans.update((list) => [
      {
        id: 'plan-1',
        householdId: 'hh-1',
        title: 'Agreed 2026 Parenting Plan',
        answers: {
          scheduleRoutine: this.scheduleRoutine,
          holidayApproach: this.holidayApproach,
          exchangeLocations: this.exchangeLocations,
          transportation: this.transportation,
          communicationRules: this.communicationRules,
          medicalDecisions: this.medicalDecisions,
          travelNoticeDays: this.travelNoticeDays,
        },
        isShared: true,
        legalReviewCompleted: true,
        createdBy: 'user-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ...list.slice(1),
    ]);

    if (this.activeSection() < 4) {
      this.activeSection.update((s) => s + 1);
    } else {
      this.showPreview.set(true);
    }
  }

  togglePreview(): void {
    this.showPreview.update((v) => !v);
  }

  exportPdf(): void {
    const textContent =
      'PARENTING PLAN SUMMARY\n' +
      'Schedule: ' +
      this.scheduleRoutine +
      '\n' +
      'Holidays: ' +
      this.holidayApproach +
      '\n' +
      'Exchanges: ' +
      this.exchangeLocations +
      '\n' +
      'Notice: ' +
      String(this.travelNoticeDays) +
      ' days.\n' +
      'Generated: ' +
      new Date().toISOString();

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'parenting-plan-2026.txt';
    a.click();
    URL.revokeObjectURL(url);
  }
}
