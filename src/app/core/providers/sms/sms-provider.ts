export interface SmsMessage {
  readonly to: string;
  readonly body: string;
  readonly channel?: 'sms' | 'invite' | 'alert';
}

export interface SmsSendResult {
  readonly id: string;
  readonly status: 'sent' | 'delivered' | 'failed';
  readonly sentAt: string;
}

export interface SmsProvider {
  send(message: SmsMessage): Promise<SmsSendResult>;
  getOutbox(): Promise<readonly SmsSendResult[]>;
}

export class SmsSimulatorAdapter implements SmsProvider {
  private readonly _outbox: SmsSendResult[] = [];

  public async send(message: SmsMessage): Promise<SmsSendResult> {
    const result: SmsSendResult = {
      id: `sms-${Math.random().toString(36).substring(2, 9)}`,
      status: message.to.length > 0 ? 'delivered' : 'failed',
      sentAt: new Date().toISOString(),
    };
    this._outbox.push(result);
    return Promise.resolve(result);
  }

  public async getOutbox(): Promise<readonly SmsSendResult[]> {
    return Promise.resolve([...this._outbox]);
  }
}
