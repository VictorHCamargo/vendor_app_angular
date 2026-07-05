import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { ColorService } from "../services/color-service";

export const colorResolveDataList : ResolveFn<any> = (route,state) => {
  const colorService = inject(ColorService);

  return colorService.search();
}
