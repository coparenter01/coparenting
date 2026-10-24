import type { Database } from '../supabase/database.types';
import type { DocumentCategory, ShareResourceType } from '../supabase/models.types';

export type DocumentRow = Database['public']['Tables']['documents']['Row'];
export type DocumentVersionRow = Database['public']['Tables']['document_versions']['Row'];
export type PhotoAlbumRow = Database['public']['Tables']['photo_albums']['Row'];
export type PhotoRow = Database['public']['Tables']['photos']['Row'];
export type WishItemRow = Database['public']['Tables']['wish_items']['Row'];
export type TaskListRow = Database['public']['Tables']['task_lists']['Row'];
export type TaskRow = Database['public']['Tables']['tasks']['Row'];
export type ShareLinkRow = Database['public']['Tables']['share_links']['Row'];

export interface UploadDocumentParams {
  readonly householdId: string;
  readonly childId?: string | null;
  readonly title: string;
  readonly category: DocumentCategory;
  readonly fileName: string;
  readonly fileSizeBytes: number;
  readonly mimeType: string;
  readonly isPrivate?: boolean;
}

export interface CreateWishItemParams {
  readonly householdId: string;
  readonly childId?: string | null;
  readonly title: string;
  readonly notes?: string | null;
  readonly url?: string | null;
  readonly estimatedCost?: number | null;
}

export interface CreateTaskParams {
  readonly listId: string;
  readonly householdId: string;
  readonly title: string;
  readonly dueDate?: string | null;
  readonly assignedTo?: string | null;
}

export interface CreateShareLinkParams {
  readonly householdId: string;
  readonly resourceType: ShareResourceType;
  readonly resourceId: string;
  readonly durationDays: number;
}
