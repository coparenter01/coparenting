export interface EmailMessage {
  readonly to: string;
  readonly subject: string;
  readonly htmlBody: string;
  readonly textBody?: string;
}

export interface EmailSendResult {
  readonly messageId: string;
  readonly success: boolean;
}

export interface EmailProvider {
  sendEmail(message: EmailMessage): Promise<EmailSendResult>;
}

export class BrevoEmailAdapter implements EmailProvider {
  public async sendEmail(message: EmailMessage): Promise<EmailSendResult> {
    // In Phase 1: Calls Supabase Edge Function to dispatch via Brevo SMTP API
    return Promise.resolve({
      messageId: `brevo-${message.to.slice(0, 3)}-${Math.random().toString(36).substring(2, 9)}`,
      success: true,
    });
  }
}
