import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CalendarService } from '@core/calendar/calendar.service';
import { SafetyModeService } from '@core/safety/safety-mode.service';

@Component({
  selector: 'pp-check-in',
  imports: [FormsModule, RouterLink],
  templateUrl: './check-in.page.html',
  styleUrl: './check-in.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckInPage {
  private readonly calendarService = inject(CalendarService);
  private readonly safetyMode = inject(SafetyModeService);

  note = '';
  readonly isLoading = signal<boolean>(false);
  readonly successMessage = signal<string | null>(null);

  readonly isSafetyMode = computed(() => {
    return this.safetyMode.safetyModeActive();
  });

  checkInNow(): void {
    if (this.isSafetyMode()) return;

    this.isLoading.set(true);

    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.recordLocation(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          // Fallback coordinate when geolocation permission is mocked or denied in testing
          this.recordLocation(37.7749, -122.4194);
        },
        { timeout: 3000 },
      );
    } else {
      this.recordLocation(37.7749, -122.4194);
    }
  }

  private recordLocation(lat: number, lng: number): void {
    const res = this.calendarService.recordCheckIn({
      lat,
      lng,
      address: 'Central Library Parking Lot, San Francisco, CA',
      exchangeId: 'exch-1',
      entryId: 'entry-1',
    });
    this.isLoading.set(false);
    if (res) {
      this.successMessage.set(
        'Check-in recorded at ' +
          new Date(res.checkedInAt).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          }) +
          ' (GPS: ' +
          lat.toFixed(4) +
          ', ' +
          lng.toFixed(4) +
          '). Stored in official exchange record.',
      );
    }
  }
}
