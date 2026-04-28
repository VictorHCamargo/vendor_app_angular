import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroupModel } from '../interfaces/group-model';
import { toSignal } from '@angular/core/rxjs-interop';
import { GroupService } from '../services/group-service';
import { Table } from '../../../../shared/components/table/table';
import { BaseList } from '../../../../shared/class/base-list';
import { ToastService } from '../../../../shared/components/toast-messages/services/toast-service';

@Component({
  selector: 'app-group-list',
  imports: [Table],
  templateUrl: './group-list.html',
  styleUrl: './group-list.scss',
})
export class GroupList extends BaseList<IGroupModel> {
  router = inject(Router);
  route = inject(ActivatedRoute);
  groupService = inject(GroupService);
  toastService = inject(ToastService);

  constructor() {
    super();
    this.createData();
  }

  override createData() {
    const routeData = toSignal(this.route.data);

    this.dataModel.set(routeData()?.['data']);
    this.configTable = computed(() => {
      return {
        data: this.dataModel(),
        buttons: [
          {
            name: 'Excluir',
            show: () => {
              return true;
            },
            action: (data) => {
              this.groupService.delete(data.id!).subscribe({
                next: (_) => {
                  this.reloadData();
                  this.toastService.show('Categoria deletada com sucesso', 'success', 2000);
                },
                error: (_) => {
                  this.toastService.show(
                    'Não é permitido deletar categorias vinculadas a empresas',
                    'danger',
                    2000,
                  );
                },
              });
            },
            style: 'btn btn-danger',
          },
          {
            name: 'Editar',
            show: () => {
              return true;
            },
            action: (data) => {
              this.router.navigate(['group', 'form', `${data.id}`]);
            },
            style: 'btn btn-primary',
          },
        ],
        titles: [
          {
            name: 'Grupo de Produtos',
            dataField: 'name',
          },
        ],
      };
    });
  }

  override reloadData() {
    this.toastService.show('As informações foram atualizadas', 'info', 1000);
    this.groupService.search().subscribe((result) => {
      this.dataModel.set(result as IGroupModel[]);
    });
  }

  override onNewRegister() {
    this.toastService.show('Indo para o cadastro dos grupos', 'info', 1000);
    this.router.navigate(['group', 'form']);
  }
}
