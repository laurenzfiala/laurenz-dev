export class PropWrapper<T> {
  _value: T | undefined;

  constructor(value?: T) {
    this._value = value;
  }

  set value(value: T) {
    this._value = value;
  }

  get value(): T {
    return this._value as T;
  }
}
