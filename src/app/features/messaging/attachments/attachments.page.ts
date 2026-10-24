import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { MessagingService } from '../../../core/messaging/messaging.service';

@Component({
  selector: 'pp-attachments-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attachments.page.html',
  styleUrls: ['./attachments.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachmentsPage implements OnInit {
  private readonly messagingService = inject(MessagingService);

  public readonly attachments = this.messagingService.attachments;

  public ngOnInit(): void {
    void this.messagingService.loadAttachments();
  }

  public onDownload(name: string): void {
    const blob = new Blob([`Simulated content for ${name}`], {
      type: 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }
}
