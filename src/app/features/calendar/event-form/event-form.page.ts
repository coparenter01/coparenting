import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CalendarService } from '@core/calendar/calendar.service';
import type { CalendarRepeatRule } from '@core/calendar/calendar.types';

@Component({
  selector: 'pp-event-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './event-form.page.html',
  styleUrl: './event-form.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormPage {
  private readonly calendarService = inject(CalendarService);
  private readonly router = inject(Router);

  title = '';
  details = '';
  date = new Date().toISOString().slice(0, 10);
  startTime = '10:00';
  endTime = '11:30';
  location = '';
  dropOffParent = '';
  pickUpParent = '';
  repeats: CalendarRepeatRule = 'None';
  isPrivate = false;

  readonly isEditing = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly selectedChildren = signal<{ id: string; name: string }[]>([
    { id: 'child-1', name: 'Maya Rivera' },
  ]);

  readonly hasOverlapWarning = computed<boolean>(() => {
    if (!this.date || !this.startTime || !this.endTime) return false;
    const startIso = new Date(`${this.date}T${this.startTime}:00`).toISOString();
    const endIso = new Date(`${this.date}T${this.endTime}:00`).toISOString();
    return this.calendarService.checkOverlap(startIso, endIso);
  });

  isChildSelected(id: string): boolean {
    return this.selectedChildren().some((c) => c.id === id);
  }

  toggleChild(id: string, name: string): void {
    this.selectedChildren.update((list) => {
      const exists = list.some((c) => c.id === id);
      if (exists) {
        return list.filter((c) => c.id !== id);
      }
      return [...list, { id, name }];
    });
  }

  saveEvent(): void {
    this.errorMessage.set(null);
    if (!this.title.trim()) {
      this.errorMessage.set('Title is required.');
      return;
    }

    const startDateTime = new Date(`${this.date}T${this.startTime}:00`);
    const endDateTime = new Date(`${this.date}T${this.endTime}:00`);

    if (endDateTime.getTime() <= startDateTime.getTime()) {
      this.errorMessage.set('End time must come after start time (ERR-01).');
      return;
    }

    this.calendarService.createEvent({
      householdId: 'hh-1',
      entryType: 'Event',
      title: this.title.trim(),
      details: this.details.trim() || undefined,
      location: this.location.trim() || undefined,
      startAt: startDateTime.toISOString(),
      endAt: endDateTime.toISOString(),
      visibility: this.isPrivate ? 'Private' : 'Shared',
      status: 'Active',
      repeatRule: this.repeats,
      source: 'Parent',
      childIds: this.selectedChildren().map((c) => c.id),
      childNames: this.selectedChildren().map((c) => c.name),
      createdBy: 'user-1',
    });

    void this.router.navigate(['/calendar']);
  }

  editSample(): void {
    this.isEditing.set(true);
    this.title = 'Pediatric Dental Checkup';
    this.details = 'Routine clean and fluoride check.';
    this.location = '124 Elm Street, Suite 300';
    this.startTime = '10:00';
    this.endTime = '11:30';
  }

  cancelSample(): void {
    this.calendarService.cancelEvent('entry-2');
    void this.router.navigate(['/calendar']);
  }
}
