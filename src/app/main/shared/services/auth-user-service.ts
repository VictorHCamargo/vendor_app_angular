import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthStoreService } from './auth-store-service';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  authStoreService = inject(AuthStoreService);
  http = inject(HttpClient);
  private host = environment.apiUrl;
  private path = `${this.host}/victor/credencial/usuario`;

  getUser() {
    return this.http.get(this.path).pipe(
      tap((data: any) => {
        const userInfo = data.data;
        this.authStoreService.setAuthUser(userInfo);
      }),
    );
  }
}
