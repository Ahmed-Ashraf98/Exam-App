import { Observable } from 'rxjs';

export abstract class QuestionsAPIs {
  abstract addQuestion(data: any): Observable<any>;
  abstract getAllQuestions(): Observable<any>;
  abstract getAllQuestionsOnExam(examId: string): Observable<any>;
  abstract getQuestionById(questionId: string): Observable<any>;
  abstract getUserHistory(): Observable<any>;
  abstract checkQuestions(data: any): Observable<any>;
}
