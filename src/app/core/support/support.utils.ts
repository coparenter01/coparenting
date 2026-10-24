import type {
  NewCaseSubmissionDto,
  SupportCategory,
  SupportMeasuresReport,
  SupportPriority,
} from './support.types';

export const SUPPORT_CATEGORIES: Record<SupportCategory, string> = {
  account_and_sign_in: 'Account and sign-in',
  messages_and_calls: 'Messages and calls',
  calendar_and_expenses: 'Calendar and expenses',
  records_and_exports: 'Records and exports',
  child_support_link: 'Child support link',
  safety: 'Safety',
  something_else: 'Something else',
};

export const SUPPORT_HOURS_DESC =
  'Monday to Friday, 8 am to 8 pm Eastern. Closed on US federal holidays.';

export const SUPPORT_MAX_DAILY_REQUESTS = 10;
export const SUPPORT_MAX_SUBJECT_LENGTH = 120;
export const SUPPORT_MAX_DESCRIPTION_LENGTH = 5000;
export const SUPPORT_MAX_ATTACHMENT_COUNT = 3;
export const SUPPORT_MAX_ATTACHMENT_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export function generateCaseNumber(): string {
  const digits = Math.floor(10000000 + Math.random() * 90000000).toString();
  return `SC-${digits}`;
}

export function isCourtDateInPast(courtDateStr: string, now = new Date()): boolean {
  const courtDate = new Date(`${courtDateStr}T00:00:00`);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return courtDate.getTime() < today.getTime();
}

export function isCourtDateWithin14Days(courtDateStr: string, now = new Date()): boolean {
  const courtDate = new Date(`${courtDateStr}T00:00:00`);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 14);
  return courtDate.getTime() >= today.getTime() && courtDate.getTime() <= maxDate.getTime();
}

export function determinePriority(
  category: SupportCategory,
  courtDate?: string,
  now = new Date(),
): SupportPriority {
  if (category === 'safety') {
    return 'priority';
  }
  if (courtDate && isCourtDateWithin14Days(courtDate, now)) {
    return 'priority';
  }
  return 'normal';
}

function getEasternParts(date: Date): {
  dayOfWeek: number;
  hours: number;
  month: number;
  dayOfMonth: number;
  year: number;
} {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    hour12: false,
    weekday: 'short',
  });
  const parts = formatter.formatToParts(date);
  const partMap: Record<string, string> = {};
  for (const p of parts) {
    partMap[p.type] = p.value;
  }
  const dayStr = partMap['weekday'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return {
    dayOfWeek: days.indexOf(dayStr ?? 'Mon'),
    hours: parseInt(partMap['hour'] ?? '0', 10),
    month: parseInt(partMap['month'] ?? '1', 10),
    dayOfMonth: parseInt(partMap['day'] ?? '1', 10),
    year: parseInt(partMap['year'] ?? '2026', 10),
  };
}

const FIXED_HOLIDAYS = new Set(['1-1', '6-19', '7-4', '11-11', '12-25']);

function isFloatingHoliday(month: number, day: number): boolean {
  if (day >= 15 && day <= 21) {
    return month === 1 || month === 2; // MLK or Presidents Day
  }
  const floatingRules: Record<number, [number, number]> = {
    5: [25, 31],
    9: [1, 7],
    10: [8, 14],
    11: [22, 28],
  };
  const range = floatingRules[month];
  return range ? day >= range[0] && day <= range[1] : false;
}

export function isUsFederalHoliday(month: number, day: number): boolean {
  const key = `${String(month)}-${String(day)}`;
  return FIXED_HOLIDAYS.has(key) || isFloatingHoliday(month, day);
}

export function isSupportOpen(date = new Date()): boolean {
  const { dayOfWeek, hours, month, dayOfMonth } = getEasternParts(date);
  if (dayOfWeek === 0 || dayOfWeek === 6) return false;
  if (isUsFederalHoliday(month, dayOfMonth)) return false;
  return hours >= 8 && hours < 20;
}

export function calculateTargetHours(priority: SupportPriority): number {
  return priority === 'priority' ? 4 : 12; // 4h working vs 12h (1 business day)
}

export function calculateTargetTime(fromTime: Date, priority: SupportPriority): string {
  const neededHours = calculateTargetHours(priority);
  const target = new Date(fromTime.getTime());
  target.setHours(target.getHours() + neededHours);
  return target.toISOString();
}

function validateTextLengths(dto: NewCaseSubmissionDto): string | null {
  const subjectTrimmed = dto.subject.trim();
  if (subjectTrimmed.length === 0 || subjectTrimmed.length > SUPPORT_MAX_SUBJECT_LENGTH) {
    return 'ERR-02: Subject must be between 1 and 120 characters.';
  }
  const descTrimmed = dto.description.trim();
  if (descTrimmed.length === 0 || descTrimmed.length > SUPPORT_MAX_DESCRIPTION_LENGTH) {
    return 'ERR-02: Description must be between 1 and 5,000 characters.';
  }
  return null;
}

export function validateCaseSubmission(dto: NewCaseSubmissionDto, now = new Date()): string | null {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!dto.category) {
    return 'ERR-02: Category is required.';
  }
  const lengthErr = validateTextLengths(dto);
  if (lengthErr) return lengthErr;

  if (dto.isCourtDate) {
    if (!dto.courtDate) {
      return 'ERR-02: Please enter the court date.';
    }
    if (isCourtDateInPast(dto.courtDate, now)) {
      return 'ERR-07: Court date cannot be in the past.';
    }
  }
  if (!dto.requesterEmail.includes('@')) {
    return 'ERR-02: Valid email address is required.';
  }
  return null;
}

export function exportMeasuresReportCsv(report: SupportMeasuresReport): string {
  const rows: string[] = [
    'Metric,Value,Target',
    `Cases Opened,${String(report.casesOpened)},N/A`,
    `Cases Closed,${String(report.casesClosed)},N/A`,
    `First Reply On Time,${String(Math.round(report.firstReplyOnTimeShare * 100))}%,95%`,
    `Priority Reply On Time (under 4h),${String(Math.round(report.priorityOnTimeShare * 100))}%,95%`,
    `User Satisfaction,${String(Math.round(report.satisfactionShare * 100))}%,95%`,
    `Reopen Rate,${String(Math.round(report.reopenRate * 100))}%,N/A`,
    `Median First Reply (Hours),${String(report.medianFirstReplyHours)},N/A`,
    `90th Percentile First Reply (Hours),${String(report.p90FirstReplyHours)},N/A`,
    '',
    'Category,Cases Count,Median Reply (Hours),Resolved Count',
  ];
  for (const item of report.categoryBreakdown) {
    rows.push(
      `"${item.categoryLabel}",${String(item.casesCount)},${String(item.medianReplyHours)},${String(item.resolvedCount)}`,
    );
  }
  return rows.join('\r\n');
}
