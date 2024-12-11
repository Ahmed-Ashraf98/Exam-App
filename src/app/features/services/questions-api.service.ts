import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { APIAdapter } from '../../core/adapter/api-adapter';
import { RequestNames } from '../../core/enums/RequestNames';
import { ErrorResponse } from '../../core/interface/error-response';
import { QuestionsEndpoint } from '../../core/enums/API.endpoint';
import { QuestionsAPIs } from '../../core/base/QuestionsAPIs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsAPIService implements QuestionsAPIs {
  // Inject Services
  private readonly _HttpClient = inject(HttpClient);
  // Initalize the object with adapter
  constructor(private readonly _APIAdapter: APIAdapter) {}

  addQuestion(data: any): Observable<any> {
    return this._HttpClient.post(QuestionsEndpoint.Questions, data).pipe(
      map((res: any) => this._APIAdapter.adapt(res, RequestNames.Add_Question)),
      catchError((err: ErrorResponse) => of(err))
    );
  }
  getAllQuestions(): Observable<any> {
    return this._HttpClient.get(QuestionsEndpoint.Questions).pipe(
      map((res: any) =>
        this._APIAdapter.adapt(res, RequestNames.Get_All_Questions)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }
  getAllQuestionsOnExam(examId: string): Observable<any> {
    return this._HttpClient
      .get(QuestionsEndpoint.Questions + `?exam=${examId}`)
      .pipe(
        map((res: any) =>
          this._APIAdapter.adapt(res, RequestNames.Get_All_Questions_By_Exam)
        ),
        catchError((err: ErrorResponse) => of(err))
      );
  }
  getQuestionById(questionId: string): Observable<any> {
    return this._HttpClient
      .get(QuestionsEndpoint.Questions + `/${questionId}`)
      .pipe(
        map((res: any) =>
          this._APIAdapter.adapt(res, RequestNames.Get_Question_By_Id)
        ),
        catchError((err: ErrorResponse) => of(err))
      );
  }

  getUserHistory(): Observable<any> {
    return this._HttpClient.get(QuestionsEndpoint.Questions_History).pipe(
      map((res: any) =>
        this._APIAdapter.adapt(res, RequestNames.Get_User_History)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }

  checkQuestions(data: any): Observable<any> {
    return this._HttpClient.post(QuestionsEndpoint.Questions_Checks, data).pipe(
      map((res: any) =>
        this._APIAdapter.adapt(res, RequestNames.Check_Questions)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }
}
