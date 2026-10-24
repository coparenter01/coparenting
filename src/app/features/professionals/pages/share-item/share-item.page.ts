import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProfessionalsService } from '@core/professionals/professionals.service';
import {
  proMsg05,
  proMsg06,
  type ProfessionalShareItemType,
} from '@core/professionals/professionals.types';

interface ShareableItemOption {
  id: string;
  title: string;
  type: ProfessionalShareItemType;
}

@Component({
  selector: 'pp-share-item',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './share-item.page.html',
  styleUrls: ['./share-item.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareItemPage {
  private readonly professionalsService = inject(ProfessionalsService);
  private readonly router = inject(Router);

  readonly availableItems: ShareableItemOption[] = [
    {
      id: 'doc-001',
      title: 'Custody Agreement Final Draft',
      type: 'Document',
    },
    {
      id: 'rec-001',
      title: 'Certified Q3 Messaging & Calendar Export',
      type: 'Certified export',
    },
    {
      id: 'ch-001',
      title: 'Pediatric Allergy & Medication Record',
      type: 'Child information entry',
    },
    {
      id: 'css-001',
      title: 'October Support Remittance Confirmation',
      type: 'Recorded child support payment',
    },
  ];

  readonly activeAccesses = computed(() =>
    this.professionalsService.accesses().filter((a) => a.status === 'Active'),
  );

  readonly selectedItem = signal<string>(this.availableItems[0]?.id ?? '');
  readonly selectedAccessId = signal<string>(this.activeAccesses()[0]?.id ?? '');

  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly confirmNotice = computed(() => {
    const item = this.availableItems.find((i) => i.id === this.selectedItem());
    const access = this.activeAccesses().find((a) => a.id === this.selectedAccessId());
    const itemName = item ? item.title : 'this item';
    const proName = access ? access.professional.name : 'your professional';
    return proMsg05(itemName, proName);
  });

  onItemChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      this.selectedItem.set(target.value);
    }
  }

  onProfessionalChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      this.selectedAccessId.set(target.value);
    }
  }

  onShare(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const accessId = this.selectedAccessId();
    const item = this.availableItems.find((i) => i.id === this.selectedItem());
    if (!accessId || !item) {
      this.errorMessage.set('Please select both an item and a professional.');
      return;
    }

    const access = this.professionalsService.getAccessById(accessId);
    const result = this.professionalsService.shareItem(accessId, item.type, item.id, item.title);

    if (!result.success) {
      this.errorMessage.set(result.error ?? 'Could not share item.');
      return;
    }

    const proName = access ? access.professional.name : 'professional';
    this.successMessage.set(proMsg06(proName));
    setTimeout(() => {
      void this.router.navigate(['/professionals']);
    }, 1200);
  }
}
