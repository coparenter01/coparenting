import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pp-ai-settings-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-settings.page.html',
  styleUrls: ['./ai-settings.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSettingsPage {
  public toneCheckEnabled = true;
  public shieldEnabled = true;
  public shieldSensitivity = 'Standard';
  public readonly isSaved = signal(false);

  public onSave(): void {
    this.isSaved.set(true);
    setTimeout(() => {
      this.isSaved.set(false);
    }, 2500);
  }
}
