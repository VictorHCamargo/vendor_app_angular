import { Component, computed, inject } from '@angular/core';
import { BaseList } from '../../../../shared/class/base-list';
import { IColorModel } from '../interfaces/color-model';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from '../../../../shared/components/table/table';
import { TranslatePipe } from '@ngx-translate/core';
import { ColorService } from '../services/color-service';
import { ToastService } from '../../../../shared/components/toast-messages/services/toast-service';

@Component({
  selector: 'app-color-list',
  imports: [Table, TranslatePipe],
  templateUrl: './color-list.html',
  styleUrl: './color-list.scss',
})
export class ColorList extends BaseList<IColorModel> {
  colorService = inject(ColorService);
  toastService = inject(ToastService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    super();
    this.createData();
  }

  override createData(): void {
    const routeData = toSignal(this.route.data);

    const data = routeData()?.['data'];

    this.dataModel.set(data);

    this.configTable = computed(() => {
      return {
        data: this.dataModel(),
        buttons: [
          {
            name: 'COMMONS.EDIT',
            show: () => true,
            action: (data) => {
              this.router.navigate(['color', 'form', data.id]);
            },
            style: 'btn btn-primary',
          },
          {
            name: 'COMMONS.DELE',
            show: () => true,
            action: (data) => {
              this.colorService.delete(data.id!).subscribe({
                next: (_) => {
                  this.reloadData();
                  this.toastService.show('Cor deletada com sucesso', 'success', 2000);
                },
                error: (_) => {
                  this.toastService.show(
                    'Não é permitido deletar cores vinculadas a empresas',
                    'danger',
                    2000,
                  );
                },
              });
            },
            style: 'btn btn-danger',
          },
        ],
        titles: [
          {
            name: 'MAIN.FEATURES.COLOR.HEX',
            dataField: 'hexadecimal',
            transform: {
              type: 'make',
              function: (value: string) => {
                const spanConfig = `$class,d-inline-block rounded$style,width: 20px; height: 20px; background-color: ${value};$value,${value}`;

                return spanConfig;
              },
            },
          },
          {
            name: 'MAIN.FEATURES.COLOR.ACTIVE',
            dataField: 'active',
            transform: {
              type: 'active',
              function: (value: boolean) => {
                return value;
              },
            },
          },
        ],
      };
    });
  }

  override reloadData(): void {
    this.toastService.show('Os dados foram atualizados!', 'info');
    this.colorService.search().subscribe((value) => {
      this.dataModel.set(value as IColorModel[]);
    });
  }

  override onNewRegister(): void {
    this.router.navigate(['color', 'form']);
  }
}
