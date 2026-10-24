import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import {
  AgencySimulatorAdapter,
  FeatureFlagsService,
  PaymentSimulatorAdapter,
  SafetyModeService,
  SmsSimulatorAdapter,
  SUPABASE_CLIENT,
  TimeService,
  verifiedSessionGuard,
} from './index';

describe('Core Foundation Services & Providers (0-F)', () => {
  it('TimeService should store dates as UTC and format in active time zone', () => {
    const service = new TimeService();
    const utcString = '2026-11-15T18:30:00.000Z';

    service.setTimeZone('America/New_York');
    const nyFormatted = service.formatLocal(utcString, 'datetime');
    expect(nyFormatted).toContain('Nov 15');

    service.setTimeZone('UTC');
    const utcFormatted = service.formatLocal(utcString, 'time');
    expect(utcFormatted).toContain('6:30');
  });

  it('SafetyModeService should toggle safety mode and require 6-digit code to disable', () => {
    const service = new SafetyModeService();
    expect(service.safetyModeEnabled()).toBe(false);

    service.enableSafetyMode();
    expect(service.safetyModeEnabled()).toBe(true);

    const failDisable = service.disableSafetyMode('123');
    expect(failDisable).toBe(false);
    expect(service.safetyModeEnabled()).toBe(true);

    const successDisable = service.disableSafetyMode('123456');
    expect(successDisable).toBe(true);
    expect(service.safetyModeEnabled()).toBe(false);
  });

  it('FeatureFlagsService should allow reading and patching feature flags', () => {
    const service = new FeatureFlagsService();
    expect(service.isEnabled('messaging')).toBe(true);

    service.patch({ messaging: false });
    expect(service.isEnabled('messaging')).toBe(false);
  });

  it('SmsSimulatorAdapter should send and track outgoing texts in outbox', async () => {
    const sms = new SmsSimulatorAdapter();
    const result = await sms.send({ to: '+15551234567', body: 'Test verification code: 123456' });

    expect(result.status).toBe('delivered');
    const outbox = await sms.getOutbox();
    expect(outbox.length).toBe(1);
    expect(outbox[0]?.id).toBe(result.id);
  });

  it('PaymentSimulatorAdapter should process payments at $0 fee', async () => {
    const payment = new PaymentSimulatorAdapter();
    const tx = await payment.processPayment({
      amount: 150.0,
      currency: 'USD',
      recipientId: 'parent-2',
      description: 'Medical co-pay reimbursement',
    });

    expect(tx.status).toBe('completed');
    expect(tx.fee).toBe(0);

    const fetched = await payment.getTransactionStatus(tx.id);
    expect(fetched?.amount).toBe(150.0);
  });

  it('AgencySimulatorAdapter should return simulated child support case data', async () => {
    const agency = new AgencySimulatorAdapter();
    const c = await agency.linkCase('CS-98765', '1234', 'VA');

    expect(c.caseNumber).toBe('CS-98765');
    expect(c.balanceOwed).toBe(250.0);
  });

  it('verifiedSessionGuard should execute as an Angular CanActivateFn', () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    TestBed.runInInjectionContext(() => {
      const result = verifiedSessionGuard({} as never, { url: '/household' } as never);
      expect(result).toBe(true);
    });
  });

  it('SUPABASE_CLIENT should provide a configured client instance with auth settings', () => {
    TestBed.configureTestingModule({});

    TestBed.runInInjectionContext(() => {
      const client = TestBed.inject(SUPABASE_CLIENT);
      expect(client).toBeDefined();
      expect(client.auth).toBeDefined();
    });
  });
});
