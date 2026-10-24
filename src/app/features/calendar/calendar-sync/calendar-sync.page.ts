import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CalendarService } from '@core/calendar/calendar.service';

@Component({
  selector: 'pp-calendar-sync',
  imports: [FormsModule, RouterLink],
  templateUrl: './calendar-sync.page.html',
  styleUrl: './calendar-sync.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSyncPage {
  private readonly calendarService = inject(CalendarService);

  readonly syncSettings = this.calendarService.syncSettings;
  readonly googleConnected = signal<boolean>(true);
  readonly copiedMessage = signal<string | null>(null);

  connectGoogle(): void {
    this.googleConnected.set(true);
  }

  disconnectGoogle(): void {
    this.googleConnected.set(false);
  }

  connectOutlook(): void {
    this.copiedMessage.set('Outlook calendar simulator connection initiated successfully.');
  }

  copySubscriptionLink(): void {
    const url = this.syncSettings().icsFeedUrl;
    if (typeof navigator !== 'undefined') {
      void navigator.clipboard.writeText(url);
    }
    this.copiedMessage.set('Subscription link copied to clipboard!');
  }

  regenerateLink(): void {
    this.calendarService.regenerateIcsToken();
    this.copiedMessage.set('Private link regenerated. Old link no longer works.');
  }

  updateSendMode(mode: 'both' | 'own_only'): void {
    this.calendarService.syncSettings.update((s) => ({
      ...s,
      sendMode: mode,
    }));
  }
}
