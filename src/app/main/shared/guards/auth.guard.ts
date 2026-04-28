import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStoreService } from '../services/auth-store-service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const authStoreService = inject(AuthStoreService);
  const route = inject(Router);

  if (!authStoreService.isLogged()) {
    route.navigate(['unauthorized']);
    return false;
  } else {
    return true;
  }
};
