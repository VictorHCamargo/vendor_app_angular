import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastService } from './services/toast-service';

@Component({
  selector: 'app-toast-messages',
  imports: [TranslatePipe],
  templateUrl: './toast-messages.html',
  styleUrl: './toast-messages.scss',
})
export class ToastMessages {
  toastService = inject(ToastService);
  toasts = this.toastService.toasts;

  remove(id: number) {
    this.toastService.remove(id);
  }
}
