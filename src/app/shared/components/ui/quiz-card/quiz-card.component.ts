import { Component, Input } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [PrimaryButtonComponent],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss',
})
export class QuizCardComponent {
  @Input() title: string = '';
  @Input() numOfQuestions: number = 0;
  @Input() id: number = 0;
  @Input() duration: number = 0;
}
