import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionsAPIService } from '../../../../features/services/questions-api.service';
import { PrimaryButtonComponent } from '../../ui/primary-button/primary-button.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChartModule } from 'primeng/chart';
import { ExamWrongAnswersReportModalComponent } from '../exam-wrong-answers-report-modal/exam-wrong-answers-report-modal.component';
import { ExamResultModalComponent } from '../exam-result-modal/exam-result-modal.component';

@Component({
  selector: 'app-exam-modal',
  standalone: true,
  imports: [
    RadioButtonModule,
    PrimaryButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    ChartModule,
    ExamWrongAnswersReportModalComponent,
    ExamResultModalComponent,
  ],
  templateUrl: './exam-modal.component.html',
  styleUrl: './exam-modal.component.scss',
})
export class ExamModalComponent {
  // Data Passed To Exam Model Element
  @Input() examId: string = '';
  @Input() numOfQuestions: number = 0;
  @Input() duration: number = 0;
  // Data Passed From Exam Model Element
  @Output() modalController = new EventEmitter<string>();
  // List Of All Questions
  questionsList: any = [];
  //Manage Exam View
  showExam: boolean = true;
  showChartResult: boolean = false;
  showWrongAnswers: boolean = false;
  displayExamTime: any;
  questionsSteps: number[] = [];
  currentQuetionIndex = 0;
  //Manage Answers
  answeredQNsList: any = [];
  wrongQNsList: any = [];
  numberOfCorrectAnswers: number = 0;
  // Manage Exam Form
  qn_title: string = '';
  qn_Obj: any = [];
  qn_answersList: any = [];
  qn_correctAnswer = '';
  qn_history_list: boolean[] = [];
  qn_Form!: FormGroup;
  // Flags
  isNextBtnDisabled = true;
  isPrevBtnDisabled = true; // init the btn as disabled becase no prev question before question 1

  // inject service
  private readonly _QuestionsAPIService = inject(QuestionsAPIService);

  // =========================== View Control Utilities ===============
  enableNextBtn() {
    this.isNextBtnDisabled = false;
  }

  disableNextBtn() {
    this.isNextBtnDisabled = true;
  }

  enablePrevBtn() {
    this.isPrevBtnDisabled = false;
  }

  disablePrevBtn() {
    this.isPrevBtnDisabled = true;
  }
  // ==================================================================

  saveAnswerdQN(qn_obj: any, userAnswer: string) {
    let answerIsCorrect = userAnswer === qn_obj.correct;
    qn_obj.userAnswer = userAnswer;
    qn_obj.isCorrect = answerIsCorrect;
    this.updateCorrectAnswerCount(answerIsCorrect ? 1 : 0);
    this.answeredQNsList[this.currentQuetionIndex] = qn_obj;
  }

  updateCorrectAnswerCount(num: number) {
    this.numberOfCorrectAnswers += num;
  }

  resetQNForm() {
    this.qn_title = '';
    this.qn_Obj = [];
    this.qn_answersList = [];
    this.qn_correctAnswer = '';
    this.qn_Form.controls['selectedAnswer'].setValue('');
  }

  saveQNIndexInHistory(index: number) {
    this.qn_history_list[index] = true;
  }

  isAnsweredBefore(index: number) {
    return this.qn_history_list[index] === true;
  }

  getQuestionObject(index: number, isAsnwered: boolean) {
    if (!isAsnwered) {
      return this.questionsList[index];
    }
    return this.answeredQNsList[index];
  }

  getNextQN() {
    let theAnswer = this.qn_Form.value.selectedAnswer;
    console.log(theAnswer);

    let q_obj =
      'questionObj' in this.qn_Obj ? this.qn_Obj.questionObj : this.qn_Obj;
    // Save Current Question
    this.saveAnswerdQN(q_obj, theAnswer);
    this.saveQNIndexInHistory(this.currentQuetionIndex);
    console.log(this.answeredQNsList);

    // Go To Next Question
    this.currentQuetionIndex++;
    // Check if we reached to the end of exam or not
    if (this.currentQuetionIndex === this.questionsList.length) {
      //TODO: end of exam so now show result
      console.log('You reached to the end of the exam');
      console.log('All answered questions ');
      console.log('Number of correct ansers = ' + this.numberOfCorrectAnswers);
      this.getAllWrongAnswers();
      this.displayChartReport();
      return;
    }

    // Set the Question in Form
    this.setQuestionInForm(this.currentQuetionIndex);
    // Disable Next Button If Not Answered Before
    if (!this.isAnsweredBefore(this.currentQuetionIndex)) {
      this.disableNextBtn();
    }

    // If we are not in Question NO.1, then we can click on back button
    if (this.currentQuetionIndex === 1) {
      this.enablePrevBtn();
    }
  }

  getPrevQN() {
    this.currentQuetionIndex--;
    this.setQuestionInForm(this.currentQuetionIndex);
    // If we are in Question NO.1, then we can't click on back button
    if (this.currentQuetionIndex === 0) {
      this.disablePrevBtn();
    }
  }

  generateArrFromNum(num: number) {
    return [...Array(num).keys()];
  }

  onOptionChange(event: any) {
    // key: 'A1' ==> index =0
    this.enableNextBtn();
    //will get the selected answer value : {answer: 'Hyperlinks and Text Markup Language', key: 'A1'}
    console.log(event);
  }

  startExamTimer() {
    let seconds: number = this.duration * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = this.duration < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.displayExamTime = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished');
        clearInterval(timer);
        this.closeExamPoup();
      }
    }, 1000);
  }

  setQuestionInForm(indexOfQN: number) {
    this.resetQNForm();

    const isAnsweredBefore = this.isAnsweredBefore(indexOfQN);
    this.qn_Obj = this.getQuestionObject(indexOfQN, isAnsweredBefore);

    this.qn_title = this.qn_Obj.question;
    this.qn_correctAnswer = this.qn_Obj.correct;
    this.qn_answersList = [...this.qn_Obj.answers];

    // if this answered before, then set the selected answer
    isAnsweredBefore &&
      this.qn_Form.controls['selectedAnswer'].setValue(this.qn_Obj.userAnswer);
  }

  initExam() {
    this.setQuestionInForm(0); // start with first question number
  }

  getAllquestions() {
    return this._QuestionsAPIService
      .getAllQuestionsOnExam(this.examId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.questionsList = res.questions;
          this.questionsSteps = this.generateArrFromNum(
            this.questionsList.length
          );
          this.initExam();
        },
      });
  }

  //=============================================== Global ====================================

  resetShowActions() {
    this.showWrongAnswers = false;
    this.showChartResult = false;
    this.showExam = false;
  }

  closeExamPoup() {
    this.resetShowActions();
    this.modalController.emit('close');
  }

  displayChartReport() {
    this.resetShowActions();

    this.showChartResult = true;
  }

  displayWrongAnswers() {
    this.resetShowActions();
    this.showWrongAnswers = true;
  }

  getAllWrongAnswers() {
    this.wrongQNsList = this.answeredQNsList.filter((qn: any) => !qn.isCorrect);
    console.log('All Wrong Answers');
    console.log(this.wrongQNsList);
  }
  // ============================ Life Cycle Hooks ===================
  ngOnInit(): void {
    this.qn_Form = new FormGroup({
      selectedAnswer: new FormControl(),
    });
    this.startExamTimer();
    this.getAllquestions();
  }
}
