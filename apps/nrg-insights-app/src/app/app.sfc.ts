import { Component, NgModule } from '@angular/core';
import { Co2FeatureForecastModule } from '@nrg-insights/co2/feature-forecast';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  selector: 'nrg-root',
  template: `
    <nrg-co2-forecast></nrg-co2-forecast>
    <nrg-nx-welcome></nrg-nx-welcome>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Learning';
}

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [Co2FeatureForecastModule],
})
export class AppScam {}
