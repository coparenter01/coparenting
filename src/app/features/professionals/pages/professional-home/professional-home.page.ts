import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfessionalsService } from '@core/professionals/professionals.service';

@Component({
  selector: 'pp-professional-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './professional-home.page.html',
  styleUrls: ['./professional-home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalHomePage {
  private readonly professionalsService = inject(ProfessionalsService);
  readonly clients = this.professionalsService.clientRoster;
}
