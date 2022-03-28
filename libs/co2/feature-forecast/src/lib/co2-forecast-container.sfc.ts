import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'nrg-co2-forecast',
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
export class Co2ForecastContainerComponent {}

@NgModule({
  declarations: [Co2ForecastContainerComponent],
  exports: [Co2ForecastContainerComponent],
  imports: [CommonModule],
})
export class Co2ForecastContainerScam {}
