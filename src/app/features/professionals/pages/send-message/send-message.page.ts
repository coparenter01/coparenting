import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProfessionalsService } from '@core/professionals/professionals.service';
import { proMsg13 } from '@core/professionals/professionals.types';

@Component({
  selector: 'pp-send-message',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './send-message.page.html',
  styleUrls: ['./send-message.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendMessagePage {
  private readonly professionalsService = inject(ProfessionalsService);
  private readonly router = inject(Router);

  readonly activeAccesses = computed(() =>
    this.professionalsService.accesses().filter((a) => a.status === 'Active'),
  );

  readonly selectedAccessId = signal<string>(this.activeAccesses()[0]?.id ?? '');
  readonly subject = signal('');
  readonly body = signal('');
  readonly attachmentName = signal<string | null>(null);

  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly professionalName = computed(() => {
    const access = this.activeAccesses().find((a) => a.id === this.selectedAccessId());
    return access ? access.professional.name : 'Professional';
  });

  onRecipientChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      this.selectedAccessId.set(target.value);
    }
  }

  onSubjectInput(event: Event): void {
    this.subject.set((event.target as HTMLInputElement).value);
  }

  onBodyInput(event: Event): void {
    this.body.set((event.target as HTMLTextAreaElement).value);
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (target?.files?.[0]) {
      this.attachmentName.set(target.files[0].name);
    }
  }

  onSend(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const accessId = this.selectedAccessId();
    if (!accessId) {
      this.errorMessage.set('Please select a professional recipient.');
      return;
    }
    if (!this.subject().trim()) {
      this.errorMessage.set('Please provide a message subject.');
      return;
    }
    if (!this.body().trim()) {
      this.errorMessage.set('Please provide message content.');
      return;
    }

    const result = this.professionalsService.sendForwardedMessage({
      accessId,
      subject: this.subject(),
      body: this.body(),
      attachmentName: this.attachmentName() ?? undefined,
    });

    if (!result.success) {
      this.errorMessage.set(result.error ?? 'Could not send message.');
      return;
    }

    const proName = this.professionalName();
    this.successMessage.set(proMsg13(proName));
    setTimeout(() => {
      void this.router.navigate(['/professionals']);
    }, 1200);
  }
}
