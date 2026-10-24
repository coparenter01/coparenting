import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';

@Component({
  selector: 'pp-public-records-request',
  imports: [RouterLink],
  templateUrl: './public-records-request.page.html',
  styleUrls: ['./public-records-request.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicRecordsRequestPage {
  private readonly recordsService = inject(RecordsService);

  readonly requesterName = signal<string>('');
  readonly organization = signal<string>('');
  readonly email = signal<string>('');
  readonly subpoenaFile = signal<File | null>(null);
  readonly notes = signal<string>('');

  readonly isSubmitting = signal<boolean>(false);
  readonly submittedSuccess = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  onNameChange(event: Event): void {
    this.requesterName.set((event.target as HTMLInputElement).value);
  }

  onOrgChange(event: Event): void {
    this.organization.set((event.target as HTMLInputElement).value);
  }

  onEmailChange(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
  }

  onNotesChange(event: Event): void {
    this.notes.set((event.target as HTMLTextAreaElement).value);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.subpoenaFile.set(input.files?.[0] ?? null);
  }

  async onSubmit(): Promise<void> {
    this.errorMessage.set(null);
    this.isSubmitting.set(true);

    try {
      await this.recordsService.submitSubpoena({
        requesterName: this.requesterName(),
        organization: this.organization(),
        email: this.email(),
        subpoenaFile: this.subpoenaFile() ?? undefined,
        notes: this.notes() || undefined,
      });
      this.submittedSuccess.set(true);
    } catch (err: unknown) {
      this.errorMessage.set(err instanceof Error ? err.message : 'Error submitting subpoena.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
