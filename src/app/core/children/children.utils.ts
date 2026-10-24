import type { ChildInformationRow, CreateChildInformationParams } from './children.types';

function cleanStr(val: string | null | undefined): string | null {
  return val ? val.trim() : null;
}

export function buildChildInfoRow(
  params: CreateChildInformationParams,
  userId: string,
  nowIso: string,
): ChildInformationRow {
  return {
    id: `entry-${Math.random().toString(36).substring(2, 9)}`,
    household_id: params.householdId,
    child_id: params.childId ?? null,
    section: params.section,
    entry_type: params.entryType,
    title: params.title.trim(),
    details: cleanStr(params.details),
    contact_name: cleanStr(params.contactName),
    contact_email: cleanStr(params.contactEmail),
    contact_phone: cleanStr(params.contactPhone),
    contact_address: cleanStr(params.contactAddress),
    visibility: params.visibility ?? 'Shared',
    created_by: userId,
    created_at: nowIso,
    updated_at: nowIso,
  };
}
