import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILoginModel } from '../../../login/interfaces/login-model';
import { AuthStoreService } from './auth-store-service';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginService {
  authStoreService = inject(AuthStoreService);

  http = inject(HttpClient);
  private host = environment.apiUrl;
  private path = `${this.host}/victor/credencial/login`;

  createToken(model: ILoginModel) {
    const authNoEncode = `${model.email}:${model.password}`;

    const authEncode = btoa(authNoEncode);
    const encode = `Basic ${authEncode}`;

    return this.http
      .post(this.path, null, {
        headers: {
          Authorization: encode,
        },
      })
      .pipe(
        tap((data: any) => {
          const tokenInfo = data.data;
          this.authStoreService.setAuthToken(tokenInfo);
        }),
      );
  }
}
