import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';

@Component({
  selector: 'pp-agency-invite',
  imports: [RouterLink],
  templateUrl: './agency-invite.page.html',
  styleUrls: ['./agency-invite.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyInvitePage {
  private readonly cssService = inject(ChildSupportService);

  readonly docketNotice = signal<string>('DR-2024-8831');
  readonly contact = signal<string>('');
  readonly isSending = signal<boolean>(false);
  readonly inviteSent = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  onDocketChange(event: Event): void {
    this.docketNotice.set((event.target as HTMLInputElement).value);
  }

  onContactChange(event: Event): void {
    this.contact.set((event.target as HTMLInputElement).value);
  }

  async onSendInvite(): Promise<void> {
    if (!this.contact() || !this.docketNotice()) {
      this.errorMessage.set('Please provide both the docket/notice number and co-parent contact.');
      return;
    }

    this.isSending.set(true);
    this.errorMessage.set(null);
    try {
      await this.cssService.sendAgencyInvite(this.contact(), this.docketNotice());
      this.inviteSent.set(true);
    } catch {
      this.errorMessage.set('Failed to deliver agency notice invite.');
    } finally {
      this.isSending.set(false);
    }
  }
}
