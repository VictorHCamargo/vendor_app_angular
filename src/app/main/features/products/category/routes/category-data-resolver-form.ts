import { ResolveFn, Router } from '@angular/router';
import { CategoryService } from '../services/category-service';
import { inject } from '@angular/core';
import { EMPTY } from 'rxjs';

export const categoryDataResolverForm: ResolveFn<any> = (route, _state) => {
  const categoryService = inject(CategoryService);
  const router = inject(Router);

  const id = route.paramMap.get('id');

  if (id) {
    return categoryService.searchId(id);
  } else {
    router.navigateByUrl('/category/form');
    return EMPTY;
  }
};
