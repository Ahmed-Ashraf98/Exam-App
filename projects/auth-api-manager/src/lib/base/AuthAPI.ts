import { Observable } from 'rxjs';
import { LoginReq } from '../interfaces/login';
import { RegisterReq } from '../interfaces/register';

export abstract class AuthAPI {
  abstract login(data: LoginReq): Observable<any>;
  abstract register(data: RegisterReq): Observable<any>;
}
