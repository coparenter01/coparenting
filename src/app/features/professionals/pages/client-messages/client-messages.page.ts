import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfessionalsService } from '@core/professionals/professionals.service';

@Component({
  selector: 'pp-client-messages',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './client-messages.page.html',
  styleUrls: ['./client-messages.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientMessagesPage {
  private readonly professionalsService = inject(ProfessionalsService);
  readonly messages = this.professionalsService.forwardedMessages;
}
