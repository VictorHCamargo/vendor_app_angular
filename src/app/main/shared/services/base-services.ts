import { inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

export abstract class BaseServices<MODEL, DTO> {
  protected readonly http = inject(HttpClient);
  protected readonly router = inject(Router);
  protected readonly host = environment.apiUrl;

  abstract readonly endPoint: string;

  public processObservable<T>(request: Observable<T>): Observable<T> {
    return request.pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          void this.router.navigate(['unauthorized']);
        }

        return throwError(() => error);
      }),
    );
  }

  mapDto(_model: MODEL): DTO {
    throw new Error('A conversão do modelo deve ser implementada pelo serviço.');
  }
}
