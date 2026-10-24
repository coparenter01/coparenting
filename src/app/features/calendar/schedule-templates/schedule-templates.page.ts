import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  buildTemplatePreview,
  SCHEDULE_PATTERN_CONFIGS,
} from '@core/calendar/calendar-templates.utils';
import { CalendarService } from '@core/calendar/calendar.service';
import type { SchedulePatternType, ScheduleTemplateModel } from '@core/calendar/calendar.types';

@Component({
  selector: 'pp-schedule-templates',
  imports: [FormsModule, RouterLink],
  templateUrl: './schedule-templates.page.html',
  styleUrl: './schedule-templates.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleTemplatesPage {
  private readonly calendarService = inject(CalendarService);

  pattern: SchedulePatternType = 'alternating_weeks';
  startDate = new Date().toISOString().slice(0, 10);
  repeatsUntil = new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString().slice(0, 10);

  readonly successMessage = signal<string | null>(null);

  readonly patternTitle = computed<string>(() => {
    return SCHEDULE_PATTERN_CONFIGS[this.pattern].label;
  });

  readonly previewSlots = computed(() => {
    const config = SCHEDULE_PATTERN_CONFIGS[this.pattern];
    const template: ScheduleTemplateModel = {
      id: 'preview',
      householdId: 'hh-1',
      name: config.label,
      patternType: this.pattern,
      cycleDays: config.cycleDays,
      cycleDefinition: {
        parentDays: config.defaultDays.map((r, i) => ({
          dayIndex: i,
          parentRole: r,
        })),
      },
      startDate: this.startDate,
      createdBy: 'user-1',
      createdAt: new Date().toISOString(),
    };
    return buildTemplatePreview(template, this.startDate, 14);
  });

  onPatternChange(): void {
    this.successMessage.set(null);
  }

  proposeSchedule(): void {
    const slots = this.previewSlots();
    for (const slot of slots) {
      const isParentA = slot.parentRole === 'Parent';
      this.calendarService.createEvent({
        householdId: 'hh-1',
        entryType: 'Parenting time',
        title: 'Parenting Time — ' + (isParentA ? 'Elena Rivera' : 'David Chen'),
        startAt: slot.date + 'T09:00:00.000Z',
        endAt: slot.date + 'T21:00:00.000Z',
        responsibleParentName: isParentA ? 'Elena Rivera' : 'David Chen',
        responsibleParentColor: isParentA ? '#0E5A63' : '#D97736',
        visibility: 'Shared',
        status: 'Proposed', // Saved as Proposed until co-parent confirms (FR-CAL-03-05)
        repeatRule: 'Weekly',
        source: 'Schedule',
        childIds: ['child-1', 'child-2'],
        childNames: ['Maya Rivera', 'Leo Rivera'],
        createdBy: 'user-1',
      });
    }

    this.successMessage.set(
      'Schedule pattern proposed successfully! 14 days generated as Proposed awaiting confirmation.',
    );
  }
}
