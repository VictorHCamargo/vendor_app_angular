import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { PeopleService } from "../services/people-service";
import { map } from "rxjs";

export const peopleDataResolverList : ResolveFn<any> = (route,state) => {
    const peopleService = inject(PeopleService);

    const isNaturalPerson = (route.routeConfig?.path?.includes('naturalPerson') ? 'F' : 'J') == 'F';

    if(isNaturalPerson) {
        return peopleService.searchByQuery("F");
    } else {
        return peopleService.searchByQuery("J");
    }
}