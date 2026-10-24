import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';
import type { SharedAgencyItem } from '@core/child-support/child-support.types';

@Component({
  selector: 'pp-shared-items',
  imports: [RouterLink, KeyValuePipe],
  templateUrl: './shared-items.page.html',
  styleUrls: ['./shared-items.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedItemsPage {
  private readonly cssService = inject(ChildSupportService);

  readonly sharedItems = this.cssService.sharedItems;

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  getItemBadge(type: SharedAgencyItem['itemType']): string {
    switch (type) {
      case 'hearing':
        return 'Hearing';
      case 'payment_receipt':
        return 'Payment Receipt';
      case 'order_summary':
        return 'Order Summary';
      case 'arrears_notice':
        return 'Arrears Statement';
      default:
        return 'Shared Item';
    }
  }
}
