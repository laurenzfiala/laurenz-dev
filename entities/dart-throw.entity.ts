import {DartThrowDto} from '~/dtos/dart-throw.dto';

export class DartThrow {
  private _id!: number | null;
  private _playerName!: string;
  private _modifier!: undefined | 'D' | 'T';
  private _field!: undefined | number | 'BULL' | 'MISS';
  // TODO change to dartfield

  constructor(_playerName: string, modifier?: undefined | 'D' | 'T', field?: number | 'BULL' | 'MISS') {
    this._playerName = _playerName;
    if (this.isAllowed(modifier, field)) {
      this._modifier = modifier;
      this._field = field;
    }
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

  get done(): boolean {
    return this._field !== undefined;
  }

  set modifier(modifier: undefined | 'D' | 'T') {
    if (this.isAllowed(modifier, this._field)) {
      this._modifier = modifier;
    }
  }
  get modifier(): undefined | 'D' | 'T' {
    return this._modifier;
  }

  set field(field: undefined | number | 'BULL' | 'MISS') {
    if (this.isAllowed(this._modifier, field)) {
      this._field = field;
    }
  }
  get field(): undefined | number | 'BULL' | 'MISS' {
    return this._field;
  }

  get id(): number | null {
    return this._id;
  }
  set id(value: number | null) {
    this._id = value;
  }
  get playerName(): string {
    return this._playerName;
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

  public toggleModifier(modifier: undefined | 'D' | 'T'): void {
    if (this._modifier === modifier) {
      this._modifier = undefined;
    } else {
      this._modifier = modifier;
    }
  }

  public clear(): void {
    this._modifier = undefined;
    this._field = undefined;
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

  toDto(): DartThrowDto {
    return {
      action: 'throw',
      key: undefined,
      id: this.id,
      player_name: this.playerName,
      field: this.field,
      modifier: this.modifier
    };
  }

  public static fromDto(dto: DartThrowDto): DartThrow {
    let thr = new DartThrow(dto.player_name);
    thr.id = dto.id;
    thr.field = dto.field;
    thr.modifier = dto.modifier;
    return thr;
  }
}
