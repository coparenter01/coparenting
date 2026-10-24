import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SafetyModeService } from '../../../core/safety/safety-mode.service';

@Component({
  selector: 'pp-message-alert-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './message-alert.page.html',
  styleUrls: ['./message-alert.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageAlertPage {
  private readonly safetyModeService = inject(SafetyModeService);

  public readonly isSafetyModeActive = this.safetyModeService.safetyModeActive;
}
