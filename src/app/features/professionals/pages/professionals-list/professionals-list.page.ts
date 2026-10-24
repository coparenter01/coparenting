import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfessionalsService } from '@core/professionals/professionals.service';

@Component({
  selector: 'pp-professionals-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './professionals-list.page.html',
  styleUrls: ['./professionals-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalsListPage {
  private readonly professionalsService = inject(ProfessionalsService);
  readonly accesses = this.professionalsService.accesses;
}
