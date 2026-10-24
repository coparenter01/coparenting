import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HouseholdService } from '../../../../core/household/household.service';

@Component({
  selector: 'pp-choose-solo-mode',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './choose-solo-mode.page.html',
  styleUrl: './choose-solo-mode.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseSoloModePage {
  private readonly householdService = inject(HouseholdService);
  private readonly router = inject(Router);

  public async chooseSolo(): Promise<void> {
    await this.householdService.setSoloMode();
    await this.router.navigate(['/accounts/household']);
  }
}
