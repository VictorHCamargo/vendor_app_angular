import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ColorService } from '../services/color-service';
import { EMPTY } from 'rxjs';

export const colorResolveDataForm: ResolveFn<any> = (route, _state) => {
  const colorService = inject(ColorService);
  const router = inject(Router);
  const id = route.paramMap.get('id');
  if (id) {
    return colorService.searchId(id);
  } else {
    router.navigate(['color', 'form']);
    return EMPTY;
  }
};
