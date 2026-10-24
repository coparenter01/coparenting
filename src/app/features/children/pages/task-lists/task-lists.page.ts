import { DatePipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocumentsService } from '@core/documents/documents.service';
import { HouseholdService } from '@core/household/household.service';

@Component({
  selector: 'pp-task-lists',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './task-lists.page.html',
  styleUrl: './task-lists.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListsPage implements OnInit {
  private readonly documentsService = inject(DocumentsService);
  private readonly householdService = inject(HouseholdService);

  public readonly lists = this.documentsService.taskLists;
  public readonly tasks = this.documentsService.tasks;

  public readonly showAddForm = signal<boolean>(false);
  public readonly newTitle = signal<string>('');
  public readonly selectedListId = signal<string>('');
  public readonly assignedTo = signal<string>('');
  public readonly dueDate = signal<string>('');

  public ngOnInit(): void {
    void this.initData();
  }

  public toggleAddForm(): void {
    this.showAddForm.update((val) => !val);
  }

  public updateField(field: 'title' | 'listId' | 'assignee' | 'dueDate', event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    switch (field) {
      case 'title':
        this.newTitle.set(target.value);
        break;
      case 'listId':
        this.selectedListId.set(target.value);
        break;
      case 'assignee':
        this.assignedTo.set(target.value);
        break;
      case 'dueDate':
        this.dueDate.set(target.value);
        break;
    }
  }

  public async saveTask(): Promise<void> {
    const title = this.newTitle().trim();
    if (!title) return;
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    const firstListId = this.lists()[0]?.id ?? 'list-demo-01';
    const currentListId = this.selectedListId() || firstListId;

    await this.documentsService.addTask({
      householdId: hid,
      listId: currentListId,
      title,
      assignedTo: this.assignedTo().trim() || undefined,
      dueDate: this.dueDate() || undefined,
    });

    this.newTitle.set('');
    this.assignedTo.set('');
    this.dueDate.set('');
    this.showAddForm.set(false);
  }

  public async toggleTask(taskId: string): Promise<void> {
    await this.documentsService.toggleTask(taskId);
  }

  private async initData(): Promise<void> {
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    const lists = await this.documentsService.loadTaskLists(hid);
    if (lists.length > 0 && !this.selectedListId()) {
      this.selectedListId.set(lists[0]?.id ?? '');
    }
  }
}
