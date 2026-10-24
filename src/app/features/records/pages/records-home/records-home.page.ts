import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';

@Component({
  selector: 'pp-records-home',
  imports: [RouterLink],
  templateUrl: './records-home.page.html',
  styleUrls: ['./records-home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordsHomePage {
  private readonly recordsService = inject(RecordsService);

  readonly activeLegalHold = this.recordsService.activeLegalHold;
}
