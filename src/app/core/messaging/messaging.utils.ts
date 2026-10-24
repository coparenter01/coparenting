import type { ToneFeedback } from './messaging.types';

const HOSTILE_KEYWORDS = [
  'idiot',
  'stupid',
  'hate you',
  'liar',
  'scumbag',
  'threat',
  'pay for this',
  'destroy you',
  'pathetic',
];

const ELEVATED_KEYWORDS = [
  'always',
  'never',
  'your fault',
  'you failed',
  'unacceptable',
  'blame',
  'ridiculous',
  'refuse',
];

export function analyzeToneLocally(text: string): ToneFeedback {
  const lower = text.toLowerCase();
  const flaggedPhrases: string[] = [];

  for (const word of HOSTILE_KEYWORDS) {
    if (lower.includes(word)) {
      flaggedPhrases.push(word);
    }
  }

  if (flaggedPhrases.length > 0) {
    return {
      score: 'hostile',
      isSafeToSend: false,
      flaggedPhrases,
      suggestions: [
        'This message contains aggressive or threatening words that could be used in court.',
        'Consider stepping away for 10 minutes before sending.',
        'Keep communications factual and focused strictly on the children.',
      ],
      rewrites: [
        'Regarding the children, here are the details for the upcoming schedule: ' +
          text.slice(0, 30),
      ],
    };
  }

  for (const word of ELEVATED_KEYWORDS) {
    if (lower.includes(word)) {
      flaggedPhrases.push(word);
    }
  }

  if (flaggedPhrases.length > 0) {
    return {
      score: 'elevated',
      isSafeToSend: true,
      flaggedPhrases,
      suggestions: [
        'Absolute statements like "always" or "never" often provoke defensive replies.',
        'Try focusing on the specific event rather than past patterns.',
      ],
      rewrites: ['Could we please confirm the arrangement for tomorrow? ' + text.slice(0, 30)],
    };
  }

  return {
    score: 'calm',
    isSafeToSend: true,
    flaggedPhrases: [],
    suggestions: ['Tone is calm, neutral, and clear.'],
    rewrites: [],
  };
}

export function formatMessagePreview(body: string, isHeld: boolean): string {
  if (isHeld) {
    return 'Message held — open thread to see why';
  }
  if (body.length > 60) {
    return body.slice(0, 57) + '...';
  }
  return body;
}

export function generateThreadExportText(
  subject: string,
  messages: { sender: string; time: string; body: string }[],
): string {
  const header = `PARENTPATH CERTIFIED THREAD EXPORT\nSubject: ${subject}\nGenerated: ${new Date().toISOString()}\nTotal Messages: ${String(messages.length)}\n----------------------------------------\n`;
  const body = messages
    .map((m) => `[${m.time}] ${m.sender}:\n${m.body}\n`)
    .join('\n----------------------------------------\n');
  return header + body;
}
