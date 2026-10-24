import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CalendarService } from '@core/calendar/calendar.service';

export interface ComplianceRowViewModel {
  id: string;
  date: string;
  scheduledWith: string;
  actualWith: string;
  difference: string;
  diffType: 'plus' | 'minus' | 'neutral';
}

@Component({
  selector: 'pp-compliance-view',
  imports: [FormsModule, RouterLink],
  templateUrl: './compliance-view.page.html',
  styleUrl: './compliance-view.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplianceViewPage {
  private readonly calendarService = inject(CalendarService);

  readonly metrics = this.calendarService.compliance;

  fromDate = new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString().split('T')[0];
  toDate = new Date().toISOString().split('T')[0];

  readonly complianceRows: ComplianceRowViewModel[] = [
    {
      id: 'cr-1',
      date: 'Oct 16 – Oct 19',
      scheduledWith: 'Elena Rivera (72 hrs)',
      actualWith: 'Elena Rivera (72 hrs)',
      difference: 'Exact match (0m)',
      diffType: 'neutral',
    },
    {
      id: 'cr-2',
      date: 'Oct 19 – Oct 21',
      scheduledWith: 'David Chen (48 hrs)',
      actualWith: 'David Chen (50 hrs)',
      difference: '+2 hrs (approved swap)',
      diffType: 'plus',
    },
    {
      id: 'cr-3',
      date: 'Oct 21 – Oct 23',
      scheduledWith: 'Elena Rivera (48 hrs)',
      actualWith: 'Elena Rivera (46 hrs)',
      difference: '-2 hrs (agreed makeup)',
      diffType: 'minus',
    },
  ];
}
