import { inject, Injectable } from '@angular/core';
import { ExamsAPIs } from '../../core/base/ExamsAPIs';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExamsEndpoint } from '../../core/enums/API.endpoint';
import { APIAdapter } from '../../core/adapter/api-adapter';
import { RequestNames } from '../../core/enums/RequestNames';
import { ErrorResponse } from '../../core/interface/error-response';

@Injectable({
  providedIn: 'root',
})
export class ExamsAPIService implements ExamsAPIs {
  // Inject Services
  private readonly _HttpClient = inject(HttpClient);
  // Initalize the object with adapter
  constructor(private readonly _APIAdapter: APIAdapter) {}

  addExam(data: any): Observable<any> {
    return this._HttpClient.post(ExamsEndpoint.Exams, data).pipe(
      map((res: any) => this._APIAdapter.adapt(res, RequestNames.Add_Exam)),
      catchError((err: ErrorResponse) => of(err))
    );
  }
  getAllExams(): Observable<any> {
    return this._HttpClient.get(ExamsEndpoint.Exams).pipe(
      map((res: any) =>
        this._APIAdapter.adapt(res, RequestNames.Get_All_Exams)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }
  getAllExamsOnSubject(subjectId: string): Observable<any> {
    return this._HttpClient
      .get(ExamsEndpoint.Exams + `?subject=${subjectId}`)
      .pipe(
        map((res: any) =>
          this._APIAdapter.adapt(res, RequestNames.Get_All_Exams_By_Subject)
        ),
        catchError((err: ErrorResponse) => of(err))
      );
  }
  getExamById(examId: string): Observable<any> {
    return this._HttpClient.get(ExamsEndpoint.Exams + `/${examId}`).pipe(
      map((res: any) =>
        this._APIAdapter.adapt(res, RequestNames.Get_Exam_By_Id)
      ),
      catchError((err: ErrorResponse) => of(err))
    );
  }
}
