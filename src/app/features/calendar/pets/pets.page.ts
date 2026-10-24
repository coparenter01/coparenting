import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CalendarService } from '@core/calendar/calendar.service';

@Component({
  selector: 'pp-pets',
  imports: [FormsModule, RouterLink],
  templateUrl: './pets.page.html',
  styleUrl: './pets.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsPage {
  private readonly calendarService = inject(CalendarService);

  readonly petsList = this.calendarService.pets;
  readonly showAddModal = signal<boolean>(false);

  petName = '';
  petSpecies = 'Dog';
  petBreed = '';
  petNotes = '';

  openAddModal(): void {
    this.showAddModal.set(true);
  }

  closeAddModal(): void {
    this.showAddModal.set(false);
  }

  savePet(): void {
    if (!this.petName.trim()) return;

    this.calendarService.addPet(
      this.petName.trim(),
      this.petSpecies,
      this.petBreed.trim() || undefined,
      this.petNotes.trim() || undefined,
    );

    this.petName = '';
    this.petBreed = '';
    this.petNotes = '';
    this.showAddModal.set(false);
  }
}
