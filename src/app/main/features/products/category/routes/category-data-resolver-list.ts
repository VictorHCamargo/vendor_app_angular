import { inject } from "@angular/core"
import { ResolveFn } from "@angular/router"
import { CategoryService } from "../services/category-service"

export const categoryDataResolverList : ResolveFn<any> = (route,_state) => {
    const categoryService = inject(CategoryService);

    return categoryService.search();
}