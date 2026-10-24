import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';
import { formatCentsToUsd } from '@core/child-support/child-support.utils';

@Component({
  selector: 'pp-due-dates',
  imports: [RouterLink],
  templateUrl: './due-dates.page.html',
  styleUrls: ['./due-dates.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DueDatesPage {
  private readonly cssService = inject(ChildSupportService);

  readonly currentCase = this.cssService.currentCase;
  readonly reminders = this.cssService.reminders;
  readonly saveSuccess = signal<boolean>(false);

  readonly remind7 = signal<boolean>(this.reminders().remind7Days);
  readonly remind3 = signal<boolean>(this.reminders().remind3Days);
  readonly remind1 = signal<boolean>(this.reminders().remind1Day);
  readonly pushNotifs = signal<boolean>(this.reminders().pushNotifications);
  readonly emailNotifs = signal<boolean>(this.reminders().emailNotifications);

  getMonthlyAmount(): string {
    const c = this.currentCase();
    return c ? formatCentsToUsd(c.monthlyOrderCents) : '$0.00';
  }

  toggle7(event: Event): void {
    this.remind7.set((event.target as HTMLInputElement).checked);
  }

  toggle3(event: Event): void {
    this.remind3.set((event.target as HTMLInputElement).checked);
  }

  toggle1(event: Event): void {
    this.remind1.set((event.target as HTMLInputElement).checked);
  }

  togglePush(event: Event): void {
    this.pushNotifs.set((event.target as HTMLInputElement).checked);
  }

  toggleEmail(event: Event): void {
    this.emailNotifs.set((event.target as HTMLInputElement).checked);
  }

  savePreferences(): void {
    this.cssService.updateReminders({
      remind7Days: this.remind7(),
      remind3Days: this.remind3(),
      remind1Day: this.remind1(),
      pushNotifications: this.pushNotifs(),
      emailNotifications: this.emailNotifs(),
    });
    this.saveSuccess.set(true);
    setTimeout(() => {
      this.saveSuccess.set(false);
    }, 3000);
  }
}
