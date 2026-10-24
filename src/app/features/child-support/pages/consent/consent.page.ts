import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';

@Component({
  selector: 'pp-consent',
  imports: [RouterLink],
  templateUrl: './consent.page.html',
  styleUrls: ['./consent.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsentPage {
  private readonly cssService = inject(ChildSupportService);
  private readonly router = inject(Router);

  readonly agreedReadOnly = signal<boolean>(false);
  readonly agreedNotAgency = signal<boolean>(false);
  readonly agreedPrivacy = signal<boolean>(false);
  readonly agreedRevoke = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  toggleReadOnly(event: Event): void {
    this.agreedReadOnly.set((event.target as HTMLInputElement).checked);
  }

  toggleNotAgency(event: Event): void {
    this.agreedNotAgency.set((event.target as HTMLInputElement).checked);
  }

  togglePrivacy(event: Event): void {
    this.agreedPrivacy.set((event.target as HTMLInputElement).checked);
  }

  toggleRevoke(event: Event): void {
    this.agreedRevoke.set((event.target as HTMLInputElement).checked);
  }

  canConfirm(): boolean {
    return (
      this.agreedReadOnly() && this.agreedNotAgency() && this.agreedPrivacy() && this.agreedRevoke()
    );
  }

  async onConfirm(): Promise<void> {
    if (!this.canConfirm()) {
      this.errorMessage.set('Please acknowledge all consent disclosures before confirming.');
      return;
    }

    try {
      await this.cssService.confirmConsent();
      await this.router.navigate(['/child-support']);
    } catch {
      this.errorMessage.set('Failed to record consent.');
    }
  }
}
