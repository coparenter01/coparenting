import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';
import type { AffidavitRequestItem } from '@core/records/records.types';

@Component({
  selector: 'pp-affidavit-requests',
  imports: [RouterLink, DatePipe, TitleCasePipe],
  templateUrl: './affidavit-requests.page.html',
  styleUrls: ['./affidavit-requests.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AffidavitRequestsPage {
  private readonly recordsService = inject(RecordsService);

  readonly affidavitRequests = this.recordsService.affidavitRequests;

  downloadAffidavit(item: AffidavitRequestItem): void {
    window.alert(`Downloading notarized affidavit for case ${item.caseNumber}`);
  }
}
