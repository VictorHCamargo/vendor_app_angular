import { Component, inject } from '@angular/core';
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
  private readonly authStoreService = inject(AuthStoreService);
  private readonly router = inject(Router);

  onNavigate(path: string): void {
    void this.router.navigateByUrl(path);
  }

  get username(): string {
    const user = this.authStoreService.getUser();
    return user.nomecredencial ?? '';
  }
}
