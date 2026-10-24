export interface PushPayload {
  readonly title: string;
  readonly body: string;
  readonly url?: string;
}

export interface PushProvider {
  requestPermission(): Promise<NotificationPermission>;
  subscribeUser(): Promise<PushSubscription | null>;
}

export class WebPushAdapter implements PushProvider {
  public async requestPermission(): Promise<NotificationPermission> {
    if (typeof Notification === 'undefined') {
      return Promise.resolve('denied');
    }
    return Notification.requestPermission();
  }

  public async subscribeUser(): Promise<PushSubscription | null> {
    // In Phase 4: service worker registration and VAPID key exchange
    return Promise.resolve(null);
  }
}
