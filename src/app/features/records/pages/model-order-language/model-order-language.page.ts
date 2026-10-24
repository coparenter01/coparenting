import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';

@Component({
  selector: 'pp-model-order-language',
  imports: [RouterLink],
  templateUrl: './model-order-language.page.html',
  styleUrls: ['./model-order-language.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelOrderLanguagePage {
  private readonly recordsService = inject(RecordsService);

  readonly clauses = this.recordsService.modelOrderClauses;
  readonly copiedId = signal<string | null>(null);

  copyClause(text: string, id: string): void {
    void navigator.clipboard.writeText(text);
    this.copiedId.set(id);
    setTimeout(() => {
      if (this.copiedId() === id) {
        this.copiedId.set(null);
      }
    }, 2000);
  }

  downloadDoc(format: 'word' | 'pdf'): void {
    window.alert(`Downloading model order stipulations in ${format.toUpperCase()} format.`);
  }
}
