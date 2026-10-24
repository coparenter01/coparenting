import {
  PRO_ERR_02,
  PRO_ERR_08,
  PRO_ERR_09,
  PRO_ERR_10,
  proErr03,
  type InviteProfessionalDto,
  type ProfessionalAccess,
  type ProfessionalScope,
} from './professionals.types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

function validateRequiredFields(dto: InviteProfessionalDto): string | null {
  if (dto.name.trim().length === 0) {
    return proErr03('name');
  }
  if (dto.email.trim().length === 0) {
    return proErr03('email');
  }
  if (!isValidEmail(dto.email)) {
    return PRO_ERR_02;
  }
  if (!dto.accessEndsAt) {
    return proErr03('access end date');
  }
  return null;
}

function validateLengthsAndDates(dto: InviteProfessionalDto): string | null {
  const isNameLong = dto.name.length > 100;
  const isOrgLong = (dto.organization?.length ?? 0) > 100;
  const isNoteLong = (dto.note?.length ?? 0) > 500;
  if (isNameLong || isOrgLong || isNoteLong) {
    return PRO_ERR_08;
  }

  const todayStr = new Date().toISOString().slice(0, 10);
  if (dto.accessEndsAt < todayStr) {
    return PRO_ERR_09;
  }

  const { dateRangeStart, dateRangeEnd } = dto.scope;
  if (dateRangeStart && dateRangeEnd && dateRangeStart > dateRangeEnd) {
    return PRO_ERR_10;
  }

  return null;
}

export function validateInviteDto(dto: InviteProfessionalDto): string | null {
  const requiredErr = validateRequiredFields(dto);
  if (requiredErr) {
    return requiredErr;
  }
  return validateLengthsAndDates(dto);
}

export function formatScopeSummary(scope: ProfessionalScope): string {
  const parts: string[] = [];
  if (scope.messages) parts.push('Messages');
  if (scope.calendar) parts.push('Calendar');
  if (scope.expenses) parts.push('Expenses');
  if (scope.childInfo) parts.push('Child info');
  if (scope.documents) parts.push('Documents');
  if (scope.contactAttempts) parts.push('Contact attempts');
  return parts.length > 0 ? parts.join(', ') : 'No categories selected';
}

export function isAccessActive(access: ProfessionalAccess): boolean {
  if (access.status !== 'Active') return false;
  const now = new Date();
  const ends = new Date(access.accessEndsAt);
  return ends.getTime() >= now.getTime();
}

export function generateToken(): string {
  return 'inv_' + Math.random().toString(36).substring(2, 10);
}
