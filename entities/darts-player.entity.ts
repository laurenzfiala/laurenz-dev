import {DartThrow} from '~/entities/dart-throw.entity';

export interface DartsPlayer {
  name(): string;
  score(): number;
  throws(): DartThrow[];
  displayThrows(): DartThrow[];
}

export abstract class AbstractDartsPlayer implements DartsPlayer {
  protected _name: string;
  protected _score: number;
  protected _throws: DartThrow[] = [];

  constructor(name: string, score: number) {
    this._name = name;
    this._score = score;
  }

  throw(thr: DartThrow): void {
    this._throws.push(thr);
  }

  removeThrow(thr: DartThrow): void {
    this._throws = this._throws.filter(t => {
      if (t === thr) {
        this.modifyScore(-t.value);
        return false;
      } else {
        return true;
      }
    });
  }

  modifyScore(change: number): void {
    this._score += change;
  }

  name(): string {
    return this._name;
  }

  score(): number {
    return this._score;
  }

  throws(): DartThrow[] {
    return this._throws;
  }

  abstract displayThrows(): DartThrow[];
}
