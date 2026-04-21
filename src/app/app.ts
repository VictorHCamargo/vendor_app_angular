import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastMessages } from './main/shared/components/toast-messages/toast-messages';
import { AuthStoreService } from './main/shared/services/auth-store-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastMessages],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular');

  authStoreService = inject(AuthStoreService);

  constructor() {
    this.authStoreService.getAuthTokenLocalStorage();
  }
}
