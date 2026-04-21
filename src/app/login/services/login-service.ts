import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILoginModel } from '../interfaces/login-model';
import { map, Observable, switchMap } from 'rxjs';
import { AuthLoginService } from '../../main/shared/services/auth-login-service';
import { AuthStoreService } from '../../main/shared/services/auth-store-service';
import { AuthUserService } from '../../main/shared/services/auth-user-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  authLoginService = inject(AuthLoginService);
  authStoreService = inject(AuthStoreService);
  authUserService = inject(AuthUserService);
  login(model : ILoginModel) : Observable<boolean> {
    return this.authLoginService.createToken(model).pipe(
      switchMap(() => {
        return this.authUserService.getUser();
      }),
      map((_)=> {
        return this.authStoreService.isLogged();
      })
    )
  }

  
}
