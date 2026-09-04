import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { beforeEach } from 'vitest';

@Component({ template: '' })
class TestRouteComponent {}

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      provideRouter([{ component: TestRouteComponent, path: 'unauthorized' }]),
      provideTranslateService({
        fallbackLang: 'pt-BR',
        lang: 'pt-BR',
      }),
    ],
  });
});
