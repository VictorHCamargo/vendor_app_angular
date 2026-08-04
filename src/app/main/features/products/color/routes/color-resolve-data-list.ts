import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ColorService } from '../services/color-service';

export const colorResolveDataList: ResolveFn<any> = (_route, _state) => {
  const colorService = inject(ColorService);

  return colorService.search();
};
