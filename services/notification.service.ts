import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {NotificationEntity} from '~/entities/notification.entity';

declare module 'vue/types/vue' {
  interface Vue {
    $notificationService: NotificationService
  }
}

// @ts-ignore
export default ({ app }, inject) => {
  inject('notificationService', new NotificationService())
}

export class NotificationService {

  private notifications: NotificationEntity[] = [];
  private _show: BehaviorSubject<NotificationEntity[]>;
  private _hide: Subject<NotificationEntity>;

  constructor() {
    this._show = new BehaviorSubject<NotificationEntity[]>(this.notifications);
    this._hide = new Subject<NotificationEntity>();
  }

  public show(notification: NotificationEntity): void {
    const previous = this.notifications.find(n => n.tag === notification.tag);
    if (previous) {
      this.hide(previous);
    }
    this.notifications.push(notification);
    this._show.next([notification]);
  }

  public hideTag(tag: string): void {
    const n = this.notifications.find(n => n.tag === tag);
    if (n) {
      this.hide(n);
    }
  }

  public hide(notification: NotificationEntity): void {
    const i = this.notifications.indexOf(notification);
    if (i === -1) return;
    this.notifications.splice(i);
    this._hide.next(notification);
  }

  get onShow(): Observable<NotificationEntity[]> {
    return this._show.asObservable();
  }

  get onHide(): Observable<NotificationEntity> {
    return this._hide.asObservable();
  }

}
