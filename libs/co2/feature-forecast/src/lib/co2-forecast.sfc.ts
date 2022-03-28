import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'nrg-co2-forecast-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  template: ` <div>today's forecast 105 co2</div> `,
})
export class Co2ForecastComponent {}

@NgModule({
  declarations: [Co2ForecastComponent],
  exports: [Co2ForecastComponent],
  imports: [],
})
export class Co2ForecastScam {}
