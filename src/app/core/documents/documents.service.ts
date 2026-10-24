import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { injectSupabaseClient } from '../supabase/supabase-client';
import { TimeService } from '../time/time.service';
import type {
  CreateShareLinkParams,
  CreateTaskParams,
  CreateWishItemParams,
  DocumentRow,
  PhotoAlbumRow,
  PhotoRow,
  ShareLinkRow,
  TaskListRow,
  TaskRow,
  UploadDocumentParams,
  WishItemRow,
} from './documents.types';
import {
  buildFallbackAlbums,
  buildFallbackDocuments,
  buildFallbackTaskLists,
  buildFallbackWishItems,
  validateDocumentFile,
} from './documents.utils';

export {
  MAX_DOCUMENT_FILE_SIZE,
  MAX_STORAGE_LIMIT_BYTES,
  ALLOWED_MIME_TYPES,
} from './documents.utils';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private readonly supabase = injectSupabaseClient();
  private readonly authService = inject(AuthService);
  private readonly timeService = inject(TimeService);

  private readonly _documents = signal<readonly DocumentRow[]>([]);
  private readonly _photoAlbums = signal<readonly PhotoAlbumRow[]>([]);
  private readonly _photos = signal<readonly PhotoRow[]>([]);
  private readonly _wishItems = signal<readonly WishItemRow[]>([]);
  private readonly _taskLists = signal<readonly TaskListRow[]>([]);
  private readonly _tasks = signal<readonly TaskRow[]>([]);
  private readonly _shareLinks = signal<readonly ShareLinkRow[]>([]);

  public readonly documents = computed(() =>
    this._documents().filter((d) => d.deleted_at === null),
  );
  public readonly recentlyDeleted = computed(() =>
    this._documents().filter((d) => d.deleted_at !== null),
  );
  public readonly totalStorageUsed = computed(() =>
    this._documents().reduce((acc, d) => acc + (d.deleted_at ? 0 : d.file_size_bytes), 0),
  );
  public readonly photoAlbums = this._photoAlbums.asReadonly();
  public readonly photos = this._photos.asReadonly();
  public readonly wishItems = this._wishItems.asReadonly();
  public readonly taskLists = this._taskLists.asReadonly();
  public readonly tasks = this._tasks.asReadonly();
  public readonly shareLinks = this._shareLinks.asReadonly();

  public validateFile(file: { size: number; type: string; name: string }): {
    readonly valid: boolean;
    readonly error?: string;
  } {
    return validateDocumentFile(file);
  }

  public async loadDocuments(householdId: string): Promise<readonly DocumentRow[]> {
    try {
      const { data } = await this.supabase
        .from('documents')
        .select()
        .eq('household_id', householdId)
        .order('created_at', { ascending: false });
      if (data) {
        this._documents.set(data);
        return data;
      }
    } catch {
      // Local fallback
    }
    if (this._documents().length === 0) {
      this._documents.set(buildFallbackDocuments(householdId, this.timeService.nowUtc()));
    }
    return this._documents();
  }

  public async uploadDocument(
    params: UploadDocumentParams,
  ): Promise<{ document?: DocumentRow; error?: string }> {
    const check = this.validateFile({
      size: params.fileSizeBytes,
      type: params.mimeType,
      name: params.fileName,
    });
    if (!check.valid) {
      return { error: check.error };
    }

    const userId = this.authService.user()?.id ?? 'demo-user';
    const nowIso = this.timeService.nowUtc();
    const newDoc: DocumentRow = {
      id: `doc-${Math.random().toString(36).substring(2, 9)}`,
      household_id: params.householdId,
      child_id: params.childId ?? null,
      title: params.title.trim(),
      category: params.category,
      file_name: params.fileName,
      file_path: `documents/${params.householdId}/${params.fileName}`,
      file_size_bytes: params.fileSizeBytes,
      mime_type: params.mimeType,
      is_private: params.isPrivate ?? false,
      version: 1,
      uploaded_by: userId,
      deleted_at: null,
      created_at: nowIso,
      updated_at: nowIso,
    };

    try {
      await this.supabase.from('documents').insert(newDoc);
    } catch {
      // Local fallback
    }

    this._documents.update((prev) => [newDoc, ...prev]);
    return { document: newDoc };
  }

  public async deleteDocument(docId: string): Promise<boolean> {
    const nowIso = this.timeService.nowUtc();
    try {
      await this.supabase.from('documents').update({ deleted_at: nowIso }).eq('id', docId);
    } catch {
      // Local fallback
    }
    this._documents.update((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, deleted_at: nowIso } : d)),
    );
    return true;
  }

  public async restoreDocument(docId: string): Promise<boolean> {
    const nowIso = this.timeService.nowUtc();
    try {
      await this.supabase
        .from('documents')
        .update({ deleted_at: null, updated_at: nowIso })
        .eq('id', docId);
    } catch {
      // Local fallback
    }
    this._documents.update((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, deleted_at: null, updated_at: nowIso } : d)),
    );
    return true;
  }

  public async loadPhotoAlbums(householdId: string): Promise<readonly PhotoAlbumRow[]> {
    try {
      const { data } = await this.supabase
        .from('photo_albums')
        .select()
        .eq('household_id', householdId)
        .order('created_at', { ascending: false });
      if (data) {
        this._photoAlbums.set(data);
        return data;
      }
    } catch {
      // Local fallback
    }
    if (this._photoAlbums().length === 0) {
      this._photoAlbums.set(buildFallbackAlbums(householdId, this.timeService.nowUtc()));
    }
    return this._photoAlbums();
  }

  public async createPhotoAlbum(
    householdId: string,
    title: string,
    description?: string,
  ): Promise<PhotoAlbumRow> {
    const userId = this.authService.user()?.id ?? 'demo-user';
    const nowIso = this.timeService.nowUtc();
    const newAlbum: PhotoAlbumRow = {
      id: `album-${Math.random().toString(36).substring(2, 9)}`,
      household_id: householdId,
      title: title.trim(),
      description: description?.trim() ?? null,
      cover_photo_url: null,
      created_by: userId,
      created_at: nowIso,
    };
    try {
      await this.supabase.from('photo_albums').insert(newAlbum);
    } catch {
      // Local fallback
    }
    this._photoAlbums.update((prev) => [newAlbum, ...prev]);
    return newAlbum;
  }

  public async loadWishItems(householdId: string): Promise<readonly WishItemRow[]> {
    try {
      const { data } = await this.supabase
        .from('wish_items')
        .select()
        .eq('household_id', householdId)
        .order('created_at', { ascending: false });
      if (data) {
        this._wishItems.set(data);
        return data;
      }
    } catch {
      // Local fallback
    }
    if (this._wishItems().length === 0) {
      this._wishItems.set(buildFallbackWishItems(householdId, this.timeService.nowUtc()));
    }
    return this._wishItems();
  }

  public async addWishItem(params: CreateWishItemParams): Promise<WishItemRow> {
    const userId = this.authService.user()?.id ?? 'demo-user';
    const nowIso = this.timeService.nowUtc();
    const newItem: WishItemRow = {
      id: `wish-${Math.random().toString(36).substring(2, 9)}`,
      household_id: params.householdId,
      child_id: params.childId ?? null,
      title: params.title.trim(),
      notes: params.notes?.trim() ?? null,
      url: params.url?.trim() ?? null,
      estimated_cost: params.estimatedCost ?? null,
      reserved_by: null,
      status: 'Active',
      created_by: userId,
      created_at: nowIso,
    };
    try {
      await this.supabase.from('wish_items').insert(newItem);
    } catch {
      // Local fallback
    }
    this._wishItems.update((prev) => [newItem, ...prev]);
    return newItem;
  }

  public async toggleWishReserved(itemId: string): Promise<boolean> {
    const userId = this.authService.user()?.id ?? 'demo-user';
    const current = this._wishItems().find((w) => w.id === itemId);
    const newReserved = current?.reserved_by ? null : userId;
    try {
      await this.supabase.from('wish_items').update({ reserved_by: newReserved }).eq('id', itemId);
    } catch {
      // Local fallback
    }
    this._wishItems.update((prev) =>
      prev.map((w) => (w.id === itemId ? { ...w, reserved_by: newReserved } : w)),
    );
    return true;
  }

  public async loadTaskLists(householdId: string): Promise<readonly TaskListRow[]> {
    try {
      const { data } = await this.supabase
        .from('task_lists')
        .select()
        .eq('household_id', householdId)
        .order('created_at', { ascending: false });
      if (data) {
        this._taskLists.set(data);
        await this.loadTasks(householdId);
        return data;
      }
    } catch {
      // Local fallback
    }
    if (this._taskLists().length === 0) {
      const fallback = buildFallbackTaskLists(householdId, this.timeService.nowUtc());
      this._taskLists.set(fallback.lists);
      this._tasks.set(fallback.tasks);
    }
    return this._taskLists();
  }

  public async loadTasks(householdId: string): Promise<readonly TaskRow[]> {
    try {
      const { data } = await this.supabase
        .from('tasks')
        .select()
        .eq('household_id', householdId)
        .order('created_at', { ascending: true });
      if (data) {
        this._tasks.set(data);
        return data;
      }
    } catch {
      // Local fallback
    }
    return this._tasks();
  }

  public async addTask(params: CreateTaskParams): Promise<TaskRow> {
    const nowIso = this.timeService.nowUtc();
    const newTask: TaskRow = {
      id: `task-${Math.random().toString(36).substring(2, 9)}`,
      list_id: params.listId,
      household_id: params.householdId,
      title: params.title.trim(),
      is_completed: false,
      completed_at: null,
      completed_by: null,
      assigned_to: params.assignedTo ?? null,
      due_date: params.dueDate ?? null,
      created_at: nowIso,
    };
    try {
      await this.supabase.from('tasks').insert(newTask);
    } catch {
      // Local fallback
    }
    this._tasks.update((prev) => [...prev, newTask]);
    return newTask;
  }

  public async toggleTask(taskId: string): Promise<boolean> {
    const userId = this.authService.user()?.id ?? 'demo-user';
    const nowIso = this.timeService.nowUtc();
    const task = this._tasks().find((t) => t.id === taskId);
    const nextCompleted = !task?.is_completed;
    try {
      await this.supabase
        .from('tasks')
        .update({
          is_completed: nextCompleted,
          completed_at: nextCompleted ? nowIso : null,
          completed_by: nextCompleted ? userId : null,
        })
        .eq('id', taskId);
    } catch {
      // Local fallback
    }
    this._tasks.update((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              is_completed: nextCompleted,
              completed_at: nextCompleted ? nowIso : null,
              completed_by: nextCompleted ? userId : null,
            }
          : t,
      ),
    );
    return true;
  }

  public async createShareLink(params: CreateShareLinkParams): Promise<ShareLinkRow> {
    const userId = this.authService.user()?.id ?? 'demo-user';
    const nowIso = this.timeService.nowUtc();
    const expiresDate = new Date(Date.now() + params.durationDays * 24 * 60 * 60 * 1000);
    const token = `share-${Math.random().toString(36).substring(2, 14)}`;
    const newLink: ShareLinkRow = {
      id: `sh-${Math.random().toString(36).substring(2, 9)}`,
      household_id: params.householdId,
      token,
      resource_type: params.resourceType,
      resource_id: params.resourceId,
      expires_at: expiresDate.toISOString(),
      revoked_at: null,
      access_count: 0,
      created_by: userId,
      created_at: nowIso,
    };
    try {
      await this.supabase.from('share_links').insert(newLink);
    } catch {
      // Local fallback
    }
    this._shareLinks.update((prev) => [newLink, ...prev]);
    return newLink;
  }

  public async revokeShareLink(linkId: string): Promise<boolean> {
    const nowIso = this.timeService.nowUtc();
    try {
      await this.supabase.from('share_links').update({ revoked_at: nowIso }).eq('id', linkId);
    } catch {
      // Local fallback
    }
    this._shareLinks.update((prev) =>
      prev.map((l) => (l.id === linkId ? { ...l, revoked_at: nowIso } : l)),
    );
    return true;
  }
}
