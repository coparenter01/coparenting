import type {
  AgencyPaymentItem,
  AppPaymentItem,
  ChildSupportCase,
  HearingPacketData,
  PaymentMatchRow,
} from './child-support.types';

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;
const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

export function isCaseDataStale(lastSyncedAt: string, nowMs = Date.now()): boolean {
  const syncMs = new Date(lastSyncedAt).getTime();
  return nowMs - syncMs > TWO_DAYS_MS;
}

export function formatCentsToUsd(cents: number): string {
  const isNegative = cents < 0;
  const absCents = Math.abs(cents);
  const dollars = Math.floor(absCents / 100);
  const remainder = absCents % 100;
  const formattedDollars = dollars.toLocaleString('en-US');
  const formattedCents = remainder < 10 ? `0${String(remainder)}` : String(remainder);
  const formatted = `$${formattedDollars}.${formattedCents}`;
  return isNegative ? `-${formatted}` : formatted;
}

export function generateVerificationRecordId(): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const getChunk = (): string => {
    let chunk = '';
    for (let i = 0; i < 4; i += 1) {
      const idx = Math.floor(Math.random() * chars.length);
      chunk += chars.charAt(idx);
    }
    return chunk;
  };
  return `${getChunk()}-${getChunk()}-${getChunk()}-${getChunk()}`;
}

function matchPaymentsHelper(
  unmatchedAgency: AgencyPaymentItem[],
  app: AppPaymentItem,
  appMs: number,
): { matchIdx: number; status: 'matched' | 'amounts_differ' } {
  let matchIdx = -1;
  let status: 'matched' | 'amounts_differ' = 'matched';

  for (let i = 0; i < unmatchedAgency.length; i += 1) {
    const ag = unmatchedAgency[i];
    if (!ag) continue;
    const agMs = new Date(ag.paymentDate).getTime();
    if (Math.abs(appMs - agMs) <= FIVE_DAYS_MS) {
      if (ag.amountCents === app.amountCents) {
        matchIdx = i;
        status = 'matched';
        break;
      } else if (matchIdx === -1) {
        matchIdx = i;
        status = 'amounts_differ';
      }
    }
  }
  return { matchIdx, status };
}

export function matchAgencyAndAppPayments(
  agencyPayments: readonly AgencyPaymentItem[],
  appPayments: readonly AppPaymentItem[],
): PaymentMatchRow[] {
  const rows: PaymentMatchRow[] = [];
  const unmatchedAgency = [...agencyPayments];

  for (const app of appPayments) {
    const appMs = new Date(app.paymentDate).getTime();
    const { matchIdx, status } = matchPaymentsHelper(unmatchedAgency, app, appMs);

    if (matchIdx >= 0) {
      const matched = unmatchedAgency[matchIdx];
      if (matched) {
        rows.push({
          matchId: `match-${matched.paymentId}-${app.paymentId}`,
          date: app.paymentDate,
          agencyAmountCents: matched.amountCents,
          appAmountCents: app.amountCents,
          status,
          flagDismissed: false,
          dismissedReason: null,
        });
        unmatchedAgency.splice(matchIdx, 1);
      }
    } else {
      rows.push({
        matchId: `app-only-${app.paymentId}`,
        date: app.paymentDate,
        agencyAmountCents: null,
        appAmountCents: app.amountCents,
        status: 'not_on_agency',
        flagDismissed: false,
        dismissedReason: null,
      });
    }
  }

  for (const ag of unmatchedAgency) {
    rows.push({
      matchId: `agency-only-${ag.paymentId}`,
      date: ag.paymentDate,
      agencyAmountCents: ag.amountCents,
      appAmountCents: null,
      status: 'not_recorded',
      flagDismissed: false,
      dismissedReason: null,
    });
  }

  return rows.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function buildHearingPacket(
  cssCase: ChildSupportCase,
  complianceStatus = 'Current & Substantially Compliant',
): HearingPacketData {
  return {
    caseNumber: cssCase.agencyCaseNumber,
    state: cssCase.state,
    monthlyOrderFormatted: formatCentsToUsd(cssCase.monthlyOrderCents),
    arrearsFormatted: formatCentsToUsd(cssCase.arrearsBalanceCents),
    balanceOwedFormatted: formatCentsToUsd(cssCase.balanceOwedCents),
    nextHearingFormatted: cssCase.nextHearingDate
      ? new Date(cssCase.nextHearingDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'None scheduled',
    complianceStatus,
    verificationRecordId: generateVerificationRecordId(),
    generatedAt: new Date().toISOString(),
  };
}
