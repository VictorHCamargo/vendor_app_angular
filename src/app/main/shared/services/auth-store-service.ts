import { computed, Injectable, signal } from '@angular/core';
import { IAuthTokenConfig } from '../interfaces/auth-token-config';
import { IAuthUserConfig } from '../interfaces/auth-user-config';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private readonly localStorageToken = 'token';
  private readonly localStorageExpire = 'expireIn';
  private readonly localStorageUser = 'user';

  readonly token = signal('');
  readonly expireAt = signal(0);
  readonly user = signal<IAuthUserConfig>({});

  isLogged = computed(() => {
    return !!this.token() && !this.isTokenExpired();
  });

  isTokenExpired = computed(() => {
    const exp = this.expireAt();

    return exp ? Date.now() > exp : true;
  });
  setAuthToken(data: IAuthTokenConfig): void {
    const expireAt = Date.now() + data.expiresIn * 1000;

    this.expireAt.set(expireAt);

    this.token.set(data.token);

    this.setAuthTokenLocalStorage();
  }

  private setAuthTokenLocalStorage(): void {
    localStorage.setItem(this.localStorageToken, this.token());
    localStorage.setItem(this.localStorageExpire, `${this.expireAt()}`);
  }

  getAuthTokenLocalStorage(): void {
    const number = localStorage.getItem(this.localStorageExpire);
    this.expireAt.set(number ? Number(number) : Date.now());
    this.token.set(localStorage.getItem(this.localStorageToken) ?? '');

    this.user.set(this.getStoredUser(localStorage.getItem(this.localStorageUser)));
  }

  setAuthUser(data: IAuthUserConfig): void {
    this.user.set(data);
    localStorage.setItem(this.localStorageUser, JSON.stringify(data));
  }

  getUser(): IAuthUserConfig {
    return this.user();
  }

  getToken(): string {
    return this.token();
  }

  private getStoredUser(rawUser: string | null): IAuthUserConfig {
    if (!rawUser) {
      return {};
    }

    try {
      return JSON.parse(rawUser) as IAuthUserConfig;
    } catch {
      return {};
    }
  }
}
