import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pp-hidden-image-preview',
  imports: [RouterLink],
  templateUrl: './hidden-image-preview.page.html',
  styleUrl: './hidden-image-preview.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HiddenImagePreviewPage {
  public readonly imageRevealed = signal<boolean>(false);

  public toggleReveal(): void {
    this.imageRevealed.update((v) => !v);
  }
}
