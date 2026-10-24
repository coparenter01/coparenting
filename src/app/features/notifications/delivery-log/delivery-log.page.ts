import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HouseholdService } from '../../../core/household/household.service';
import { NotificationsService } from '../../../core/notifications/notifications.service';
import type { NotificationDeliveryLogRow } from '../../../core/notifications/notifications.types';

@Component({
  selector: 'pp-delivery-log-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delivery-log.page.html',
  styleUrls: ['./delivery-log.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryLogPage implements OnInit {
  private readonly notificationsService = inject(NotificationsService);
  private readonly householdService = inject(HouseholdService);

  public readonly logs = this.notificationsService.deliveryLogs;
  public selectedChannel = 'All';
  public selectedResult = 'All';

  public ngOnInit(): void {
    const householdId = this.householdService.currentHousehold()?.id;
    if (householdId) {
      void this.notificationsService.loadDeliveryLogs(householdId);
    }
  }

  public get filteredLogs(): NotificationDeliveryLogRow[] {
    return this.logs().filter((l) => {
      const matchChannel = this.selectedChannel === 'All' || l.channel === this.selectedChannel;
      const matchResult = this.selectedResult === 'All' || l.result === this.selectedResult;
      return matchChannel && matchResult;
    });
  }
}
