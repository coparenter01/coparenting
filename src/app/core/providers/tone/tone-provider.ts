export interface ToneAssessment {
  readonly score: 'calm' | 'firm' | 'elevated' | 'hostile';
  readonly suggestions: readonly string[];
  readonly flaggedPhrases: readonly string[];
}

export interface ToneProvider {
  analyzeTone(text: string): Promise<ToneAssessment>;
}

export class OnDeviceToneAdapter implements ToneProvider {
  public async analyzeTone(text: string): Promise<ToneAssessment> {
    const lower = text.toLowerCase();
    const hasElevated =
      lower.includes('never') || lower.includes('always') || lower.includes('fault');
    return Promise.resolve({
      score: hasElevated ? 'elevated' : 'calm',
      suggestions: hasElevated ? ["Focus on the child's schedule rather than past events."] : [],
      flaggedPhrases: hasElevated ? ['always/never'] : [],
    });
  }
}
