import { Component, Input } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { ExamModalComponent } from '../../business/exam-modal/exam-modal.component';
import { QuestionsModalComponent } from '../../business/questions-modal/questions-modal.component';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    ExamModalComponent,
    QuestionsModalComponent,
    CustomModalComponent,
  ],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss',
})
export class QuizCardComponent {
  @Input() title: string = '';
  @Input() numOfQuestions: number = 0;
  @Input() id: number = 0;
  @Input() duration: number = 0;

  showModal: boolean = false;

  startExam() {
    this.showModal = true;
  }
}
