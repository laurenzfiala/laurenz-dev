/**
 * A typed version of Angulars' {@link SimpleChange}.
 */
interface ComponentChange<T> {
  previousValue: T;
  currentValue: T;
  firstChange: boolean;

  isFirstChange(): boolean;
}

/**
 * Provides typed access to the Angulars' {@link SimpleChanges}.
 * @typeParam Component - type of your component
 */
export type ComponentChanges<Component> = { [key in keyof Component]: ComponentChange<Component> };
