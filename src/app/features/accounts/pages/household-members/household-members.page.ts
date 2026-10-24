import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HouseholdService } from '../../../../core/household/household.service';
import type { HouseholdRole } from '../../../../core/supabase/models.types';

@Component({
  selector: 'pp-household-members',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './household-members.page.html',
  styleUrl: './household-members.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HouseholdMembersPage {
  private readonly householdService = inject(HouseholdService);

  public readonly members = this.householdService.members;
  public readonly isSubmitting = signal<boolean>(false);
  public readonly successMessage = signal<string>('');

  public readonly addMemberForm = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.maxLength(60)],
      nonNullable: true,
    }),
    role: new FormControl<HouseholdRole>('Parent', { nonNullable: true }),
    canSeeCalendar: new FormControl<boolean>(true, { nonNullable: true }),
    receivesMessages: new FormControl<boolean>(false, { nonNullable: true }),
  });

  public getSelectedRole(): HouseholdRole {
    return this.addMemberForm.controls.role.value;
  }

  public async onAddMember(): Promise<void> {
    if (this.addMemberForm.invalid) {
      this.addMemberForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.successMessage.set('');

    const name = this.addMemberForm.controls.name.value;
    const role = this.addMemberForm.controls.role.value;
    const canSeeCalendar = this.addMemberForm.controls.canSeeCalendar.value;
    const receivesMessages = this.addMemberForm.controls.receivesMessages.value;

    await this.householdService.addMember({
      name,
      role,
      permissions: {
        canSeeCalendar,
        receivesMessages,
      },
    });

    this.addMemberForm.reset({
      name: '',
      role: 'Parent',
      canSeeCalendar: true,
      receivesMessages: false,
    });
    this.isSubmitting.set(false);
    this.successMessage.set(`${name} has been added to your household.`);
  }

  public async onRemoveMember(memberId: string): Promise<void> {
    await this.householdService.removeMember(memberId);
  }
}
