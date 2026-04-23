/**
 * Mark a state that is unexpected. If this state is still encountered, an error is thrown.
 * This function will never return normally.
 * @param msg (optional) message to add to the error
 */
export function bug(msg?: string): never {
  throw new Error(msg ?? 'unexpected state encountered');
}
