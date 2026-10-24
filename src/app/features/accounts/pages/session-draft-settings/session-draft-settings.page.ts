import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pp-session-draft-settings',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './session-draft-settings.page.html',
  styleUrl: './session-draft-settings.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionDraftSettingsPage {
  public readonly isSaved = signal<boolean>(false);

  public readonly settingsForm = new FormGroup({
    timeoutMinutes: new FormControl<string>('30', { nonNullable: true }),
  });

  public onSave(): void {
    this.isSaved.set(true);
    setTimeout(() => {
      this.isSaved.set(false);
    }, 4000);
  }
}
