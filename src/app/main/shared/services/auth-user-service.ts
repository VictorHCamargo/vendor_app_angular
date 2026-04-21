import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthStoreService } from './auth-store-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  authStoreService = inject(AuthStoreService);
  http = inject(HttpClient);
  private path = "http://localhost:3000/victor/credencial/usuario";

  getUser() {
    return this.http.get(this.path).pipe(
      tap((data : any) => {
        const userInfo = data.data;
        this.authStoreService.setAuthUser(userInfo);
      })
    )
  }
}
