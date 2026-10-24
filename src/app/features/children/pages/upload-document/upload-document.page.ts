import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChildrenService } from '@core/children/children.service';
import { DocumentsService } from '@core/documents/documents.service';
import { HouseholdService } from '@core/household/household.service';
import type { DocumentCategory } from '@core/supabase/models.types';

interface UploadForm {
  title: FormControl<string>;
  category: FormControl<DocumentCategory>;
  childId: FormControl<string>;
  visibility: FormControl<'Shared' | 'Private'>;
}

@Component({
  selector: 'pp-upload-document',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './upload-document.page.html',
  styleUrl: './upload-document.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDocumentPage implements OnInit {
  private readonly router = inject(Router);
  private readonly documentsService = inject(DocumentsService);
  private readonly childrenService = inject(ChildrenService);
  private readonly householdService = inject(HouseholdService);

  public readonly children = this.childrenService.children;
  public readonly categories: readonly DocumentCategory[] = [
    'Medical',
    'School',
    'Legal',
    'Financial',
    'Other',
  ];
  public readonly errorMessage = signal<string | null>(null);
  public readonly chosenFile = signal<{ name: string; size: number; type: string } | null>(null);

  public readonly uploadForm = new FormGroup<UploadForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(120)],
    }),
    category: new FormControl<DocumentCategory>('Medical', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    childId: new FormControl('', { nonNullable: true }),
    visibility: new FormControl<'Shared' | 'Private'>('Shared', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public ngOnInit(): void {
    void this.initData();
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const validation = this.documentsService.validateFile({
      name: file.name,
      size: file.size,
      type: file.type,
    });

    if (!validation.valid) {
      this.errorMessage.set(validation.error ?? 'Invalid file');
      this.chosenFile.set(null);
      return;
    }

    this.errorMessage.set(null);
    this.chosenFile.set({
      name: file.name,
      size: file.size,
      type: file.type,
    });

    if (!this.uploadForm.controls.title.value) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      this.uploadForm.patchValue({ title: cleanName });
    }
  }

  public async submitUpload(): Promise<void> {
    const file = this.chosenFile();
    if (this.uploadForm.invalid || !file) return;

    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    const raw = this.uploadForm.getRawValue();

    const res = await this.documentsService.uploadDocument({
      householdId: hid,
      childId: raw.childId || null,
      title: raw.title,
      category: raw.category,
      fileName: file.name,
      fileSizeBytes: file.size,
      mimeType: file.type || 'application/octet-stream',
      isPrivate: raw.visibility === 'Private',
    });

    if (res.error) {
      this.errorMessage.set(res.error);
      return;
    }

    await this.router.navigate(['/documents']);
  }

  public formatBytes(bytes: number): string {
    if (bytes < 1024) return `${String(bytes)} B`;
    if (bytes < 1024 * 1024) return `${String(Math.round(bytes / 1024))} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private async initData(): Promise<void> {
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    await this.childrenService.loadChildren(hid);
  }
}
