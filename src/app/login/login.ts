import { Component, effect, inject, signal } from '@angular/core';
import { ILoginModel } from './interfaces/login-model';
import { Field, required, minLength } from '@angular/forms/signals';
import { LoginService } from './services/login-service';
import { Router } from '@angular/router';
import { ToastService } from '../main/shared/components/toast-messages/services/toast-service';
import { BaseForms } from '../main/shared/class/base-form';
import { ErrorMessages } from '../main/shared/components/error-messages/error-messages';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ErrorMessages, Field, TranslatePipe],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login extends BaseForms<ILoginModel> {
  loginService = inject(LoginService);
  toastService = inject(ToastService);
  router = inject(Router);

  atLogin = signal<boolean>(false);

  showPassword = signal<boolean>(false);

  constructor() {
    super();
    this.createForm(
      {
        email: '',
        password: '',
      },
      (path) => {
        required(path.email, { message: 'LOGIN.VALIDATION.EMAIL_REQUIRED' });
        required(path.password, { message: 'LOGIN.VALIDATION.PASSWORD_REQUIRED' });
        minLength(path.password, 6, { message: 'LOGIN.VALIDATION.PASSWORD_MIN_LENGTH' });
      },
    );

    effect(() => {
      const isLogged = this.loginService.verifyCredentials();
      if (isLogged()) {
        this.router.navigate(['home']);
      }
    });
  }

  onSign(): void {
    const results = this.loginService.login(this.model());
    this.atLogin.set(true);
    results.subscribe({
      next: () => {
        this.toastService.show('LOGIN.MESSAGES.AUTHENTICATED', 'success', 1500);
        this.atLogin.set(false);
        this.router.navigate(['home']);
      },
      error: () => {
        this.toastService.show('LOGIN.MESSAGES.INVALID_CREDENTIALS', 'danger', 3000);
        this.atLogin.set(false);
      },
    });
  }
}
