import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';

@Component({
  selector: 'pp-link-case',
  imports: [RouterLink],
  templateUrl: './link-case.page.html',
  styleUrls: ['./link-case.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkCasePage {
  private readonly cssService = inject(ChildSupportService);
  private readonly router = inject(Router);

  readonly state = signal<string>('VA');
  readonly caseNumber = signal<string>('');
  readonly firstName = signal<string>('');
  readonly lastName = signal<string>('');
  readonly dob = signal<string>('');
  readonly code = signal<string>('');
  readonly codeSent = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  onStateChange(event: Event): void {
    this.state.set((event.target as HTMLSelectElement).value);
  }

  onCaseNumberChange(event: Event): void {
    this.caseNumber.set((event.target as HTMLInputElement).value);
  }

  onFirstNameChange(event: Event): void {
    this.firstName.set((event.target as HTMLInputElement).value);
  }

  onLastNameChange(event: Event): void {
    this.lastName.set((event.target as HTMLInputElement).value);
  }

  onDobChange(event: Event): void {
    this.dob.set((event.target as HTMLInputElement).value);
  }

  onCodeChange(event: Event): void {
    this.code.set((event.target as HTMLInputElement).value);
  }

  sendCode(): void {
    this.codeSent.set(true);
    this.errorMessage.set(null);
  }

  async onSubmit(): Promise<void> {
    if (!this.caseNumber() || !this.state()) {
      this.errorMessage.set('Please provide your State and Agency case number.');
      return;
    }

    try {
      await this.cssService.linkCase({
        state: this.state(),
        agencyCaseNumber: this.caseNumber(),
        legalFirstName: this.firstName(),
        legalLastName: this.lastName(),
        dateOfBirth: this.dob(),
        oneTimeCode: this.code(),
      });
      await this.router.navigate(['/child-support/consent']);
    } catch {
      this.errorMessage.set('Failed to initiate case linking.');
    }
  }
}
