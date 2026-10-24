import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProfessionalsService } from '@core/professionals/professionals.service';

interface SharedClientItem {
  id: string;
  category: 'messages' | 'calendar' | 'expenses' | 'documents' | 'records';
  date: string;
  title: string;
  from: string;
}

@Component({
  selector: 'pp-client-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './client-view.page.html',
  styleUrls: ['./client-view.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientViewPage {
  private readonly route = inject(ActivatedRoute);
  private readonly professionalsService = inject(ProfessionalsService);

  readonly activeTab = signal<'messages' | 'calendar' | 'expenses' | 'documents' | 'records'>(
    'messages',
  );

  readonly clientName = signal('Alex Morgan');
  readonly accessEnds = signal('2027-04-30');

  readonly allItems = signal<SharedClientItem[]>([
    {
      id: 'item-1',
      category: 'messages',
      date: '2026-10-21',
      title: 'Schedule adjustment for dental visit',
      from: 'Alex Morgan',
    },
    {
      id: 'item-2',
      category: 'messages',
      date: '2026-10-18',
      title: 'Thanksgiving weekend travel plan',
      from: 'Jordan Taylor',
    },
    {
      id: 'item-3',
      category: 'calendar',
      date: '2026-10-24',
      title: 'Parenting time transition: Public library pickup',
      from: 'Shared Calendar',
    },
    {
      id: 'item-4',
      category: 'expenses',
      date: '2026-10-15',
      title: 'Orthodontic consultation receipt ($120.00)',
      from: 'Alex Morgan',
    },
    {
      id: 'item-5',
      category: 'documents',
      date: '2026-09-14',
      title: 'Custody Agreement Final Draft.pdf',
      from: 'Court Filing',
    },
    {
      id: 'item-6',
      category: 'records',
      date: '2026-10-01',
      title: 'Q3 Certified Message & Calendar Export',
      from: 'Certified Records',
    },
  ]);

  readonly filteredItems = computed(() => {
    const tab = this.activeTab();
    return this.allItems().filter((i) => i.category === tab);
  });
}
