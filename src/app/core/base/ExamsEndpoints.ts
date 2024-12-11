import { Observable } from 'rxjs';

export abstract class ExamsEndpoints {
  abstract addExam(data: any): Observable<any>;
  abstract getAllExams(): Observable<any>;
  abstract getAllExamsOnSubject(queryParam: string): Observable<any>;
  abstract getExamById(examId: string): Observable<any>;
}
