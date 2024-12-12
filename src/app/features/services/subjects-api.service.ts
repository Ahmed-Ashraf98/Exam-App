import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';

import { RequestNames } from '../../core/enums/RequestNames';
import { ErrorResponse } from '../../core/interface/error-response';
import { SubjectsEndpoint } from '../../core/enums/API.endpoint';
import { SubjectsAPIs } from '../../core/base/SubjectsAPIs';
import { APIAdapter } from '../../core/adapter/api-adapter';

@Injectable({
  providedIn: 'root',
})
export class SubjectsAPIService implements SubjectsAPIs {
  // Inject Services
  private readonly _HttpClient = inject(HttpClient);
  // Initalize the object with adapter
  constructor(private readonly _APIAdapter: APIAdapter) {}

  addSubject(data: any): Observable<any> {
    return this._HttpClient.post(SubjectsEndpoint.Subjects, data).pipe(
      map((res: any) => this._APIAdapter.adapt(res, RequestNames.Add_Subject)),
      catchError((err: ErrorResponse) => of(err))
    );
  }

  getAllSubjects(page?: number, limit?: number): Observable<any> {
    return this._HttpClient
      .get(
        SubjectsEndpoint.Subjects +
          `${page ? '?page=' + page : ''}${limit ? '&limit=' + limit : ''}`
      )
      .pipe(
        map((res: any) =>
          this._APIAdapter.adapt(res, RequestNames.Get_All_Subjects)
        ),
        catchError((err: ErrorResponse) => of(err))
      );
  }
  getSubjectById(subjectId: string): Observable<any> {
    return this._HttpClient
      .get(SubjectsEndpoint.Subjects + `/${subjectId}`)
      .pipe(
        map((res: any) =>
          this._APIAdapter.adapt(res, RequestNames.Get_Subject_By_Id)
        ),
        catchError((err: ErrorResponse) => of(err))
      );
  }
  updateSubject(subjectId: string, data: any): Observable<any> {
    return this._HttpClient
      .put(SubjectsEndpoint.Subjects + `/${subjectId}`, data)
      .pipe(
        map((res: any) =>
          this._APIAdapter.adapt(res, RequestNames.Update_Subject)
        ),
        catchError((err: ErrorResponse) => of(err))
      );
  }
  deleteSubject(subjectId: string): Observable<any> {
    return this._HttpClient
      .delete(SubjectsEndpoint.Subjects + `/${subjectId}`)
      .pipe(
        map((res: any) =>
          this._APIAdapter.adapt(res, RequestNames.Delete_Subject)
        ),
        catchError((err: ErrorResponse) => of(err))
      );
  }
}
