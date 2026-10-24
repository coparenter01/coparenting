import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'pp-ai-rewrite-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ai-rewrite.page.html',
  styleUrls: ['./ai-rewrite.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiRewritePage {
  private readonly router = inject(Router);

  public originalDraft =
    'You always fail to drop off the kids on time and it is completely unacceptable. You need to fix this right now.';
  public suggestedRewrite =
    'Could we please confirm that the drop-off time for the kids remains at 4:00 PM tomorrow? Thank you for helping keep their routine consistent.';

  public onAcceptRewrite(): void {
    void this.router.navigate(['/messages/new'], {
      queryParams: { body: this.suggestedRewrite },
    });
  }
}
