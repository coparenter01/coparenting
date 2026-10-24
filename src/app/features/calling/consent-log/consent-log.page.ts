import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CallingService } from '../../../core/calling/calling.service';
import { HouseholdService } from '../../../core/household/household.service';

@Component({
  selector: 'pp-consent-log-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consent-log.page.html',
  styleUrls: ['./consent-log.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsentLogPage implements OnInit {
  private readonly callingService = inject(CallingService);
  private readonly householdService = inject(HouseholdService);

  public readonly consentLogs = this.callingService.consentLogs;

  public ngOnInit(): void {
    const householdId = this.householdService.currentHousehold()?.id;
    if (householdId) {
      void this.callingService.loadConsentLogs(householdId);
    }
  }
}
