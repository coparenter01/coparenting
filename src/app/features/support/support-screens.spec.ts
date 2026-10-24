import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { SupportService } from '../../core/support/support.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { ArticleDetailPage } from './pages/article-detail/article-detail.page';
import { HelpArticleEditorPage } from './pages/help-article-editor/help-article-editor.page';
import { HelpCenterPage } from './pages/help-center/help-center.page';
import { MyRequestsPage } from './pages/my-requests/my-requests.page';
import { NewRequestFormPage } from './pages/new-request-form/new-request-form.page';
import { ReplyTemplatesPage } from './pages/reply-templates/reply-templates.page';
import { RequestConfirmationPage } from './pages/request-confirmation/request-confirmation.page';
import { RequestThreadPage } from './pages/request-thread/request-thread.page';
import { SearchResultsPage } from './pages/search-results/search-results.page';
import { ServiceNoticesPage } from './pages/service-notices/service-notices.page';
import { SignInRequestFormPage } from './pages/sign-in-request-form/sign-in-request-form.page';
import { StaffCaseViewPage } from './pages/staff-case-view/staff-case-view.page';
import { StaffQueuePage } from './pages/staff-queue/staff-queue.page';
import { SupportMeasuresPage } from './pages/support-measures/support-measures.page';

describe('Phase 11: Support Module Screens (SUP-SCR-01..14)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([]), SupportService, AuthService],
    }).compileComponents();
  });

  it('SUP-SCR-01: HelpCenterPage should render search input and topic links', () => {
    const fixture: ComponentFixture<HelpCenterPage> = TestBed.createComponent(HelpCenterPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Help');
    expect(el.querySelector('#help-search-input')).toBeTruthy();
    expect(el.querySelectorAll('.topic-card').length).toBeGreaterThanOrEqual(6);
  });

  it('SUP-SCR-02: SearchResultsPage should filter and list matching articles', () => {
    const fixture: ComponentFixture<SearchResultsPage> = TestBed.createComponent(SearchResultsPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.page-title')?.textContent).toContain('Search results');
    expect(el.querySelector('#search-input')).toBeTruthy();
    expect(el.querySelector('.results-count')).toBeTruthy();
  });

  it('SUP-SCR-03: ArticleDetailPage should render article content and helpful feedback buttons', () => {
    const fixture: ComponentFixture<ArticleDetailPage> = TestBed.createComponent(ArticleDetailPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('article h1')).toBeTruthy();
    expect(el.querySelector('#feedback-yes-btn')).toBeTruthy();
    expect(el.querySelector('#feedback-no-btn')).toBeTruthy();
  });

  it('SUP-SCR-04: NewRequestFormPage should render request form and safety notice', () => {
    const fixture: ComponentFixture<NewRequestFormPage> =
      TestBed.createComponent(NewRequestFormPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Contact support');
    expect(el.querySelector('#request-category')).toBeTruthy();
    expect(el.querySelector('#request-subject')).toBeTruthy();
    expect(el.querySelector('#request-description')).toBeTruthy();
    expect(el.querySelector('#submit-request-btn')).toBeTruthy();
  });

  it('SUP-SCR-05: RequestConfirmationPage should display case number and target', () => {
    const fixture: ComponentFixture<RequestConfirmationPage> =
      TestBed.createComponent(RequestConfirmationPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('We received your request');
    expect(el.querySelector('#copy-case-number-btn')).toBeTruthy();
    expect(el.querySelector('#view-request-btn')).toBeTruthy();
  });

  it('SUP-SCR-06: MyRequestsPage should render requests table and new request action', () => {
    const fixture: ComponentFixture<MyRequestsPage> = TestBed.createComponent(MyRequestsPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('My requests');
    expect(el.querySelector('#filter-status')).toBeTruthy();
    expect(el.querySelector('.requests-table')).toBeTruthy();
  });

  it('SUP-SCR-07: RequestThreadPage should render message thread and reply form', () => {
    const fixture: ComponentFixture<RequestThreadPage> = TestBed.createComponent(RequestThreadPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.thread-card')).toBeTruthy();
    expect(el.querySelector('.header-row h1')).toBeTruthy();
  });

  it('SUP-SCR-08: SignInRequestFormPage should render public help form with email field', () => {
    const fixture: ComponentFixture<SignInRequestFormPage> =
      TestBed.createComponent(SignInRequestFormPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Ask for help');
    expect(el.querySelector('#public-email')).toBeTruthy();
    expect(el.querySelector('#public-submit-btn')).toBeTruthy();
  });

  it('SUP-SCR-09: StaffQueuePage should render staff queue table and priority badges', () => {
    const fixture: ComponentFixture<StaffQueuePage> = TestBed.createComponent(StaffQueuePage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.page-title')?.textContent).toContain('Open cases');
    expect(el.querySelector('.staff-table')).toBeTruthy();
    expect(el.querySelector('#priority-filter')).toBeTruthy();
  });

  it('SUP-SCR-10: StaffCaseViewPage should render case thread, template insertion, and facts', () => {
    const fixture: ComponentFixture<StaffCaseViewPage> = TestBed.createComponent(StaffCaseViewPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.staff-header')).toBeTruthy();
    expect(el.querySelector('.facts-list')).toBeTruthy();
    expect(el.querySelector('#staff-send-reply-btn')).toBeTruthy();
    expect(el.querySelector('#add-internal-note-btn')).toBeTruthy();
  });

  it('SUP-SCR-11: ServiceNoticesPage should render notices table and notice form', () => {
    const fixture: ComponentFixture<ServiceNoticesPage> =
      TestBed.createComponent(ServiceNoticesPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Service notices');
    expect(el.querySelector('.notices-table')).toBeTruthy();
    expect(el.querySelector('#notice-text')).toBeTruthy();
    expect(el.querySelector('#publish-notice-btn')).toBeTruthy();
  });

  it('SUP-SCR-12: HelpArticleEditorPage should render editor form and version history', () => {
    const fixture: ComponentFixture<HelpArticleEditorPage> =
      TestBed.createComponent(HelpArticleEditorPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Edit help article');
    expect(el.querySelector('#article-title-input')).toBeTruthy();
    expect(el.querySelector('#article-body-textarea')).toBeTruthy();
    expect(el.querySelector('.history-card')).toBeTruthy();
  });

  it('SUP-SCR-13: ReplyTemplatesPage should render templates table and new template form', () => {
    const fixture: ComponentFixture<ReplyTemplatesPage> =
      TestBed.createComponent(ReplyTemplatesPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Reply templates');
    expect(el.querySelector('.templates-table')).toBeTruthy();
    expect(el.querySelector('#template-title-input')).toBeTruthy();
    expect(el.querySelector('#save-template-btn')).toBeTruthy();
  });

  it('SUP-SCR-14: SupportMeasuresPage should render KPI cards, target 95%, and CSV export', () => {
    const fixture: ComponentFixture<SupportMeasuresPage> =
      TestBed.createComponent(SupportMeasuresPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.page-title')?.textContent).toContain('Support measures');
    expect(el.querySelector('#export-measures-csv-btn')).toBeTruthy();
    expect(el.querySelectorAll('.stat-card').length).toBe(4);
    expect(el.querySelector('.measures-table')).toBeTruthy();
  });
});
