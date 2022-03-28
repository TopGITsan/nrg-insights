import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { Co2Items } from '@nrg-insights/co2/domain';

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
  template: `
    <div>today's forecast 105 co2</div>
    <table>
      <thead>
        <tr>
          <th scope="col">Date and time</th>
          <th scope="col">gCO2eg/kWh</th>
          <th scope="col">Price Area</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let dataPoint of forecast">
          <td>{{ dataPoint.minutes5UTC.toJSDate() | date }}</td>
          <td>{{ dataPoint?.co2Emissions | number: '1.2' }}</td>
          <td>{{ dataPoint?.priceArea | uppercase }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class Co2ForecastComponent {
  #forecast: Co2Items = [];
  @Input()
  get forecast(): Co2Items {
    return this.#forecast;
  }
  set forecast(forecast: Co2Items | null) {
    forecast ??= [];
    this.#forecast = forecast;
  }
}

@NgModule({
  declarations: [Co2ForecastComponent],
  exports: [Co2ForecastComponent],
  imports: [CommonModule],
})
export class Co2ForecastScam {}
