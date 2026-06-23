import { Component, computed, input, output, signal } from '@angular/core';
import { IAddressModel, TTypeAddress } from '../../../interfaces/address-model';
import { BaseList } from '../../../../../shared/class/base-list';
import { Table } from '../../../../../shared/components/table/table';
import { IAddressEvent } from '../../../interfaces/address-event';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-address-list',
  imports: [Table,TranslatePipe],
  templateUrl: './address-list.html',
  styleUrl: './address-list.scss',
})
export class AddressList extends BaseList<IAddressModel> {
  addresses = input.required<IAddressModel[]>();

  onCreate = output<boolean>();

  onEdit = output<IAddressEvent>();

  onDel = output<IAddressEvent>();

  constructor() {
    super();
    this.createData();
  }

  override createData(): void {
    this.configTable = computed(() => {
      return {
        data: this.addresses(),
        titles: [
          {
            name: 'MAIN.FEATURES.ADDRESSES.TYPEADDRESS',
            dataField: 'typeAddress',
            transform: (value: TTypeAddress) =>
              ({
                M: 'bi bi-house-door',
                C: 'bi bi-building',
                E: 'bi bi-truck',
              })[value] ?? 'bi bi-geo-alt',
          },
          { dataField: 'zipCode', name: 'MAIN.FEATURES.ADDRESSES.ZIPCODE' },
          { dataField: 'city', name: 'MAIN.FEATURES.ADDRESSES.CITY' },
          { dataField: 'state', name: 'MAIN.FEATURES.ADDRESSES.STATE' },
          { dataField: 'neighborhood', name: 'MAIN.FEATURES.ADDRESSES.NEIGHBORHOOD' },
          { dataField: 'street', name: 'MAIN.FEATURES.ADDRESSES.STREET' },
          { dataField: 'number', name: 'MAIN.FEATURES.ADDRESSES.NUMBER' },
        ],
        buttons: [
          {
            action: (data, index) => {
              this.onDel.emit({ address: data, index });
            },
            name: 'COMMONS.DEL',
            show: () => true,
            style: 'btn btn-danger',
          },
          {
            action: (data, index) => {
              this.onEdit.emit({ address: data, index });
            },
            name: 'COMMONS.EDIT',
            show: () => true,
            style: 'btn btn-primary',
          },
        ],
      };
    });
  }

  override onNewRegister(): void {
    this.onCreate.emit(true);
  }
}
