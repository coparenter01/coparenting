import { computed, Injectable, signal } from '@angular/core';
import { injectSupabaseClient } from '../supabase/supabase-client';
import { analyzeToneLocally } from './messaging.utils';
import type {
  ComposeMessagePayload,
  MediationRequestRow,
  MessageAttachmentRow,
  MessageDraftRow,
  MessageFolderRow,
  MessageReportRow,
  MessageRow,
  MessageThreadRow,
  ThreadParticipantRow,
  ToneFeedback,
} from './messaging.types';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private readonly supabase = injectSupabaseClient();

  private readonly _threads = signal<MessageThreadRow[]>([]);
  private readonly _activeMessages = signal<MessageRow[]>([]);
  private readonly _attachments = signal<MessageAttachmentRow[]>([]);
  private readonly _drafts = signal<MessageDraftRow[]>([]);
  private readonly _folders = signal<MessageFolderRow[]>([]);
  private readonly _reports = signal<MessageReportRow[]>([]);
  private readonly _mediationRequests = signal<MediationRequestRow[]>([]);
  private readonly _participants = signal<ThreadParticipantRow[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  public readonly threads = this._threads.asReadonly();
  public readonly activeMessages = this._activeMessages.asReadonly();
  public readonly attachments = this._attachments.asReadonly();
  public readonly drafts = this._drafts.asReadonly();
  public readonly folders = this._folders.asReadonly();
  public readonly reports = this._reports.asReadonly();
  public readonly mediationRequests = this._mediationRequests.asReadonly();
  public readonly participants = this._participants.asReadonly();
  public readonly isLoading = this._isLoading.asReadonly();
  public readonly error = this._error.asReadonly();

  public readonly unreadThreadCount = computed(() => {
    return this._activeMessages().filter((m) => m.status !== 'Read').length;
  });

  public async loadThreads(householdId: string): Promise<void> {
    this._isLoading.set(true);
    this._error.set(null);
    try {
      const { data, error } = await this.supabase
        .from('message_threads')
        .select('*')
        .eq('household_id', householdId)
        .order('updated_at', { ascending: false });

      if (error) {
        this._error.set(error.message);
      } else {
        this._threads.set(data);
      }
    } catch (err) {
      this._error.set(err instanceof Error ? err.message : 'Failed to load threads');
    } finally {
      this._isLoading.set(false);
    }
  }

  public async loadMessages(threadId: string): Promise<void> {
    this._isLoading.set(true);
    this._error.set(null);
    try {
      const { data, error } = await this.supabase
        .from('messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('sent_at', { ascending: true });

      if (error) {
        this._error.set(error.message);
      } else {
        this._activeMessages.set(data);
      }
    } catch (err) {
      this._error.set(err instanceof Error ? err.message : 'Failed to load messages');
    } finally {
      this._isLoading.set(false);
    }
  }

  public async loadParticipants(threadId: string): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('thread_participants')
        .select('*')
        .eq('thread_id', threadId);

      if (!error) {
        this._participants.set(data);
      }
    } catch {
      // ignore
    }
  }

  public async loadAttachments(): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('message_attachments')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        this._attachments.set(data);
      }
    } catch {
      // ignore
    }
  }

  public async loadDrafts(userId: string): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('message_drafts')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (!error) {
        this._drafts.set(data);
      }
    } catch {
      // ignore
    }
  }

  public async loadFolders(userId: string): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('message_folders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (!error) {
        this._folders.set(data);
      }
    } catch {
      // ignore
    }
  }

  public async loadMediationRequests(householdId: string): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('mediation_requests')
        .select('*')
        .eq('household_id', householdId)
        .order('created_at', { ascending: false });

      if (!error) {
        this._mediationRequests.set(data);
      }
    } catch {
      // ignore
    }
  }

  private async createThread(
    householdId: string,
    senderId: string,
    subject?: string,
    category?: MessageThreadRow['category'],
  ): Promise<string> {
    const { data: newThread, error: threadErr } = await this.supabase
      .from('message_threads')
      .insert({
        household_id: householdId,
        subject: subject ?? 'General Discussion',
        category: category ?? 'General',
        created_by: senderId,
      })
      .select()
      .single();

    if (threadErr) {
      throw new Error(threadErr.message);
    }

    await this.supabase.from('thread_participants').insert({
      thread_id: newThread.id,
      user_id: senderId,
      role: 'Owner',
    });

    return newThread.id;
  }

  private async saveMessageAttachments(
    messageId: string,
    attachments: { fileName: string; fileSize: number; fileType: string; storagePath: string }[],
  ): Promise<void> {
    for (const att of attachments) {
      await this.supabase.from('message_attachments').insert({
        message_id: messageId,
        file_name: att.fileName,
        file_size: att.fileSize,
        file_type: att.fileType,
        storage_path: att.storagePath,
      });
    }
  }

  public async sendMessage(
    payload: ComposeMessagePayload,
    senderId: string,
  ): Promise<{ success: boolean; threadId: string; messageId?: string; error?: string }> {
    this._isLoading.set(true);
    try {
      const targetThreadId =
        payload.threadId ??
        (await this.createThread(payload.householdId, senderId, payload.subject, payload.category));

      const tone = analyzeToneLocally(payload.body);
      const isHeld = tone.score === 'hostile';

      const { data: newMsg, error: msgErr } = await this.supabase
        .from('messages')
        .insert({
          thread_id: targetThreadId,
          sender_id: senderId,
          body: payload.body,
          is_urgent: payload.isUrgent ?? false,
          status: isHeld ? 'Held' : 'Sent',
          held_by_shield: isHeld,
          held_reason: isHeld ? 'Hostile language held by shield' : null,
        })
        .select()
        .single();

      if (msgErr) {
        return { success: false, threadId: targetThreadId, error: msgErr.message };
      }

      if (payload.attachments && payload.attachments.length > 0) {
        await this.saveMessageAttachments(newMsg.id, payload.attachments);
      }

      await this.loadMessages(targetThreadId);
      await this.loadThreads(payload.householdId);
      return { success: true, threadId: targetThreadId, messageId: newMsg.id };
    } catch (err) {
      return {
        success: false,
        threadId: '',
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    } finally {
      this._isLoading.set(false);
    }
  }

  public async saveDraft(
    userId: string,
    body: string,
    subject?: string,
    threadId?: string,
  ): Promise<boolean> {
    try {
      const { error } = await this.supabase.from('message_drafts').insert({
        user_id: userId,
        body,
        subject: subject ?? null,
        thread_id: threadId ?? null,
      });
      if (!error) {
        await this.loadDrafts(userId);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public async deleteDraft(draftId: string, userId: string): Promise<boolean> {
    try {
      const { error } = await this.supabase.from('message_drafts').delete().eq('id', draftId);
      if (!error) {
        await this.loadDrafts(userId);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public async unhideHeldMessage(messageId: string, threadId: string): Promise<void> {
    try {
      await this.supabase
        .from('messages')
        .update({
          shield_unhidden_at: new Date().toISOString(),
          status: 'Read',
        })
        .eq('id', messageId);

      await this.loadMessages(threadId);
    } catch {
      // ignore
    }
  }

  public async reportMessage(
    messageId: string,
    reporterId: string,
    reason: MessageReportRow['reason'],
    details?: string,
  ): Promise<boolean> {
    try {
      const { error } = await this.supabase.from('message_reports').insert({
        message_id: messageId,
        reporter_id: reporterId,
        reason,
        details: details ?? null,
      });
      return !error;
    } catch {
      return false;
    }
  }

  public async createFolder(userId: string, householdId: string, name: string): Promise<boolean> {
    try {
      const { error } = await this.supabase.from('message_folders').insert({
        user_id: userId,
        household_id: householdId,
        name,
      });
      if (!error) {
        await this.loadFolders(userId);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public async requestMediation(
    householdId: string,
    requesterId: string,
    topic: string,
    issueSummary: string,
  ): Promise<boolean> {
    try {
      const { error } = await this.supabase.from('mediation_requests').insert({
        household_id: householdId,
        requester_id: requesterId,
        topic,
        issue_summary: issueSummary,
      });
      if (!error) {
        await this.loadMediationRequests(householdId);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public checkDraftTone(text: string): ToneFeedback {
    return analyzeToneLocally(text);
  }
}
