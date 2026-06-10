import { Component } from '@angular/core';
import { BaseList } from '../../../shared/class/base-list';
import { IAddressModel } from '../interfaces/address-model';
import { Table } from '../../../shared/components/table/table';
import { IPersonWebListConfig } from '../interfaces/person-web-config';

@Component({
  selector: 'app-people-list',
  imports: [Table],
  templateUrl: './people-list.html',
  styleUrl: './people-list.scss',
})
export class PeopleList extends BaseList<IAddressModel>{
  html! : IPersonWebListConfig;

  setHtmlConfig() {
    
  }
}
