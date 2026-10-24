import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChildrenService } from '@core/children/children.service';
import { HouseholdService } from '@core/household/household.service';
import type { ChildSection } from '@core/supabase/models.types';

interface EntryForm {
  section: FormControl<ChildSection>;
  entryType: FormControl<string>;
  childId: FormControl<string>;
  title: FormControl<string>;
  details: FormControl<string>;
  contactName: FormControl<string>;
  contactEmail: FormControl<string>;
  contactPhone: FormControl<string>;
  contactAddress: FormControl<string>;
  visibility: FormControl<'Shared' | 'Private'>;
}

@Component({
  selector: 'pp-child-information-entry',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './child-information-entry.page.html',
  styleUrl: './child-information-entry.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildInformationEntryPage implements OnInit {
  private readonly router = inject(Router);
  private readonly childrenService = inject(ChildrenService);
  private readonly householdService = inject(HouseholdService);

  public readonly children = this.childrenService.children;

  public readonly entryForm = new FormGroup<EntryForm>({
    section: new FormControl<ChildSection>('Medical', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    entryType: new FormControl('Allergy', { nonNullable: true, validators: [Validators.required] }),
    childId: new FormControl('', { nonNullable: true }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    details: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(2000)] }),
    contactName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(100)],
    }),
    contactEmail: new FormControl('', { nonNullable: true }),
    contactPhone: new FormControl('', { nonNullable: true }),
    contactAddress: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(200)],
    }),
    visibility: new FormControl<'Shared' | 'Private'>('Shared', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public ngOnInit(): void {
    void this.initData();
  }

  private async initData(): Promise<void> {
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    await this.childrenService.loadChildren(hid);
    if (this.children().length > 0) {
      this.entryForm.patchValue({ childId: this.children()[0]?.id ?? '' });
    }
  }

  public async saveEntry(): Promise<void> {
    if (this.entryForm.invalid) return;
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    const raw = this.entryForm.getRawValue();

    await this.childrenService.addInformationEntry({
      householdId: hid,
      childId: raw.childId || null,
      section: raw.section,
      entryType: raw.entryType,
      title: raw.title,
      details: raw.details || null,
      contactName: raw.contactName || null,
      contactEmail: raw.contactEmail || null,
      contactPhone: raw.contactPhone || null,
      contactAddress: raw.contactAddress || null,
      visibility: raw.visibility,
    });

    await this.router.navigate(['/children/info'], {
      queryParams: raw.childId ? { childId: raw.childId } : undefined,
    });
  }
}
