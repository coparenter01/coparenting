import type {
  DocumentRow,
  PhotoAlbumRow,
  TaskListRow,
  TaskRow,
  WishItemRow,
} from './documents.types';

export const MAX_DOCUMENT_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
export const MAX_STORAGE_LIMIT_BYTES = 100 * 1024 * 1024; // 100 MB free quota
export const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

export function validateDocumentFile(file: { size: number; type: string; name: string }): {
  readonly valid: boolean;
  readonly error?: string;
} {
  if (file.size > MAX_DOCUMENT_FILE_SIZE) {
    return { valid: false, error: 'File exceeds 15 MB limit. Please choose a smaller file.' };
  }
  const lowerName = file.name.toLowerCase();
  if (
    lowerName.endsWith('.exe') ||
    lowerName.endsWith('.bat') ||
    lowerName.endsWith('.sh') ||
    lowerName.endsWith('.cmd')
  ) {
    return { valid: false, error: 'Executable files (.exe, .bat, .cmd, .sh) are prohibited.' };
  }
  if (file.type && !ALLOWED_MIME_TYPES.has(file.type)) {
    return {
      valid: false,
      error: 'Unsupported file format. Please upload PDF, PNG, JPG, WEBP, DOCX, XLSX, or TXT.',
    };
  }
  return { valid: true };
}

interface FallbackDocSpec {
  readonly id: string;
  readonly childId: string;
  readonly title: string;
  readonly category: DocumentRow['category'];
  readonly fileName: string;
  readonly size: number;
  readonly mime: string;
}

const FALLBACK_DOC_SPECS: readonly FallbackDocSpec[] = [
  {
    id: 'doc-demo-01',
    childId: 'child-demo-01',
    title: 'Maya 2026 Immunization Record',
    category: 'Medical',
    fileName: 'maya_immunization_2026.pdf',
    size: 245000,
    mime: 'application/pdf',
  },
  {
    id: 'doc-demo-02',
    childId: 'child-demo-01',
    title: 'Oakridge Elementary Report Card Q1',
    category: 'School',
    fileName: 'report_card_q1.pdf',
    size: 512000,
    mime: 'application/pdf',
  },
  {
    id: 'doc-demo-03',
    childId: 'child-demo-02',
    title: 'Swim Class Registration Receipt',
    category: 'Activities',
    fileName: 'swim_reg_leo.png',
    size: 180000,
    mime: 'image/png',
  },
];

export function buildFallbackDocuments(
  householdId: string,
  nowIso: string,
): readonly DocumentRow[] {
  return FALLBACK_DOC_SPECS.map((s) => ({
    id: s.id,
    household_id: householdId,
    child_id: s.childId,
    title: s.title,
    category: s.category,
    file_name: s.fileName,
    file_path: `documents/demo/${s.fileName}`,
    file_size_bytes: s.size,
    mime_type: s.mime,
    is_private: false,
    version: 1,
    uploaded_by: 'demo-user',
    deleted_at: null,
    created_at: nowIso,
    updated_at: nowIso,
  }));
}

export function buildFallbackAlbums(householdId: string, nowIso: string): readonly PhotoAlbumRow[] {
  return [
    {
      id: 'album-demo-01',
      household_id: householdId,
      title: 'Summer 2026 Trip',
      description: 'Camping at Redwood National Park',
      cover_photo_url: null,
      created_by: 'demo-user',
      created_at: nowIso,
    },
    {
      id: 'album-demo-02',
      household_id: householdId,
      title: 'Soccer Season 2026',
      description: 'Oakridge Tigers Saturday games',
      cover_photo_url: null,
      created_by: 'demo-user',
      created_at: nowIso,
    },
  ];
}

export function buildFallbackWishItems(
  householdId: string,
  nowIso: string,
): readonly WishItemRow[] {
  return [
    {
      id: 'wish-demo-01',
      household_id: householdId,
      child_id: 'child-demo-01',
      title: 'Microscope Starter Kit',
      notes: 'National Geographic kit for 4th grade science fair',
      url: 'https://example.com/item/microscope',
      estimated_cost: 49.99,
      reserved_by: null,
      status: 'Active',
      created_by: 'demo-user',
      created_at: nowIso,
    },
    {
      id: 'wish-demo-02',
      household_id: householdId,
      child_id: 'child-demo-02',
      title: 'Size 11 Kids Soccer Cleats',
      notes: 'Blue or black preferred',
      url: 'https://example.com/item/cleats',
      estimated_cost: 35.0,
      reserved_by: 'demo-user',
      status: 'Active',
      created_by: 'demo-user',
      created_at: nowIso,
    },
  ];
}

export function buildFallbackTaskLists(
  householdId: string,
  nowIso: string,
): {
  readonly lists: readonly TaskListRow[];
  readonly tasks: readonly TaskRow[];
} {
  const lists: readonly TaskListRow[] = [
    {
      id: 'list-demo-01',
      household_id: householdId,
      title: 'School Preparation 2026',
      created_by: 'demo-user',
      created_at: nowIso,
    },
  ];
  const tasks: readonly TaskRow[] = [
    {
      id: 'task-demo-01',
      list_id: 'list-demo-01',
      household_id: householdId,
      title: 'Purchase backpack and notebook supplies',
      is_completed: true,
      completed_at: nowIso,
      completed_by: 'demo-user',
      assigned_to: 'demo-user',
      due_date: '2026-08-25',
      created_at: nowIso,
    },
    {
      id: 'task-demo-02',
      list_id: 'list-demo-01',
      household_id: householdId,
      title: 'Schedule annual pediatric physical checkup',
      is_completed: false,
      completed_at: null,
      completed_by: null,
      assigned_to: null,
      due_date: '2026-09-01',
      created_at: nowIso,
    },
  ];
  return { lists, tasks };
}
