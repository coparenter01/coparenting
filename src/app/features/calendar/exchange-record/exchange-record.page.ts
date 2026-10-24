import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CalendarService } from '@core/calendar/calendar.service';

@Component({
  selector: 'pp-exchange-record',
  imports: [FormsModule, RouterLink],
  templateUrl: './exchange-record.page.html',
  styleUrl: './exchange-record.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeRecordPage {
  private readonly calendarService = inject(CalendarService);

  readonly isAddingNote = signal<boolean>(false);
  noteText = '';

  readonly currentExchange = computed(() => {
    const exch = this.calendarService.exchanges()[0];
    if (!exch) return undefined;
    const sTime = new Date(exch.scheduledTime).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
    return {
      ...exch,
      scheduledTimeDisplay: sTime,
    };
  });

  toggleNote(): void {
    this.isAddingNote.update((v) => !v);
  }

  cancelNote(): void {
    this.isAddingNote.set(false);
    this.noteText = '';
  }

  saveNote(): void {
    const exch = this.currentExchange();
    if (exch && this.noteText.trim()) {
      this.calendarService.exchanges.update((list) =>
        list.map((e) => (e.id === exch.id ? { ...e, notes: this.noteText.trim() } : e)),
      );
      this.cancelNote();
    }
  }

  confirmExchange(): void {
    const exch = this.currentExchange();
    if (exch) {
      this.calendarService.confirmExchange(exch.id);
    }
  }

  disputeExchange(): void {
    const exch = this.currentExchange();
    if (exch) {
      this.calendarService.disputeExchange(
        exch.id,
        'Handover occurred 25 minutes after agreed time.',
      );
    }
  }
}
