import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlaceholderPageComponent } from '@shared/ui/placeholder-page/placeholder-page.component';

@Component({
  selector: 'pp-safety-home',
  imports: [PlaceholderPageComponent],
  template: '<pp-placeholder-page title="Safety and Privacy" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyHomePage {}
