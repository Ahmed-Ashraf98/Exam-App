import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenManagerService } from '../services/token-manager.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenManager = inject(TokenManagerService);
  const router = inject(Router);
  console.log('Hollla');
  console.log(tokenManager.getToken());
  if (tokenManager.getToken()) {
    return true;
  } else {
    router.navigate(['/auth/signin']);
    return false;
  }
};
