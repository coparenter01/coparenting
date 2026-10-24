import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChildrenService } from '@core/children/children.service';
import type { ChildRow } from '@core/children/children.types';
import { HouseholdService } from '@core/household/household.service';

interface ChildForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  birthDate: FormControl<string>;
}

@Component({
  selector: 'pp-children-list',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './children-list.page.html',
  styleUrl: './children-list.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildrenListPage implements OnInit {
  private readonly childrenService = inject(ChildrenService);
  private readonly householdService = inject(HouseholdService);

  public readonly children = this.childrenService.children;
  public readonly formOpen = signal(false);
  public readonly editingChildId = signal<string | null>(null);
  public readonly errorMessage = signal<string | null>(null);

  public readonly isEditing = computed(() => this.editingChildId() !== null);

  public readonly childForm = new FormGroup<ChildForm>({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(60)],
    }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(60)] }),
    birthDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  public ngOnInit(): void {
    void this.initData();
  }

  private async initData(): Promise<void> {
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    await this.childrenService.loadChildren(hid);
  }

  public startAddChild(): void {
    this.editingChildId.set(null);
    this.childForm.reset({ firstName: '', lastName: '', birthDate: '' });
    this.errorMessage.set(null);
    this.formOpen.set(true);
  }

  public editChild(child: ChildRow): void {
    this.editingChildId.set(child.id);
    this.childForm.setValue({
      firstName: child.first_name,
      lastName: child.last_name,
      birthDate: child.birth_date,
    });
    this.errorMessage.set(null);
    this.formOpen.set(true);
  }

  public closeForm(): void {
    this.formOpen.set(false);
    this.editingChildId.set(null);
    this.errorMessage.set(null);
  }

  public async saveChild(): Promise<void> {
    if (this.childForm.invalid) return;
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    const raw = this.childForm.getRawValue();

    const editId = this.editingChildId();
    if (editId) {
      await this.childrenService.updateChild(editId, {
        firstName: raw.firstName,
        lastName: raw.lastName,
        birthDate: raw.birthDate,
      });
      this.closeForm();
    } else {
      const res = await this.childrenService.addChild({
        householdId: hid,
        firstName: raw.firstName,
        lastName: raw.lastName,
        birthDate: raw.birthDate,
      });
      if (res.error) {
        this.errorMessage.set(res.error);
      } else {
        this.closeForm();
      }
    }
  }

  public async archiveCurrentChild(): Promise<void> {
    const editId = this.editingChildId();
    if (!editId) return;
    await this.childrenService.archiveChild(editId);
    this.closeForm();
  }
}
