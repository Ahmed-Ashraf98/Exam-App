import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionsAPIService } from '../../../../features/services/questions-api.service';
import { PrimaryButtonComponent } from '../../ui/primary-button/primary-button.component';
import { RadioButtonModule } from 'primeng/radiobutton';
@Component({
  selector: 'app-exam-modal',
  standalone: true,
  imports: [RadioButtonModule, PrimaryButtonComponent, ReactiveFormsModule],
  templateUrl: './exam-modal.component.html',
  styleUrl: './exam-modal.component.scss',
})
export class ExamModalComponent {
  // Data Passed To Exam Model Element
  @Input() examId: string = '';
  @Input() numOfQuestions: number = 0;
  @Input() duration: number = 0;
  // List Of All Questions
  questionsList: any = [];
  //Manage Exam View
  displayExamTime: any;
  questionsSteps: number[] = [];
  currentQuetionIndex = 0;
  //Manage Answers
  answeredQuestions: any = [];
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
    let fullQNData = {
      questionObj: qn_obj,
      userAnswer: userAnswer,
      isCorrect: answerIsCorrect,
    };
    this.updateCorrectAnswerCount(answerIsCorrect ? 1 : 0);
    this.answeredQuestions[this.currentQuetionIndex] = fullQNData;
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

  showRes() {
    for (let i = 0; i < this.answeredQuestions.length; i++) {
      console.log(this.answeredQuestions[i]);
    }
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
    return this.answeredQuestions[index];
  }

  getNextQN() {
    let theAnswer = this.qn_Form.value.selectedAnswer;
    console.log(theAnswer);

    let q_obj =
      'questionObj' in this.qn_Obj ? this.qn_Obj.questionObj : this.qn_Obj;
    // Save Current Question
    this.saveAnswerdQN(q_obj, theAnswer);
    this.saveQNIndexInHistory(this.currentQuetionIndex);
    console.log(this.answeredQuestions);

    // Go To Next Question
    this.currentQuetionIndex++;
    this.resetQNForm();
    // Check if we reached to the end of exam or not
    if (this.currentQuetionIndex === this.questionsList.length) {
      //TODO: end of exam so now show result
      console.log('You reached to the end of the exam');
      console.log('All answered questions ');
      this.showRes();
      console.log('Number of correct ansers = ' + this.numberOfCorrectAnswers);
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
        //TODO: Store in local storage failed and force page refresh
      }
    }, 1000);
  }

  setQuestionInForm(indexOfQN: number) {
    this.resetQNForm();

    let q_title = '';
    let q_correct = '';
    let q_answers_list = [];

    const isAnsweredBefore = this.isAnsweredBefore(indexOfQN);
    this.qn_Obj = this.getQuestionObject(indexOfQN, isAnsweredBefore);

    q_title = !isAnsweredBefore
      ? this.qn_Obj.question
      : this.qn_Obj.questionObj.question;
    q_correct = !isAnsweredBefore
      ? this.qn_Obj.correct
      : this.qn_Obj.questionObj.correct;
    q_answers_list = !isAnsweredBefore
      ? [...this.qn_Obj.answers]
      : [...this.qn_Obj.questionObj.answers];

    this.qn_title = q_title;
    this.qn_correctAnswer = q_correct;
    this.qn_answersList = q_answers_list;

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

  ngOnInit(): void {
    this.qn_Form = new FormGroup({
      selectedAnswer: new FormControl(),
    });
    this.startExamTimer();
    this.getAllquestions();
  }
}
