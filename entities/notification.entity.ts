
export class NotificationEntity {
  private _element: HTMLElement | undefined;
  private _tag!: string;
  private _title!: string;
  private _details: string | undefined;
  private _severity: Severity;
  public style: string = '';

  constructor(tag: string, title: string, severity: Severity = Severity.DEFAULT, element?: HTMLElement) {
    this._tag = tag;
    this._title = title;
    this._severity = severity;
    this._element = element;
  }

  get tag(): string {
    return this._tag;
  }

  get element(): HTMLElement | undefined {
    return this._element;
  }

  get title(): string {
    return this._title;
  }

  get details(): string | undefined {
    return this._details;
  }

  get severity(): Severity {
    return this._severity;
  }
}

export enum Severity {
  DEFAULT,
  DANGER
}
