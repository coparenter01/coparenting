import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SafetyModeService } from '@core/safety/safety-mode.service';

@Component({
  selector: 'pp-safety-turn-off',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './safety-turn-off.page.html',
  styleUrl: './safety-turn-off.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyTurnOffPage {
  private readonly _safety = inject(SafetyModeService);
  private readonly _router = inject(Router);

  public readonly errorMessage = signal<string | null>(null);
  public readonly resendSuccess = signal<boolean>(false);

  public readonly turnOffForm = new FormGroup({
    code: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[0-9]{6}$')],
    }),
  });

  public onSubmit(): void {
    if (this.turnOffForm.invalid) {
      return;
    }
    const enteredCode = this.turnOffForm.controls.code.value;
    const success = this._safety.disableSafetyMode(enteredCode);

    if (success) {
      void this._router.navigate(['/safety']);
    } else {
      this.errorMessage.set('Incorrect verification code. Please try again or request a new code.');
    }
  }

  public onResendCode(): void {
    this.resendSuccess.set(true);
    this.errorMessage.set(null);
    setTimeout(() => {
      this.resendSuccess.set(false);
    }, 4000);
  }
}
