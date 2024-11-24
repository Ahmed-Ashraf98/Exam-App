import { Observable } from 'rxjs';
import { LoginReq } from '../interfaces/login';

export abstract class AuthAPI {
  abstract login(data: LoginReq): Observable<any>;
  abstract register(data: any): Observable<any>;
}
