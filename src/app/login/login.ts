import { Component, inject, signal } from '@angular/core';
import { ILoginModel } from './interfaces/login-model';
import { form, Field, required, minLength } from '@angular/forms/signals';
import { LoginService } from './services/login-service';
import { Router } from '@angular/router';
import { ToastService } from '../main/shared/components/toast-messages/services/toast-service';
import { BaseForms } from '../main/shared/class/base-form';
import { ErrorMessages } from '../main/shared/components/error-messages/error-messages';

@Component({
  selector: 'app-login',
  imports: [Field, ErrorMessages],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login extends BaseForms<ILoginModel> {
  loginService = inject(LoginService);
  router = inject(Router);
  toastService = inject(ToastService);

  constructor() {
    super()
    this.createForm(
      {
        email : "",
        password : ""
      },
      (Path) => {
        required(Path.email,{message : "O campo email é obrigatório"})
        required(Path.password,{message : "O campo senha é obrigatório"})
        minLength(Path.password,6,{message : "O campo senha precisa ter no mínimo 6 letras"})
      }
    )
  }

  onSign() {
    const authNoEncode = `${this.model().email}:${this.model().password}`;

    const results = this.loginService.createToken(authNoEncode);

    results.subscribe({
      next: (_value) => {
        this.toastService.show("Usuario autorizado!",'success',1500);
        this.router.navigate(["group","list"]);
      }
    })
  }
}
