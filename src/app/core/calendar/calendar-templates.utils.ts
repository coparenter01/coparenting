import type {
  CalendarHolidayModel,
  HolidayRule,
  SchedulePatternType,
  ScheduleTemplateModel,
} from './calendar.types';

export interface DefaultHolidayDef {
  key: string;
  name: string;
  defaultRule: HolidayRule;
  month: number; // 1-12
  day?: number;
  fixedName: string;
}

export const US_STANDARD_HOLIDAYS: DefaultHolidayDef[] = [
  {
    key: 'new_years_day',
    name: "New Year's Day",
    defaultRule: 'Every year',
    month: 1,
    day: 1,
    fixedName: "New Year's Day",
  },
  {
    key: 'mlk_day',
    name: 'Martin Luther King Jr. Day',
    defaultRule: 'Odd years',
    month: 1,
    fixedName: 'MLK Day',
  },
  {
    key: 'presidents_day',
    name: "Presidents' Day",
    defaultRule: 'Even years',
    month: 2,
    fixedName: "Presidents' Day",
  },
  { key: 'easter', name: 'Easter Sunday', defaultRule: 'Odd years', month: 4, fixedName: 'Easter' },
  {
    key: 'memorial_day',
    name: 'Memorial Day',
    defaultRule: 'Even years',
    month: 5,
    fixedName: 'Memorial Day',
  },
  {
    key: 'mothers_day',
    name: "Mother's Day",
    defaultRule: 'Every year',
    month: 5,
    fixedName: "Mother's Day",
  },
  {
    key: 'fathers_day',
    name: "Father's Day",
    defaultRule: 'Every year',
    month: 6,
    fixedName: "Father's Day",
  },
  {
    key: 'independence_day',
    name: 'Independence Day (4th of July)',
    defaultRule: 'Odd years',
    month: 7,
    day: 4,
    fixedName: '4th of July',
  },
  {
    key: 'labor_day',
    name: 'Labor Day',
    defaultRule: 'Even years',
    month: 9,
    fixedName: 'Labor Day',
  },
  {
    key: 'halloween',
    name: 'Halloween',
    defaultRule: 'Odd years',
    month: 10,
    day: 31,
    fixedName: 'Halloween',
  },
  {
    key: 'thanksgiving',
    name: 'Thanksgiving',
    defaultRule: 'Even years',
    month: 11,
    fixedName: 'Thanksgiving',
  },
  {
    key: 'christmas_eve',
    name: 'Christmas Eve',
    defaultRule: 'Odd years',
    month: 12,
    day: 24,
    fixedName: 'Christmas Eve',
  },
  {
    key: 'christmas_day',
    name: 'Christmas Day',
    defaultRule: 'Even years',
    month: 12,
    day: 25,
    fixedName: 'Christmas Day',
  },
  {
    key: 'winter_break',
    name: 'Winter School Break',
    defaultRule: 'Split',
    month: 12,
    fixedName: 'Winter Break',
  },
  {
    key: 'spring_break',
    name: 'Spring School Break',
    defaultRule: 'Odd years',
    month: 3,
    fixedName: 'Spring Break',
  },
  {
    key: 'summer_break',
    name: 'Summer School Break',
    defaultRule: 'Split',
    month: 7,
    fixedName: 'Summer Break',
  },
];

export const SCHEDULE_PATTERN_CONFIGS: Record<
  SchedulePatternType,
  { label: string; description: string; cycleDays: number; defaultDays: ('Parent' | 'Co-parent')[] }
> = {
  alternating_weeks: {
    label: 'Alternating Weeks (7-7)',
    description: 'Children spend 7 days with Parent A, then 7 days with Parent B.',
    cycleDays: 14,
    defaultDays: [
      'Parent',
      'Parent',
      'Parent',
      'Parent',
      'Parent',
      'Parent',
      'Parent',
      'Co-parent',
      'Co-parent',
      'Co-parent',
      'Co-parent',
      'Co-parent',
      'Co-parent',
      'Co-parent',
    ],
  },
  '2_2_3': {
    label: '2-2-3 Rotation',
    description:
      '2 days with Parent A, 2 days with Parent B, 3 days with Parent A, then vice versa.',
    cycleDays: 14,
    defaultDays: [
      'Parent',
      'Parent',
      'Co-parent',
      'Co-parent',
      'Parent',
      'Parent',
      'Parent',
      'Co-parent',
      'Co-parent',
      'Parent',
      'Parent',
      'Co-parent',
      'Co-parent',
      'Co-parent',
    ],
  },
  '2_2_5_5': {
    label: '2-2-5-5 Schedule',
    description: '2 days Parent A, 2 days Parent B, 5 days Parent A, 5 days Parent B.',
    cycleDays: 14,
    defaultDays: [
      'Parent',
      'Parent',
      'Co-parent',
      'Co-parent',
      'Parent',
      'Parent',
      'Parent',
      'Parent',
      'Parent',
      'Co-parent',
      'Co-parent',
      'Co-parent',
      'Co-parent',
      'Co-parent',
    ],
  },
  '3_4_4_3': {
    label: '3-4-4-3 Rotation',
    description: '3 days Parent A, 4 days Parent B, 4 days Parent A, 3 days Parent B.',
    cycleDays: 14,
    defaultDays: [
      'Parent',
      'Parent',
      'Parent',
      'Co-parent',
      'Co-parent',
      'Co-parent',
      'Co-parent',
      'Parent',
      'Parent',
      'Parent',
      'Parent',
      'Co-parent',
      'Co-parent',
      'Co-parent',
    ],
  },
  every_other_weekend: {
    label: 'Every Other Weekend',
    description: 'One parent has weekdays, other parent has alternating weekends.',
    cycleDays: 14,
    defaultDays: [
      'Parent',
      'Parent',
      'Parent',
      'Parent',
      'Co-parent',
      'Co-parent',
      'Parent',
      'Parent',
      'Parent',
      'Parent',
      'Parent',
      'Parent',
      'Parent',
      'Parent',
    ],
  },
  custom: {
    label: 'Custom Rotation',
    description: 'Build your own custom repeating cycle.',
    cycleDays: 14,
    defaultDays: Array(14).fill('Parent') as ('Parent' | 'Co-parent')[],
  },
};

export function buildTemplatePreview(
  template: ScheduleTemplateModel,
  startDateStr: string,
  totalDays = 14,
): { date: string; parentRole: 'Parent' | 'Co-parent'; dayOfWeek: string }[] {
  const result: { date: string; parentRole: 'Parent' | 'Co-parent'; dayOfWeek: string }[] = [];
  const base = new Date(startDateStr);
  const cycleDays = template.cycleDays || 14;
  const parentDays = template.cycleDefinition.parentDays;

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(base.getTime() + i * 24 * 60 * 60 * 1000);
    const dayIndexInCycle = i % cycleDays;
    const slot = parentDays.find((p) => p.dayIndex === dayIndexInCycle);
    const role = slot ? slot.parentRole : 'Parent';
    result.push({
      date: d.toISOString().slice(0, 10),
      dayOfWeek: d.toLocaleDateString('en-US', { weekday: 'short' }),
      parentRole: role,
    });
  }
  return result;
}

export function buildInitialHolidays(householdId: string): CalendarHolidayModel[] {
  return US_STANDARD_HOLIDAYS.map((h, idx) => ({
    id: 'hol-' + String(idx + 1),
    householdId,
    holidayKey: h.key,
    name: h.name,
    rule: h.defaultRule,
    status: 'Active',
    createdBy: 'system',
    createdAt: new Date().toISOString(),
  }));
}
