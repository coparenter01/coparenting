import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfessionalsService } from '@core/professionals/professionals.service';

@Component({
  selector: 'pp-access-log',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './access-log.page.html',
  styleUrls: ['./access-log.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessLogPage {
  private readonly professionalsService = inject(ProfessionalsService);
  readonly accessLogs = this.professionalsService.accessLogs;
}
