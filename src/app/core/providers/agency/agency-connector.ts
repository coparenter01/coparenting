export interface AgencyCase {
  readonly caseNumber: string;
  readonly state: string;
  readonly balanceOwed: number;
  readonly lastPaymentDate: string;
  readonly lastPaymentAmount: number;
  readonly nextHearingDate?: string;
  readonly lastSyncedAt: string;
}

export interface AgencyConnector {
  linkCase(caseNumber: string, ssnLast4: string, state: string): Promise<AgencyCase>;
  getCaseSummary(caseNumber: string): Promise<AgencyCase | null>;
  triggerSync(caseNumber: string): Promise<AgencyCase>;
}

export class AgencySimulatorAdapter implements AgencyConnector {
  public async linkCase(caseNumber: string, _ssnLast4: string, state: string): Promise<AgencyCase> {
    return Promise.resolve({
      caseNumber,
      state,
      balanceOwed: 250.0,
      lastPaymentDate: new Date(Date.now() - 86400000 * 14).toISOString(),
      lastPaymentAmount: 350.0,
      nextHearingDate: new Date(Date.now() + 86400000 * 30).toISOString(),
      lastSyncedAt: new Date().toISOString(),
    });
  }

  public async getCaseSummary(caseNumber: string): Promise<AgencyCase | null> {
    return this.linkCase(caseNumber, '0000', 'VA');
  }

  public async triggerSync(caseNumber: string): Promise<AgencyCase> {
    return this.linkCase(caseNumber, '0000', 'VA');
  }
}
