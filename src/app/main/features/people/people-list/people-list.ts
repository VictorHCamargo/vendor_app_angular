import { Component, inject } from '@angular/core';
import { BaseList } from '../../../shared/class/base-list';
import { IAddressModel } from '../interfaces/address-model';
import { Table } from '../../../shared/components/table/table';
import { IPersonWebListConfig } from '../interfaces/person-web-config';
import { PeopleService } from '../services/people-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-people-list',
  imports: [Table],
  templateUrl: './people-list.html',
  styleUrl: './people-list.scss',
})
export class PeopleList extends BaseList<IAddressModel>{
  peopleService = inject(PeopleService);
  route = inject(ActivatedRoute);

  html! : IPersonWebListConfig;

  isNaturalPerson(): boolean {
    const peopleType = this.route.snapshot.routeConfig?.path?.includes('naturalPerson') ? 'F' : 'J';
    return peopleType == 'F';
  }

  setHtmlConfig() {
    if(this.isNaturalPerson()) {
      
    }
  }
}
