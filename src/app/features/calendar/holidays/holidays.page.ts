import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CalendarService } from '@core/calendar/calendar.service';
import type { CalendarHolidayModel, HolidayRule } from '@core/calendar/calendar.types';

@Component({
  selector: 'pp-holidays',
  imports: [FormsModule, RouterLink],
  templateUrl: './holidays.page.html',
  styleUrl: './holidays.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HolidaysPage {
  private readonly calendarService = inject(CalendarService);

  readonly holidaysList = this.calendarService.holidays;
  readonly showAddModal = signal<boolean>(false);

  customName = '';
  customDate = new Date().toISOString().split('T')[0];
  customParent = 'Elena Rivera';
  customRule: HolidayRule = 'Every year';

  formatHolidayDate(holiday: CalendarHolidayModel): string {
    if (holiday.customStartDate) {
      return holiday.customStartDate;
    }
    const dates: Record<string, string> = {
      new_years_day: 'Jan 1',
      mlk_day: '3rd Mon in Jan',
      presidents_day: '3rd Mon in Feb',
      easter: 'Spring (varies)',
      memorial_day: 'Last Mon in May',
      mothers_day: '2nd Sun in May',
      fathers_day: '3rd Sun in Jun',
      independence_day: 'Jul 4',
      labor_day: '1st Mon in Sep',
      halloween: 'Oct 31',
      thanksgiving: '4th Thu in Nov',
      christmas_eve: 'Dec 24',
      christmas_day: 'Dec 25',
      winter_break: 'Dec 22 – Jan 4',
      spring_break: 'Mar 15 – Mar 22',
      summer_break: 'Jun 15 – Aug 15',
    };
    return dates[holiday.holidayKey] ?? 'Annual date';
  }

  updateAssignedParent(holidayId: string, parentName: string): void {
    this.calendarService.holidays.update((list) =>
      list.map((h) => (h.id === holidayId ? { ...h, assignedParentName: parentName } : h)),
    );
  }

  updateHolidayRule(holidayId: string, rule: HolidayRule): void {
    this.calendarService.holidays.update((list) =>
      list.map((h) => (h.id === holidayId ? { ...h, rule } : h)),
    );
  }

  openAddModal(): void {
    this.showAddModal.set(true);
  }

  closeAddModal(): void {
    this.showAddModal.set(false);
  }

  saveCustomHoliday(): void {
    if (!this.customName.trim()) return;
    const newHol: CalendarHolidayModel = {
      id: 'custom-' + Date.now().toString(36),
      householdId: 'hh-1',
      holidayKey: 'custom_' + Date.now().toString(36),
      name: this.customName.trim(),
      assignedParentName: this.customParent,
      rule: this.customRule,
      customStartDate: this.customDate,
      status: 'Active',
      createdBy: 'user-1',
      createdAt: new Date().toISOString(),
    };
    this.calendarService.holidays.update((list) => [...list, newHol]);
    this.customName = '';
    this.showAddModal.set(false);
  }
}
