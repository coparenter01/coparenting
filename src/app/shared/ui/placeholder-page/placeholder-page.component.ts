import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Shared placeholder used by every not-yet-built page. */
@Component({
  selector: 'pp-placeholder-page',
  imports: [RouterLink],
  template: `
    <main id="main-content" class="placeholder-page">
      <span class="material-symbols-rounded placeholder-icon" aria-hidden="true">
        construction
      </span>
      <h1>{{ title() }}</h1>
      <p class="placeholder-body">This page is coming in a later build phase.</p>
      <a routerLink="/home" class="placeholder-link">← Back to Home</a>
    </main>
  `,
  styles: `
    :host {
      display: block;
    }

    .placeholder-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60dvh;
      gap: 16px;
      text-align: center;
      padding: 32px 24px;
    }

    .placeholder-icon {
      font-size: 48px;
      color: var(--pp-primary-500);
    }

    h1 {
      margin: 0;
      color: var(--pp-ink);
    }

    .placeholder-body {
      margin: 0;
      color: var(--pp-ink-2);
    }

    .placeholder-link {
      color: var(--pp-primary-600);
      text-decoration: underline;
      font-weight: 500;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderPageComponent {
  public readonly title = input.required<string>();
}
