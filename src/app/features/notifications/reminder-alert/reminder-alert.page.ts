import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SafetyModeService } from '../../../core/safety/safety-mode.service';

@Component({
  selector: 'pp-reminder-alert-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reminder-alert.page.html',
  styleUrls: ['./reminder-alert.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReminderAlertPage {
  private readonly safetyModeService = inject(SafetyModeService);

  public readonly isSafetyModeActive = this.safetyModeService.safetyModeActive;
}
