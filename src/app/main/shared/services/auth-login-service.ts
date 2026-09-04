import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILoginModel } from '../../../login/interfaces/login-model';
import { AuthStoreService } from './auth-store-service';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IApiResponse } from '../interfaces/api-response';
import { IAuthTokenConfig } from '../interfaces/auth-token-config';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginService {
  private readonly authStoreService = inject(AuthStoreService);

  private readonly http = inject(HttpClient);
  private readonly path = `${environment.apiUrl}/victor/credencial/login`;

  createToken(model: ILoginModel) {
    const authorization = `Basic ${btoa(`${model.email}:${model.password}`)}`;

    return this.http
      .post<IApiResponse<IAuthTokenConfig>>(this.path, null, {
        headers: {
          Authorization: authorization,
        },
      })
      .pipe(tap(({ data }) => this.authStoreService.setAuthToken(data)));
  }
}
