import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient)
  private path = "http://localhost:3000/credencial/victor/"

  createToken(noEncode : string) {
    const authEncode = btoa(noEncode);
    const encode = `Basic ${authEncode}`

    return this.http.post(this.path,null,{
      headers : {
        "Authorization" : encode
      }
    })
  }
}
