import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocumentsService } from '@core/documents/documents.service';
import { HouseholdService } from '@core/household/household.service';

@Component({
  selector: 'pp-photo-albums',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './photo-albums.page.html',
  styleUrl: './photo-albums.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoAlbumsPage implements OnInit {
  private readonly documentsService = inject(DocumentsService);
  private readonly householdService = inject(HouseholdService);

  public readonly albums = this.documentsService.photoAlbums;
  public readonly photos = this.documentsService.photos;

  public readonly showCreateForm = signal<boolean>(false);
  public readonly newTitle = signal<string>('');
  public readonly newDescription = signal<string>('');

  public ngOnInit(): void {
    void this.initData();
  }

  private async initData(): Promise<void> {
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    await this.documentsService.loadPhotoAlbums(hid);
  }

  public toggleCreateForm(): void {
    this.showCreateForm.update((val) => !val);
  }

  public updateTitle(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.newTitle.set(target.value);
  }

  public updateDescription(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.newDescription.set(target.value);
  }

  public async saveAlbum(): Promise<void> {
    const title = this.newTitle().trim();
    if (!title) return;
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    await this.documentsService.createPhotoAlbum(hid, title, this.newDescription());
    this.newTitle.set('');
    this.newDescription.set('');
    this.showCreateForm.set(false);
  }

  public getPhotoCount(albumId: string): number {
    return this.photos().filter((p) => p.album_id === albumId).length;
  }
}
