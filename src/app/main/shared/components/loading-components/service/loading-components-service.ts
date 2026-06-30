import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoadingComponentsService {
  private _isLoading = signal<boolean>(false);
  private router = inject(Router);

  isLoading = computed(() => this._isLoading());

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe({
      next: (value) => {
        if (value instanceof NavigationStart) {
          this.start();
        }
        if (value instanceof NavigationEnd || value instanceof NavigationError) {
          this.end();
        }
      },
    });
  }

  private start() {
    this._isLoading.set(true);
  }

  private end() {
    this._isLoading.set(false);
  }
}
