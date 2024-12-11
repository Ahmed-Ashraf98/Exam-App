import { Observable } from 'rxjs';

export abstract class ExamsAPIs {
  abstract addExam(data: any): Observable<any>;
  abstract getAllExams(): Observable<any>;
  abstract getAllExamsOnSubject(subjectId: string): Observable<any>;
  abstract getExamById(examId: string): Observable<any>;
}
