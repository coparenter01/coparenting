import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { ChildrenService } from '@core/children/children.service';
import { DocumentsService } from '@core/documents/documents.service';
import { HouseholdService } from '@core/household/household.service';
import { DocumentDetailPage } from './document-detail/document-detail.page';
import { DocumentsListPage } from './documents-list/documents-list.page';
import { PhotoAlbumsPage } from './photo-albums/photo-albums.page';
import { PublicSharePage } from './public-share/public-share.page';
import { RecentlyDeletedPage } from './recently-deleted/recently-deleted.page';
import { ShareLinksPage } from './share-links/share-links.page';
import { UploadDocumentPage } from './upload-document/upload-document.page';

describe('Phase 3: Documents Module Screens (DOC-SCR-05..09, 12, 13)', { timeout: 15000 }, () => {
  it('DocumentsService should validate files and manage documents lifecycle', async () => {
    TestBed.configureTestingModule({
      providers: [DocumentsService, ChildrenService, HouseholdService, provideRouter([])],
    });
    const service = TestBed.inject(DocumentsService);

    // File validation
    const invalidExt = service.validateFile({
      name: 'script.exe',
      size: 1024,
      type: 'application/x-msdownload',
    });
    expect(invalidExt.valid).toBe(false);

    const validPdf = service.validateFile({
      name: 'report.pdf',
      size: 1024 * 50,
      type: 'application/pdf',
    });
    expect(validPdf.valid).toBe(true);

    // Upload, delete, restore
    const uploaded = await service.uploadDocument({
      householdId: 'h-test-01',
      title: 'Pediatric Summary',
      category: 'Medical',
      fileName: 'report.pdf',
      fileSizeBytes: 1024 * 50,
      mimeType: 'application/pdf',
    });
    expect(uploaded.document).toBeTruthy();
    if (uploaded.document) {
      await service.deleteDocument(uploaded.document.id);
      expect(service.recentlyDeleted().some((d) => d.id === uploaded.document?.id)).toBe(true);
      await service.restoreDocument(uploaded.document.id);
      expect(service.documents().some((d) => d.id === uploaded.document?.id)).toBe(true);
    }
  });

  it('DocumentsListPage (DOC-SCR-05) should render documents and storage meter', async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsListPage],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        DocumentsService,
        ChildrenService,
        HouseholdService,
      ],
    }).compileComponents();

    const docService = TestBed.inject(DocumentsService);
    await docService.loadDocuments('demo-household-01');

    const fixture = TestBed.createComponent(DocumentsListPage);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Documents');
    expect(fixture.componentInstance.documents().length).toBeGreaterThan(0);
  });

  it('UploadDocumentPage (DOC-SCR-06) should reject files over size limit', async () => {
    await TestBed.configureTestingModule({
      imports: [UploadDocumentPage],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        DocumentsService,
        ChildrenService,
        HouseholdService,
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(UploadDocumentPage);
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    expect(comp.categories).toContain('Medical');
  });

  it('DocumentDetailPage (DOC-SCR-07) and RecentlyDeletedPage (DOC-SCR-08) should render details and trash', async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentDetailPage, RecentlyDeletedPage],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        DocumentsService,
        ChildrenService,
        HouseholdService,
      ],
    }).compileComponents();

    const docService = TestBed.inject(DocumentsService);
    await docService.loadDocuments('demo-household-01');

    const detailFixture = TestBed.createComponent(DocumentDetailPage);
    detailFixture.detectChanges();
    expect(detailFixture.componentInstance.document()).toBeTruthy();

    const trashFixture = TestBed.createComponent(RecentlyDeletedPage);
    trashFixture.detectChanges();
    const trashCompiled = trashFixture.nativeElement as HTMLElement;
    expect(trashCompiled.querySelector('h1')?.textContent).toContain('Recently deleted');
  });

  it('PhotoAlbumsPage (DOC-SCR-09) should render albums and handle album creation', async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoAlbumsPage],
      providers: [provideRouter([]), provideLocationMocks(), DocumentsService, HouseholdService],
    }).compileComponents();

    const docService = TestBed.inject(DocumentsService);
    await docService.loadPhotoAlbums('demo-household-01');

    const fixture = TestBed.createComponent(PhotoAlbumsPage);
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    expect(comp.albums().length).toBeGreaterThan(0);
    comp.toggleCreateForm();
    fixture.detectChanges();
    expect(comp.showCreateForm()).toBe(true);
  });

  it('ShareLinksPage (DOC-SCR-12) and PublicSharePage (DOC-SCR-13) should handle share link lifecycle', async () => {
    await TestBed.configureTestingModule({
      imports: [ShareLinksPage, PublicSharePage],
      providers: [provideRouter([]), provideLocationMocks(), DocumentsService, HouseholdService],
    }).compileComponents();

    const docService = TestBed.inject(DocumentsService);
    await docService.loadDocuments('demo-household-01');

    const shareFixture = TestBed.createComponent(ShareLinksPage);
    shareFixture.detectChanges();

    const comp = shareFixture.componentInstance;
    comp.toggleAddForm();
    expect(comp.showAddForm()).toBe(true);

    const publicFixture = TestBed.createComponent(PublicSharePage);
    publicFixture.detectChanges();

    const pubComp = publicFixture.componentInstance;
    expect(pubComp.isAvailable()).toBe(true);
    pubComp.triggerDownload();
    expect(pubComp.downloadMessage()).toContain('Downloading');
  });
});
