import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HouseholdService } from '../../../../core/household/household.service';

interface ExchangeMessage {
  readonly id: string;
  readonly direction: 'outgoing' | 'incoming';
  readonly text: string;
  readonly channel: 'Text' | 'Email';
  readonly timestamp: string;
  readonly status: 'Delivered' | 'Failed' | 'Sent';
}

@Component({
  selector: 'pp-contact-nonapp',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact-nonapp.page.html',
  styleUrl: './contact-nonapp.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactNonAppPage {
  private readonly householdService = inject(HouseholdService);

  public readonly isSending = signal<boolean>(false);
  public readonly sendSuccess = signal<boolean>(false);
  public readonly sendError = signal<string>('');

  public readonly messages = signal<ExchangeMessage[]>([
    {
      id: 'ex-1',
      direction: 'outgoing',
      text: 'Hi, confirming pickup for Saturday at 10 AM at the community center.',
      channel: 'Text',
      timestamp: 'Today, 9:15 AM',
      status: 'Delivered',
    },
    {
      id: 'ex-2',
      direction: 'incoming',
      text: 'Sounds good. I will have their sports bags ready.',
      channel: 'Text',
      timestamp: 'Today, 9:22 AM',
      status: 'Delivered',
    },
    {
      id: 'ex-3',
      direction: 'outgoing',
      text: 'Sent the doctor report PDF to your email.',
      channel: 'Email',
      timestamp: 'Yesterday, 4:30 PM',
      status: 'Failed',
    },
  ]);

  public readonly messageForm = new FormGroup({
    channel: new FormControl<'Text' | 'Email'>('Text', { nonNullable: true }),
    mobileNumber: new FormControl<string>('+1 (555) 234-5678', { nonNullable: true }),
    email: new FormControl<string>('', {
      validators: [Validators.email],
      nonNullable: true,
    }),
    message: new FormControl<string>('', {
      validators: [Validators.required, Validators.maxLength(1000)],
      nonNullable: true,
    }),
  });

  public readonly selectedChannel = signal<'Text' | 'Email'>('Text');

  public setChannel(channel: 'Text' | 'Email'): void {
    this.selectedChannel.set(channel);
    this.messageForm.controls.channel.setValue(channel);
    this.sendError.set('');
  }

  public async onSend(): Promise<void> {
    const channel = this.messageForm.controls.channel.value;
    const recipient =
      channel === 'Text'
        ? this.messageForm.controls.mobileNumber.value.trim()
        : this.messageForm.controls.email.value.trim();
    const text = this.messageForm.controls.message.value.trim();

    if (!recipient) {
      this.sendError.set(
        `Please enter recipient ${channel === 'Text' ? 'phone number' : 'email'}.`,
      );
      return;
    }
    if (!text) {
      this.sendError.set('Please write a message before sending.');
      return;
    }

    this.isSending.set(true);
    this.sendError.set('');
    this.sendSuccess.set(false);

    try {
      const success = await this.householdService.sendMessageOutsideApp({
        channel,
        recipient,
        message: text,
      });

      if (success) {
        this.appendSentMessage(text, channel);
      } else {
        this.sendError.set(
          'We could not deliver your message. The attempt is saved in your contact log.',
        );
      }
    } catch {
      this.sendError.set('Failed to send message. The attempt is logged in your contact records.');
    } finally {
      this.isSending.set(false);
    }
  }

  private appendSentMessage(text: string, channel: 'Text' | 'Email'): void {
    this.messages.update((prev) => [
      ...prev,
      {
        id: 'ex-' + Date.now().toString(),
        direction: 'outgoing',
        text,
        channel,
        timestamp: 'Just now',
        status: 'Delivered',
      },
    ]);
    this.messageForm.controls.message.setValue('');
    this.sendSuccess.set(true);
  }
}
