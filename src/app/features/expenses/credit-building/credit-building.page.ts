import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';

@Component({
  selector: 'pp-credit-building',
  imports: [RouterLink, SlicePipe],
  templateUrl: './credit-building.page.html',
  styleUrl: './credit-building.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditBuildingPage {
  private readonly expensesService = inject(ExpensesService);

  readonly settings = this.expensesService.creditBuilding;

  toggleEnrollment(): void {
    const current = this.settings().isEnabled;
    this.expensesService.toggleCreditBuilding(!current);
  }
}
