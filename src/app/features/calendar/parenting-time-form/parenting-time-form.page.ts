import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CalendarService } from '@core/calendar/calendar.service';
import type { CalendarRepeatRule } from '@core/calendar/calendar.types';

@Component({
  selector: 'pp-parenting-time-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './parenting-time-form.page.html',
  styleUrl: './parenting-time-form.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentingTimeFormPage {
  private readonly calendarService = inject(CalendarService);
  private readonly router = inject(Router);

  parentName = 'David Chen';
  startDateTime = new Date(Date.now() + 48 * 3600 * 1000).toISOString().slice(0, 16);
  endDateTime = new Date(Date.now() + 96 * 3600 * 1000).toISOString().slice(0, 16);
  repeats: CalendarRepeatRule = 'Weekly';

  readonly errorMessage = signal<string | null>(null);
  readonly undoCountdown = signal<number | null>(null);
  readonly selectedChildren = signal<{ id: string; name: string }[]>([
    { id: 'child-1', name: 'Maya Rivera' },
    { id: 'child-2', name: 'Leo Rivera' },
  ]);

  readonly hasOverlapWarning = computed<boolean>(() => {
    if (!this.startDateTime || !this.endDateTime) return false;
    const startIso = new Date(this.startDateTime).toISOString();
    const endIso = new Date(this.endDateTime).toISOString();
    return this.calendarService.checkOverlap(startIso, endIso);
  });

  isChildSelected(id: string): boolean {
    return this.selectedChildren().some((c) => c.id === id);
  }

  toggleChild(id: string, name: string): void {
    this.selectedChildren.update((list) => {
      const exists = list.some((c) => c.id === id);
      if (exists) return list.filter((c) => c.id !== id);
      return [...list, { id, name }];
    });
  }

  saveParentingTime(): void {
    this.errorMessage.set(null);
    const start = new Date(this.startDateTime).getTime();
    const end = new Date(this.endDateTime).getTime();

    if (end <= start) {
      this.errorMessage.set('End time must come after start time (ERR-01).');
      return;
    }

    this.calendarService.createEvent({
      householdId: 'hh-1',
      entryType: 'Parenting time',
      title: 'Parenting Time — ' + this.parentName,
      startAt: new Date(this.startDateTime).toISOString(),
      endAt: new Date(this.endDateTime).toISOString(),
      responsibleParentName: this.parentName,
      responsibleParentColor: this.parentName.includes('Rivera') ? '#0E5A63' : '#D97736',
      visibility: 'Shared',
      status: 'Proposed', // Proposed in linked household (FR-CAL-01-09)
      repeatRule: this.repeats,
      source: 'Parent',
      childIds: this.selectedChildren().map((c) => c.id),
      childNames: this.selectedChildren().map((c) => c.name),
      createdBy: 'user-1',
    });

    void this.router.navigate(['/calendar']);
  }

  confirmProposed(): void {
    // Starts the 10-minute undo window
    this.undoCountdown.set(600);
  }

  undoConfirm(): void {
    this.undoCountdown.set(null);
  }
}
