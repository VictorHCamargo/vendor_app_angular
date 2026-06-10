import { Component, computed, input, output, signal } from '@angular/core';
import { IAddressModel } from '../../../interfaces/address-model';
import { BaseList } from '../../../../../shared/class/base-list';
import { Table } from '../../../../../shared/components/table/table';
import { IAddressEvent } from '../../../interfaces/address-event';

@Component({
  selector: 'app-address-list',
  imports: [Table],
  templateUrl: './address-list.html',
  styleUrl: './address-list.scss',
})
export class AddressList extends BaseList<IAddressModel> {
  addresses = input.required<IAddressModel[]>();

  onCreate = output<boolean>();

  onEdit = output<IAddressEvent>();

  constructor() {
    super();
    this.createData();
  }

  override createData(): void {
    this.configTable = computed(() => {
      return {
        data: this.addresses(),
        titles: [
          { dataField: 'typeAddress', name: 'Tipo de Endereço' },
          { dataField: 'zipCode', name: 'CEP' },
          { dataField: 'city', name: 'Cidade' },
          { dataField: 'state', name: 'Estado' },
          { dataField: 'neighborhood', name: 'Bairro' },
          { dataField: 'street', name: 'Logradouro' },
          { dataField: 'number', name: 'Número' },
        ],
        buttons: [
          {
            action: (data, index) => {
              this.onEdit.emit({ address: data, index });
            },
            name: 'Editar',
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
