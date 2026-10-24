export type PaymentStatus = 'initiated' | 'processing' | 'completed' | 'failed' | 'reversed';

export interface PaymentRequest {
  readonly amount: number;
  readonly currency: 'USD';
  readonly recipientId: string;
  readonly description: string;
  readonly expenseId?: string;
}

export interface PaymentTransaction {
  readonly id: string;
  readonly status: PaymentStatus;
  readonly amount: number;
  readonly fee: number;
  readonly createdAt: string;
}

export interface PaymentProvider {
  processPayment(request: PaymentRequest): Promise<PaymentTransaction>;
  getTransactionStatus(transactionId: string): Promise<PaymentTransaction | null>;
}

export class PaymentSimulatorAdapter implements PaymentProvider {
  private readonly _transactions = new Map<string, PaymentTransaction>();

  public async processPayment(request: PaymentRequest): Promise<PaymentTransaction> {
    const tx: PaymentTransaction = {
      id: `tx-${Math.random().toString(36).substring(2, 9)}`,
      status: 'completed',
      amount: request.amount,
      fee: 0,
      createdAt: new Date().toISOString(),
    };
    this._transactions.set(tx.id, tx);
    return Promise.resolve(tx);
  }

  public async getTransactionStatus(transactionId: string): Promise<PaymentTransaction | null> {
    return Promise.resolve(this._transactions.get(transactionId) ?? null);
  }
}
