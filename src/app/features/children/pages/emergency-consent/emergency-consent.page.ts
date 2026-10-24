import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChildrenService } from '@core/children/children.service';
import type { EmergencyConsentStatus } from '@core/children/children.types';

@Component({
  selector: 'pp-emergency-consent',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './emergency-consent.page.html',
  styleUrl: './emergency-consent.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmergencyConsentPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly childrenService = inject(ChildrenService);

  public readonly token = signal<string>('');
  public readonly inviterName = signal<string>('Jordan Vance');
  public readonly childName = signal<string>('Maya Vance');
  public readonly currentStatus = signal<EmergencyConsentStatus>('Pending');

  public ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token') ?? 'demo-token';
    this.token.set(token);
    this.resolveContact(token);
  }

  public async setConsent(status: EmergencyConsentStatus): Promise<void> {
    this.currentStatus.set(status);
    await this.childrenService.updateEmergencyConsent(this.token(), status);
  }

  private resolveContact(token: string): void {
    const contact = this.childrenService.emergencyContacts().find((c) => c.consent_token === token);
    if (contact) {
      this.currentStatus.set(contact.consent_status);
      const child = this.childrenService.children().find((c) => c.id === contact.child_id);
      if (child) {
        this.childName.set(`${child.first_name} ${child.last_name}`);
      }
    }
  }
}
