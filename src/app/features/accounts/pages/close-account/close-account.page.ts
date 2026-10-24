import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'pp-close-account',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './close-account.page.html',
  styleUrl: './close-account.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public readonly exportFeedback = signal<string>('');
  public readonly isClosing = signal<boolean>(false);

  public readonly closeForm = new FormGroup({
    confirmUnderstand: new FormControl<boolean>(false, { nonNullable: true }),
  });

  public isConfirmed(): boolean {
    return this.closeForm.controls.confirmUnderstand.value;
  }

  public exportData(format: 'PDF' | 'CSV'): void {
    this.exportFeedback.set(`Exporting all records as ${format}... Download will start shortly.`);
    setTimeout(() => {
      this.exportFeedback.set(`Your records were exported as ${format}.`);
    }, 1500);
  }

  public async onCloseAccount(): Promise<void> {
    if (!this.isConfirmed()) return;

    this.isClosing.set(true);
    this.authService.signOut();
    await this.router.navigate(['/auth/sign-in'], {
      queryParams: { closed: 'true' },
    });
  }
}
