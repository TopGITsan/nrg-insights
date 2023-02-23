# Event Driven Architectures ( EDA )

This library was generated with [Nx](https://nx.dev).

This library is from [Cobiro](https://github.com/Cobiro/eda).

## Strategies
In events handler you can use different various of strategy to orchestrate events.

- **ongoingEventsOrchestrationStrategy**  - it's default strategy will orchestrate events one by one
- **allEventsOnceOrchestrationStrategy** - orchestrate all the events at the same time
- **zipEventsOrchestrationStrategy** - after all events are dispatched
