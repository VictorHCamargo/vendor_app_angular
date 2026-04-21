import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILoginModel } from '../../../login/interfaces/login-model';
import { AuthStoreService } from './auth-store-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginService {
  authStoreService = inject(AuthStoreService);

  http = inject(HttpClient);
  private path = "http://localhost:3000/victor/credencial/login";

  createToken(model : ILoginModel) {
    const authNoEncode = `${model.email}:${model.password}`;

    const authEncode = btoa(authNoEncode);
    const encode = `Basic ${authEncode}`

    return this.http.post(this.path,null,{
      headers : {
        "Authorization" : encode
      }
    }).pipe(
      tap((data : any) => {
        const tokenInfo = data.data;
        this.authStoreService.setAuthToken(tokenInfo);
      })
    );
  }
}
