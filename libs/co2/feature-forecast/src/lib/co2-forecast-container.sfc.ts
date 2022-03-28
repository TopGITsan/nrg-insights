import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { Co2Store } from '@nrg-insights/co2/data-access';
import { Co2ForecastScam } from './co2-forecast.sfc';

@Component({
  selector: 'nrg-co2-forecast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [Co2Store],
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  template: ` <nrg-co2-forecast-ui></nrg-co2-forecast-ui> `,
})
export class Co2ForecastContainerComponent {}

@NgModule({
  declarations: [Co2ForecastContainerComponent],
  exports: [Co2ForecastContainerComponent],
  imports: [CommonModule, Co2ForecastScam],
})
export class Co2ForecastContainerScam {}
