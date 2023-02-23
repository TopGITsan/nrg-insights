import {ErrorHandler, Inject, Injectable, Optional} from '@angular/core';
import {EVENT_BUS, EventBus} from './event.bus';
import {ApplicationEventHandler} from './application-event.handler';
import {APPLICATION_EVENT_ORCHESTRATOR_TOKEN, ApplicationEventOrchestrator} from './event-orchestrator';
import {Subscription} from 'rxjs';
import {AppEvent} from "./application.event";
import { APPLICATION_EVENT_HANDLER_TOKEN } from './application-event.token';

@Injectable()
export class TokenBasedApplicationEventHandlerRegistry {
  private _subscriptions: Subscription[] = [];
  constructor(
    @Inject(EVENT_BUS) private applicationBus: EventBus,
    @Optional()
    @Inject(APPLICATION_EVENT_HANDLER_TOKEN)
    private handlers: ApplicationEventHandler[],
    @Optional()
    @Inject(APPLICATION_EVENT_ORCHESTRATOR_TOKEN)
    private orchestrators: ApplicationEventOrchestrator[],
    private _errorHandler: ErrorHandler,
  ) {}

  // TODO (5): Add log handler
  init(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
    this._subscriptions = [];
    if (!!this.handlers && this.handlers.length) {
      this.handlers.forEach(handler =>
        this._subscriptions.push(
          this.applicationBus.on(handler.eventClass).subscribe((event:any) => {
            try {
              handler.handle(event);
            } catch (error) {
              this._errorHandler.handleError(error);
            }
          }),
        ),
      );
    }
    if (!!this.orchestrators && this.orchestrators.length) {
      this.orchestrators.forEach(orchestrator => {
        this._subscriptions.push(
          orchestrator.strategy(
            orchestrator.eventsClasses.map(eventClass => this.applicationBus.on(eventClass)),
            (events: AppEvent[]) => {
              try {
                orchestrator.orchestrate.call(orchestrator, events);
              } catch (error) {
                this._errorHandler.handleError(error);
              }
            },
          ),
        );
      });
    }
  }
}
