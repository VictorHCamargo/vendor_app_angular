import { Component, computed, effect, inject, signal } from '@angular/core';
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
  toastService = inject(ToastService);
  router = inject(Router);

  atLogin = signal<boolean>(false);

  showPassword = signal<boolean>(false);

  private _isLogged = signal<boolean>(false);

  isLogged = computed(
    () => this._isLogged()
  )

  constructor() {
    super();
    this.createForm(
      {
        email: '',
        password: '',
      },
      (Path) => {
        required(Path.email, { message: 'O campo email é obrigatório' });
        required(Path.password, { message: 'O campo senha é obrigatório' });
        minLength(Path.password, 6, { message: 'O campo senha precisa ter no mínimo 6 letras' });
      },
    );

    effect(
      () => {
        const isLogged = this.loginService.verifyCredentials();
        this._isLogged.set(isLogged())
      }
    )
  }

  onSign() {
    const results = this.loginService.login(this.model());
    this.atLogin.set(true);
    results.subscribe({
      next: (_value) => {
        this.toastService.show('Usuario autorizado!', 'success', 1500);
        this.atLogin.set(false);
        this.router.navigate(['home']);
      },
      error: (_error) => {
        this.toastService.show('Dados incorretos', 'danger', 3000);
        this.atLogin.set(false);
      },
    });
  }

  onLogin() {
    this.router.navigate(['home']);
  }

}
