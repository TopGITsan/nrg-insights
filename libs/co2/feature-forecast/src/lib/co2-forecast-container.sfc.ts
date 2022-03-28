import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { Co2Store } from '@nrg-insights/co2/data-access';
import { Co2Items } from '@nrg-insights/co2/domain';
import { Observable } from 'rxjs';
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
  template: `
    <nrg-co2-forecast-ui [forecast]="forecast$ | async"></nrg-co2-forecast-ui>
  `,
})
export class Co2ForecastContainerComponent {
  #co2Store: Co2Store;
  forecast$: Observable<Co2Items>;
  constructor(co2Store: Co2Store) {
    this.#co2Store = co2Store;
    this.forecast$ = this.#co2Store.items$;
  }
}

@NgModule({
  declarations: [Co2ForecastContainerComponent],
  exports: [Co2ForecastContainerComponent],
  imports: [CommonModule, Co2ForecastScam],
})
export class Co2ForecastContainerScam {}
