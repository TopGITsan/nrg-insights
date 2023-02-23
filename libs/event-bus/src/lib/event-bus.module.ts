import { NgModule, ModuleWithProviders } from '@angular/core';
import { TokenBasedApplicationEventHandlerRegistry } from './token-based-application-event-handler.registry';
import { EVENT_BUS, SubjectBasedApplicationEventBus } from './event.bus';
@NgModule({
  providers: [TokenBasedApplicationEventHandlerRegistry],
})
export class EventBusModule {
  static forRoot(): ModuleWithProviders<EventBusModule> {
    return {
      ngModule: EventBusModule,
      providers: [
        {
          provide: EVENT_BUS,
          useClass: SubjectBasedApplicationEventBus,
        },
      ],
    };
  }
}
