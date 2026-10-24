import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';

@Component({
  selector: 'pp-retention-policy',
  imports: [RouterLink, DatePipe],
  templateUrl: './retention-policy.page.html',
  styleUrls: ['./retention-policy.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetentionPolicyPage {
  private readonly recordsService = inject(RecordsService);

  readonly sections = this.recordsService.retentionSections;
}
