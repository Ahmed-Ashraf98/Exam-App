import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenManagerService } from '../services/token-manager.service';

export const loggedInUserGuard: CanActivateFn = (route, state) => {
  const tokenManager = inject(TokenManagerService);
  const router = inject(Router);

  if (!tokenManager.getToken) {
    return true;
  } else {
    router.navigate(['/main/dashboard']);
    return false;
  }
};
