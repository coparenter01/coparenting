import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';
import type { HearingPacketData } from '@core/child-support/child-support.types';

@Component({
  selector: 'pp-hearing-packet',
  imports: [RouterLink],
  templateUrl: './hearing-packet.page.html',
  styleUrls: ['./hearing-packet.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HearingPacketPage {
  private readonly cssService = inject(ChildSupportService);

  readonly packet = computed<HearingPacketData | null>(() =>
    this.cssService.generateHearingPacket(),
  );

  readonly isDownloading = signal<boolean>(false);
  readonly downloadSuccess = signal<boolean>(false);

  downloadPacket(): void {
    this.isDownloading.set(true);
    setTimeout(() => {
      this.isDownloading.set(false);
      this.downloadSuccess.set(true);
    }, 600);
  }
}
