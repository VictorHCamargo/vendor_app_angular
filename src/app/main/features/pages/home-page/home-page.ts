import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStoreService } from '../../../shared/services/auth-store-service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  imports: [TranslatePipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  authStoreService = inject(AuthStoreService);
  router = inject(Router);

  onNavigate(path: string, subPath?: string) {
    this.router.navigate([path, subPath]);
  }

  get username() {
    return this.authStoreService.getUser().nomecredencial;
  }
}
