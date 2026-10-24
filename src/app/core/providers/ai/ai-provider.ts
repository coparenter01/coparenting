export interface OcrResult {
  readonly text: string;
  readonly amount?: number;
  readonly date?: string;
  readonly merchant?: string;
}

export interface AiProvider {
  rewriteDraft(draft: string): Promise<readonly string[]>;
  readReceipt(imageBlob: Blob): Promise<OcrResult>;
}

export class OnDeviceAiAdapter implements AiProvider {
  public async rewriteDraft(draft: string): Promise<readonly string[]> {
    return Promise.resolve([
      `Please let me know if this pickup time works for you. (${draft.slice(0, 20)}...)`,
    ]);
  }

  public async readReceipt(imageBlob: Blob): Promise<OcrResult> {
    // In Phase 7: Tesseract.js worker in browser
    return Promise.resolve({
      text: `Sample receipt (${String(imageBlob.size)} bytes)`,
      amount: 45.0,
      date: new Date().toISOString().split('T')[0],
      merchant: 'Pharmacy',
    });
  }
}
