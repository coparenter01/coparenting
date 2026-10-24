import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { HouseholdService } from '../../../../core/household/household.service';

@Component({
  selector: 'pp-household-overview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './household-overview.page.html',
  styleUrl: './household-overview.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HouseholdOverviewPage {
  private readonly authService = inject(AuthService);
  private readonly householdService = inject(HouseholdService);

  public readonly household = this.householdService.currentHousehold;
  public readonly isSoloMode = this.householdService.isSoloMode;
  public readonly members = this.householdService.members;
  public readonly profile = this.authService.profile;

  public readonly householdName = computed(() => {
    return this.household()?.name ?? 'My Household';
  });

  public readonly userDisplayName = computed(() => {
    return this.profile()?.display_name ?? 'You';
  });

  public readonly coParentMember = computed(() => {
    return this.members().find((m) => m.role === 'Co-parent') ?? null;
  });
}
