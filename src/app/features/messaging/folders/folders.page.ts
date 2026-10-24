import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { HouseholdService } from '../../../core/household/household.service';
import { MessagingService } from '../../../core/messaging/messaging.service';

@Component({
  selector: 'pp-folders-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './folders.page.html',
  styleUrls: ['./folders.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersPage implements OnInit {
  private readonly messagingService = inject(MessagingService);
  private readonly authService = inject(AuthService);
  private readonly householdService = inject(HouseholdService);

  public readonly folders = this.messagingService.folders;
  public newFolderName = '';

  public ngOnInit(): void {
    void this.initData();
  }

  private async initData(): Promise<void> {
    const userId = this.authService.user()?.id;
    if (userId) {
      await this.messagingService.loadFolders(userId);
    }
  }

  public async onCreateFolder(): Promise<void> {
    const name = this.newFolderName.trim();
    const userId = this.authService.user()?.id;
    const householdId = this.householdService.currentHousehold()?.id;

    if (!name || !userId || !householdId) return;

    const ok = await this.messagingService.createFolder(userId, householdId, name);
    if (ok) {
      this.newFolderName = '';
    }
  }
}
