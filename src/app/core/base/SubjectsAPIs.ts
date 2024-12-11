import { Observable } from 'rxjs';

export abstract class SubjectsAPIs {
  abstract addSubject(data: any): Observable<any>;
  abstract getAllSubjects(): Observable<any>;
  abstract getSubjectById(subjectId: string): Observable<any>;
  abstract updateSubject(subjectId: string, data: any): Observable<any>;
  abstract deleteSubject(subjectId: string): Observable<any>;
}
