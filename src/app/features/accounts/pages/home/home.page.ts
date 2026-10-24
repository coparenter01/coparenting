import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { HouseholdService } from '../../../../core/household/household.service';

interface UpcomingEvent {
  readonly id: string;
  readonly when: string;
  readonly what: string;
  readonly with: string;
}

interface RecentMessage {
  readonly id: string;
  readonly from: string;
  readonly subject: string;
  readonly time: string;
}

@Component({
  selector: 'pp-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly authService = inject(AuthService);
  private readonly householdService = inject(HouseholdService);

  public readonly profile = this.authService.profile;
  public readonly household = this.householdService.currentHousehold;
  public readonly isSoloMode = this.householdService.isSoloMode;

  public readonly greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  });

  public readonly displayName = computed(() => {
    return this.profile()?.display_name ?? 'Parent';
  });

  public readonly householdName = computed(() => {
    return this.household()?.name ?? 'Household';
  });

  public readonly upcomingEvents: readonly UpcomingEvent[] = [
    { id: '1', when: 'Today, 3:30 PM', what: 'School pick-up', with: 'Alex' },
    { id: '2', when: 'Friday, 5:00 PM', what: 'Parenting time transition', with: 'Both parents' },
    { id: '3', when: 'Next Monday', what: 'Soccer practice', with: 'Jamie' },
  ];

  public readonly recentMessages: readonly RecentMessage[] = [
    {
      id: 'm1',
      from: 'Co-parent',
      subject: 'Next weekend schedule confirmation',
      time: '10:45 AM',
    },
    { id: 'm2', from: 'School Office', subject: 'Field trip permission slip', time: 'Yesterday' },
  ];
}
