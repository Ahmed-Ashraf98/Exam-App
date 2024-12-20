import { Component, Input, OnInit } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-exam-wrong-answers-report-modal',
  standalone: true,
  imports: [RadioButtonModule, ReactiveFormsModule, FormsModule, ChartModule],
  templateUrl: './exam-wrong-answers-report-modal.component.html',
  styleUrl: './exam-wrong-answers-report-modal.component.scss',
})
export class ExamWrongAnswersReportModalComponent implements OnInit {
  @Input() wrongQNsList: any = [];

  // ============================ Summary Utilities ====================
  qn_Form!: FormGroup;
  answersFields: any = {};

  /** Radio Button Option be like
   * Let's assume that the Question Number is 1
   * A1--> answer_q1_1
   * A2--> answer_q1_1
   * A3--> answer_q1_1
   * A4--> answer_q1_1
   */

  /** Check Button Option be like
   *  Let's assume that the Question Number is 4
   * A1--> answer_q4_1
   * A2--> answer_q4_2
   * A3--> answer_q4_3
   * A4--> answer_q4_4
   */

  generateAnswerOptions() {
    let wrongQNsList = this.wrongQNsList;
    for (let i = 0; i < wrongQNsList.length; i++) {
      if (wrongQNsList[i].type === 'single_choice') {
        this.answersFields['answer_q' + wrongQNsList[i]._id + '_' + 1] =
          new FormControl({
            value: wrongQNsList[i].userAnswer,
            disabled: true,
          });
      } else {
        for (let j = 0; j < wrongQNsList[i].answers.length; j++) {
          this.answersFields['answer_q' + wrongQNsList[i]._id + '_' + (j + 1)] =
            new FormControl({
              value: wrongQNsList[i].userAnswer,
              disabled: true,
            });
        }
      }
    }
    console.log(this.answersFields);
  }

  generatWronQNForm() {
    this.generateAnswerOptions();
    this.qn_Form = new FormGroup({
      ...this.answersFields,
    });
    console.log(this.qn_Form);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  }

  ngOnInit(): void {
    this.generatWronQNForm();
  }
}
