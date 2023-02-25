export class DartField {
  private _modifier!: undefined | 'D' | 'T';
  private _field!: number | 'BULL' | 'MISS';

  constructor(modifier: undefined | 'D' | 'T', field: number | 'BULL' | 'MISS') {
    if (!this.isAllowed(modifier, field)) {
      throw new Error('Given dart field ' + (modifier ? modifier : '') + field + ' is invalid.');
    }
    this._modifier = modifier;
    this._field = field;
  }

  get value(): number {
    let val = 0;
    if (this._field === 'BULL') {
      val = 25;
    } else if (this._field === 'MISS') {
      val = 0;
    } else if (this._field !== undefined) {
      val = this._field;
    }
    if (this._modifier === 'D') val *= 2;
    if (this._modifier === 'T') val *= 3;
    return val;
  }

  get modifier(): undefined | 'D' | 'T' {
    return this._modifier;
  }

  get field(): number | 'BULL' | 'MISS' {
    return this._field;
  }

  private isAllowed(modifier: undefined | 'D' | 'T',
                    field: undefined | number | 'BULL' | 'MISS'): boolean {
    if (field === 'MISS' && modifier !== undefined) {
      return false;
    } else if (field === 'BULL' && modifier === 'T') {
      return false;
    } else {
      return true;
    }
  }

  public toString(): string {
    return (this._modifier ? this._modifier : '') + this._field;
  }

  public fromString(input: string): boolean {
    let firstLetter = input.substr(0, 1);
    let valueStartIndex = 0;
    if (firstLetter === 'D' || firstLetter === 'T') {
      this._modifier = firstLetter;
      valueStartIndex = 1;
    }
    let field = input.substr(valueStartIndex);
    let value = Number.parseInt(field);
    if (field === 'MISS' || field === 'BULL') {
      this._field = field;
      return true;
    } else if (!isNaN(value) && Number.isInteger(value) && value >= 1 && value <= 20) {
      this._field = value;
      return true;
    }
    return false;
  }

  public static random(): DartField {
    const mL = new Array<undefined | 'D' | 'T'>(undefined, 'D', 'T');
    const fL = [];
    for (let i = 1; i <= 20; i++) fL.push(i);
    const m = mL[Math.trunc(Math.random() * (mL.length - 1))];
    const f = fL[Math.trunc(Math.random() * (fL.length - 1))];
    return new DartField(m, f);
  }

  public static randomField(): DartField {
    return new DartField(undefined, DartField.random().field);
  }

}
