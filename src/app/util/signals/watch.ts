import { effect, Signal, untracked } from '@angular/core';

type SignalInput = Signal<unknown> | Signal<unknown>[] | (() => void);

/**
 * Run an effect when the given signal changes.
 * @param signals `fn` is called when the signal(s) change or the signals in the given function change
 * @param fn function to run on change
 */
export function watch(signals: SignalInput, fn: () => void) {
  effect(() => {
    callSignals(signals);

    untracked(() => {
      fn();
    });
  });
}

function callSignals(signals: SignalInput) {
  if (Array.isArray(signals)) {
    signals.forEach((signal) => signal());
  } else {
    signals();
  }
}
