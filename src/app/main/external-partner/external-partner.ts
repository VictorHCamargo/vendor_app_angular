import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from '../shared/services/auth-user-service';
import { AuthStoreService } from '../shared/services/auth-store-service';
import { IAuthTokenConfig } from '../shared/interfaces/auth-token-config';

@Component({
  selector: 'app-external-partner',
  imports: [],
  templateUrl: './external-partner.html',
  styleUrl: './external-partner.scss',
})
export class ExternalPartner {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private authStoreService = inject(AuthStoreService);
  private authUserService = inject(AuthUserService);

  constructor() {
    this.processExternalRedirect();
  }

  private processExternalRedirect() {
    this.route.queryParamMap.subscribe((params) => {
      const redirectUrl = params.get('redirect');
      const exp = params.get('exp');
      const secret = params.get('secret');

      if (redirectUrl == null || secret == null || exp == null) {
        this.router.navigate(['unauthorized']);
      } else {
        const authTokenModel: IAuthTokenConfig = {
          expiresIn: Number(exp),
          token: secret,
        };

        this.authStoreService.setAuthToken(authTokenModel);

        this.authUserService.getUser().subscribe((_) => {
          this.router.navigateByUrl(redirectUrl);
        });
      }
    });
  }
}
