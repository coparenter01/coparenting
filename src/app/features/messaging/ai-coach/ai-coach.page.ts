import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pp-ai-coach-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-coach.page.html',
  styleUrls: ['./ai-coach.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiCoachPage {
  public userQuestion = '';
  public readonly coachAnswer = signal<{ title: string; advice: string } | null>(null);

  public selectPrompt(prompt: string): void {
    this.userQuestion = prompt;
    this.askCoach();
  }

  public askCoach(): void {
    const q = this.userQuestion.toLowerCase();
    if (q.includes('swap') || q.includes('schedule')) {
      this.coachAnswer.set({
        title: 'Schedule Swap Recommendation',
        advice:
          'Propose the swap with specific dates, times, and offer a clear makeup day in return. Keep your request brief, polite, and frame it around what works best for the child without discussing personal reasons.',
      });
    } else if (q.includes('accusation') || q.includes('angry')) {
      this.coachAnswer.set({
        title: 'De-escalating Accusations (BIFF Method)',
        advice:
          'Use the BIFF approach: Brief, Informative, Friendly, and Firm. Acknowledge only factual matters regarding the child. Do not defend, counter-accuse, or debate opinions. If no action is needed, a simple "Thank you for letting me know" is court-ready.',
      });
    } else {
      this.coachAnswer.set({
        title: 'Child-Focused Communication Guideline',
        advice:
          'Focus strictly on logistics: date, time, location, and the child’s wellbeing. Avoid bringing up past disagreements, adjectives that assign blame, or emotional speculation.',
      });
    }
  }
}
