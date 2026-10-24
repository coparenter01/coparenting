# 0002. State Management with NgRx SignalStore and Angular Signals

- Status: Accepted
- Date: 2026-10-22
- Related: All modules, `docs/plan/08-engineering-standards.md` §1.1

## Context
ParentPath requires fine-grained reactivity, predictable data flows, and clear architectural layering. The state management solution must support both global singletons (session, safety mode, feature flags) and scoped feature-level stores without excessive boilerplate or legacy RxJS overhead.

## Decision
1. **Feature & Global Stores:** Use `@ngrx/signals` (`signalStore`). Each feature has its own store in `data-access/<module>.store.ts` managing loading states, error states, entities, and feature-specific state transitions.
2. **Component State:** Presentational components use pure Angular Signals (`signal()`, `computed()`, `input()`, `output()`) with `ChangeDetectionStrategy.OnPush`.
3. **No Legacy State:** Redux boilerplate (`Actions`, `Reducers`, `Effects` classes) is forbidden. RxJS is reserved strictly for complex stream operations (such as debouncing search input or WebSocket streams), bridged immediately to signals via `toSignal()`.

## Consequences
- **Positive:** Type-safe, concise syntax, high performance with zoneless change detection, and clear separation between UI and data fetching.
- **Watch:** State mutations must remain immutable; side effects in stores should be encapsulated in `withMethods`.

## Alternatives considered
- **NgRx Global Store (@ngrx/store):** Rejected due to high boilerplate, action indirection, and heavy ceremony.
- **Plain Services with BehaviorSubjects:** Outdated Angular pattern; lacks structured features like computed signals, entity management, and immutability guarantees.
