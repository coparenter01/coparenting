import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HouseholdService } from '../../../../core/household/household.service';
import type { InviteChannel } from '../../../../core/supabase/models.types';

@Component({
  selector: 'pp-invite-coparent',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './invite-coparent.page.html',
  styleUrl: './invite-coparent.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteCoParentPage {
  private readonly householdService = inject(HouseholdService);
  private readonly router = inject(Router);

  public readonly activeInvite = this.householdService.activeInvite;
  public readonly isSubmitting = signal<boolean>(false);
  public readonly generatedLink = signal<string>('');
  public readonly copyFeedback = signal<string>('');
  public readonly errorMessage = signal<string>('');

  public readonly inviteForm = new FormGroup({
    channel: new FormControl<InviteChannel>('Email', { nonNullable: true }),
    email: new FormControl<string>('', {
      validators: [Validators.email],
      nonNullable: true,
    }),
    mobileNumber: new FormControl<string>('', { nonNullable: true }),
  });

  public readonly selectedChannel = signal<InviteChannel>('Email');

  public setChannel(channel: InviteChannel): void {
    this.selectedChannel.set(channel);
    this.inviteForm.controls.channel.setValue(channel);
    this.errorMessage.set('');
    if (channel === 'Link' && !this.generatedLink()) {
      this.generateLink();
    }
  }

  public generateLink(): void {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://parentpath.app';
    const randomToken = `inv_${Math.random().toString(36).substring(2, 9)}`;
    const link = `${origin}/accounts/accept-invite?token=${randomToken}`;
    this.generatedLink.set(link);
  }

  public async copyLink(): Promise<void> {
    const link = this.generatedLink();
    if (link && typeof navigator !== 'undefined') {
      await navigator.clipboard.writeText(link);
      this.copyFeedback.set('Link copied to clipboard');
      setTimeout(() => {
        this.copyFeedback.set('');
      }, 3000);
    }
  }

  public async onSubmit(): Promise<void> {
    const channel = this.inviteForm.controls.channel.value;
    let target: string;

    if (channel === 'Email') {
      const email = this.inviteForm.controls.email.value.trim();
      if (!email || this.inviteForm.controls.email.invalid) {
        this.errorMessage.set('Please enter a valid email address.');
        return;
      }
      target = email;
    } else if (channel === 'Text') {
      const phone = this.inviteForm.controls.mobileNumber.value.trim();
      if (!phone) {
        this.errorMessage.set('Please enter a valid mobile number.');
        return;
      }
      target = phone;
    } else {
      if (!this.generatedLink()) {
        this.generateLink();
      }
      target = this.generatedLink();
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    try {
      await this.householdService.sendInvite({ channel, target });
      await this.router.navigate(['/accounts/invites']);
    } catch {
      this.errorMessage.set('Failed to send invite. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  public async cancelActiveInvite(): Promise<void> {
    const active = this.activeInvite();
    if (active) {
      await this.householdService.cancelInvite(active.id);
    }
  }
}
