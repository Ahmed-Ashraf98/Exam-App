import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenManagerService } from '../../core/services/token-manager.service';
import { baseUrl } from '../../core/environment/environment.prod';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const _TokenManagerService = inject(TokenManagerService);
  const authToken = _TokenManagerService.getToken();

  const No_Token_URLs = [
    'auth/signup',
    'auth/signin',
    'auth/forgotPassword',
    'auth/resetPassword',
    'auth/verifyResetCode',
  ];

  const isNoTokenURL = No_Token_URLs.some((url) =>
    req.url.includes(baseUrl + url)
  );
  const authReq = isNoTokenURL
    ? req
    : req.clone({
        setHeaders: {
          token: `${authToken}`,
        },
      });

  return next(authReq);
};
