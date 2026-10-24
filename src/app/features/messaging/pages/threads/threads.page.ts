import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlaceholderPageComponent } from '@shared/ui/placeholder-page/placeholder-page.component';

@Component({
  selector: 'pp-threads',
  imports: [PlaceholderPageComponent],
  template: '<pp-placeholder-page title="Messages" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadsPage {}
