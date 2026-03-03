import { ResolveFn, Router } from "@angular/router";
import { GroupService } from "../services/group-service";
import { inject } from "@angular/core";
import { EMPTY } from "rxjs";

export const groupDataResolverForm : ResolveFn<any> = (route,_state) => {
    const groupService = inject(GroupService);
    const router = inject(Router);
    
    const id = route.paramMap.get('id');

    if(id) {
        return groupService.searchId(id);
    } else {
        router.navigateByUrl("/group/form");
        return EMPTY;
    }
}