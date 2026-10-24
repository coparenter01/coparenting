import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HouseholdService } from '../../../../core/household/household.service';
import type { ContactAttemptWithResult } from '../../../../core/household/household.types';

@Component({
  selector: 'pp-contact-attempt-log',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact-attempt-log.page.html',
  styleUrl: './contact-attempt-log.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactAttemptLogPage {
  private readonly householdService = inject(HouseholdService);

  public readonly contactAttempts = this.householdService.contactAttempts;
  public readonly selectedType = signal<string>('All');
  public readonly selectedChannel = signal<string>('All');

  public readonly filteredAttempts = computed(() => {
    const list = this.contactAttempts();
    const type = this.selectedType();
    const channel = this.selectedChannel();

    return list.filter((item: ContactAttemptWithResult) => {
      if (type !== 'All') {
        const itemType = item.purpose.toLowerCase().includes('invite') ? 'Invite' : 'Message';
        if (itemType !== type) return false;
      }
      if (channel !== 'All' && item.channel !== channel) {
        return false;
      }
      return true;
    });
  });

  public onTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedType.set(target.value);
  }

  public onChannelChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedChannel.set(target.value);
  }

  public getAttemptType(attempt: ContactAttemptWithResult): string {
    return attempt.purpose.toLowerCase().includes('invite') ? 'Invite' : 'Message';
  }

  public getMessagePreview(attempt: ContactAttemptWithResult): string {
    if (this.getAttemptType(attempt) === 'Invite') return '—';
    const text = attempt.contentSummary;
    return text.length > 50 ? `${text.substring(0, 48)}...` : text;
  }
}
