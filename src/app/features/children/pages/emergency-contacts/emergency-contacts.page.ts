import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildrenService } from '@core/children/children.service';
import { HouseholdService } from '@core/household/household.service';

@Component({
  selector: 'pp-emergency-contacts',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './emergency-contacts.page.html',
  styleUrl: './emergency-contacts.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmergencyContactsPage implements OnInit {
  private readonly childrenService = inject(ChildrenService);
  private readonly householdService = inject(HouseholdService);

  public readonly children = this.childrenService.children;
  public readonly contacts = this.childrenService.emergencyContacts;

  public readonly showAddForm = signal<boolean>(false);
  public readonly selectedChildId = signal<string>('');
  public readonly newName = signal<string>('');
  public readonly newRelationship = signal<string>('Grandparent');
  public readonly newPhone = signal<string>('');
  public readonly newEmail = signal<string>('');
  public readonly isPickup = signal<boolean>(false);
  public readonly copyMessage = signal<string | null>(null);

  public ngOnInit(): void {
    void this.initData();
  }

  public toggleAddForm(): void {
    this.showAddForm.update((val) => !val);
  }

  public updateField(field: 'child' | 'name' | 'rel' | 'phone' | 'email', event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    switch (field) {
      case 'child':
        this.selectedChildId.set(target.value);
        break;
      case 'name':
        this.newName.set(target.value);
        break;
      case 'rel':
        this.newRelationship.set(target.value);
        break;
      case 'phone':
        this.newPhone.set(target.value);
        break;
      case 'email':
        this.newEmail.set(target.value);
        break;
    }
  }

  public togglePickup(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.isPickup.set(target.checked);
  }

  public async saveContact(): Promise<void> {
    const name = this.newName().trim();
    const phone = this.newPhone().trim();
    if (!name || !phone) return;

    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    await this.childrenService.addEmergencyContact({
      householdId: hid,
      childId: this.selectedChildId() || undefined,
      name,
      relationship: this.newRelationship().trim(),
      phone,
      email: this.newEmail().trim() || undefined,
      isAuthorizedPickup: this.isPickup(),
    });

    this.newName.set('');
    this.newPhone.set('');
    this.newEmail.set('');
    this.isPickup.set(false);
    this.showAddForm.set(false);
  }

  public async removeContact(contactId: string): Promise<void> {
    const contact = this.contacts().find((c) => c.id === contactId);
    if (contact?.consent_token) {
      await this.childrenService.updateEmergencyConsent(contact.consent_token, 'Withdrawn');
    }
  }

  public copyConsentLink(token: string): void {
    const url = `${window.location.origin}/emergency-consent/${token}`;
    void navigator.clipboard.writeText(url);
    this.copyMessage.set(`Consent invitation link copied: ${url}`);
    setTimeout(() => {
      this.copyMessage.set(null);
    }, 4000);
  }

  private async initData(): Promise<void> {
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    await Promise.all([
      this.childrenService.loadChildren(hid),
      this.childrenService.loadEmergencyContacts(hid),
    ]);
  }
}
