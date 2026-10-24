import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'pp-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public readonly isSubmitting = signal<boolean>(false);
  public readonly successMessage = signal<string>('');

  public readonly profileForm = new FormGroup({
    displayName: new FormControl<string>(
      this.authService.profile()?.display_name ?? 'Parent User',
      {
        validators: [Validators.required, Validators.maxLength(60)],
        nonNullable: true,
      },
    ),
    email: new FormControl<string>(this.authService.user()?.email ?? 'parent@example.com', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    mobileNumber: new FormControl<string>('+1 (555) 234-5678', {
      nonNullable: true,
    }),
    language: new FormControl<string>(
      { value: 'English', disabled: true },
      {
        nonNullable: true,
      },
    ),
  });

  public async onSave(): Promise<void> {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.successMessage.set('');

    const displayName = this.profileForm.controls.displayName.value;
    await this.authService.updateProfile({ display_name: displayName });

    this.isSubmitting.set(false);
    this.successMessage.set('Profile changes saved successfully.');
  }

  public async onCancel(): Promise<void> {
    await this.router.navigate(['/settings']);
  }
}
