import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthStoreService } from './auth-store-service';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IApiResponse } from '../interfaces/api-response';
import { IAuthUserConfig } from '../interfaces/auth-user-config';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private readonly authStoreService = inject(AuthStoreService);
  private readonly http = inject(HttpClient);
  private readonly path = `${environment.apiUrl}/victor/credencial/usuario`;

  getUser() {
    return this.http
      .get<IApiResponse<IAuthUserConfig>>(this.path)
      .pipe(tap(({ data }) => this.authStoreService.setAuthUser(data)));
  }
}
