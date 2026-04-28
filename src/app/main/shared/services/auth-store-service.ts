import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private localStorageToken = 'token';
  private localStorageExpire = 'expireIn';
  private localStorageUser = 'user';

  token = signal<string>('');
  expireAt = signal<number>(0);
  user = signal<any>({});

  isLogged = computed(() => {
    return !!this.token() && !this.isTokenExpired();
  });

  isTokenExpired = computed(() => {
    const exp = this.expireAt();

    return exp ? Date.now() > exp : true;
  });
  setAuthToken(data: any) {
    const expireAt = Date.now() + data.expiresIn * 1000;

    this.expireAt.set(expireAt);

    this.token.set(data.token);

    this.setAuthTokenLocalStorage();
  }

  private setAuthTokenLocalStorage() {
    localStorage.setItem(this.localStorageToken, this.token());
    localStorage.setItem(this.localStorageExpire, `${this.expireAt()}`);
  }

  getAuthTokenLocalStorage() {
    const number = localStorage.getItem(this.localStorageExpire);
    this.expireAt.set(number ? Number(number) : Date.now());
    this.token.set(localStorage.getItem(this.localStorageToken) ?? '');

    const rawUser = localStorage.getItem(this.localStorageUser);
    this.user.set(rawUser ? JSON.parse(rawUser) : {});
  }

  setAuthUser(data: any) {
    this.user.set(data);
    localStorage.setItem(this.localStorageUser, JSON.stringify(data));
  }

  getUser() {
    return this.user();
  }

  getToken() {
    return this.token();
  }
}
