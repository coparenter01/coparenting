import type { DocumentCategory, ShareResourceType, WishItemStatus } from './models.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Phase3DocumentsTables = {
  documents: {
    Row: {
      id: string;
      household_id: string;
      child_id: string | null;
      title: string;
      category: DocumentCategory;
      file_name: string;
      file_path: string;
      file_size_bytes: number;
      mime_type: string;
      is_private: boolean;
      version: number;
      uploaded_by: string | null;
      deleted_at: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      household_id: string;
      child_id?: string | null;
      title: string;
      category: DocumentCategory;
      file_name: string;
      file_path: string;
      file_size_bytes: number;
      mime_type: string;
      is_private?: boolean;
      version?: number;
      uploaded_by?: string | null;
      deleted_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      child_id?: string | null;
      title?: string;
      category?: DocumentCategory;
      file_name?: string;
      file_path?: string;
      file_size_bytes?: number;
      mime_type?: string;
      is_private?: boolean;
      version?: number;
      uploaded_by?: string | null;
      deleted_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Relationships: [];
  };
  document_versions: {
    Row: {
      id: string;
      document_id: string;
      version_number: number;
      file_name: string;
      file_path: string;
      file_size_bytes: number;
      mime_type: string;
      uploaded_by: string | null;
      change_notes: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      document_id: string;
      version_number: number;
      file_name: string;
      file_path: string;
      file_size_bytes: number;
      mime_type: string;
      uploaded_by?: string | null;
      change_notes?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      document_id?: string;
      version_number?: number;
      file_name?: string;
      file_path?: string;
      file_size_bytes?: number;
      mime_type?: string;
      uploaded_by?: string | null;
      change_notes?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
  photo_albums: {
    Row: {
      id: string;
      household_id: string;
      title: string;
      description: string | null;
      cover_photo_url: string | null;
      created_by: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      household_id: string;
      title: string;
      description?: string | null;
      cover_photo_url?: string | null;
      created_by?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      title?: string;
      description?: string | null;
      cover_photo_url?: string | null;
      created_by?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
  photos: {
    Row: {
      id: string;
      album_id: string;
      caption: string | null;
      file_path: string;
      file_size_bytes: number;
      taken_at: string | null;
      uploaded_by: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      album_id: string;
      caption?: string | null;
      file_path: string;
      file_size_bytes: number;
      taken_at?: string | null;
      uploaded_by?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      album_id?: string;
      caption?: string | null;
      file_path?: string;
      file_size_bytes?: number;
      taken_at?: string | null;
      uploaded_by?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
  wish_items: {
    Row: {
      id: string;
      household_id: string;
      child_id: string | null;
      title: string;
      notes: string | null;
      url: string | null;
      estimated_cost: number | null;
      reserved_by: string | null;
      status: WishItemStatus;
      created_by: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      household_id: string;
      child_id?: string | null;
      title: string;
      notes?: string | null;
      url?: string | null;
      estimated_cost?: number | null;
      reserved_by?: string | null;
      status?: WishItemStatus;
      created_by?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      child_id?: string | null;
      title?: string;
      notes?: string | null;
      url?: string | null;
      estimated_cost?: number | null;
      reserved_by?: string | null;
      status?: WishItemStatus;
      created_by?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
  task_lists: {
    Row: {
      id: string;
      household_id: string;
      title: string;
      created_by: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      household_id: string;
      title: string;
      created_by?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      title?: string;
      created_by?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
  tasks: {
    Row: {
      id: string;
      list_id: string;
      household_id: string;
      title: string;
      is_completed: boolean;
      completed_at: string | null;
      completed_by: string | null;
      assigned_to: string | null;
      due_date: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      list_id: string;
      household_id: string;
      title: string;
      is_completed?: boolean;
      completed_at?: string | null;
      completed_by?: string | null;
      assigned_to?: string | null;
      due_date?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      list_id?: string;
      household_id?: string;
      title?: string;
      is_completed?: boolean;
      completed_at?: string | null;
      completed_by?: string | null;
      assigned_to?: string | null;
      due_date?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
  share_links: {
    Row: {
      id: string;
      household_id: string;
      token: string;
      resource_type: ShareResourceType;
      resource_id: string;
      expires_at: string;
      revoked_at: string | null;
      access_count: number;
      created_by: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      household_id: string;
      token: string;
      resource_type: ShareResourceType;
      resource_id: string;
      expires_at: string;
      revoked_at?: string | null;
      access_count?: number;
      created_by?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      token?: string;
      resource_type?: ShareResourceType;
      resource_id?: string;
      expires_at?: string;
      revoked_at?: string | null;
      access_count?: number;
      created_by?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
};
