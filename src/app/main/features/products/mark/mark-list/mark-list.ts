import { Component, computed, inject, signal } from '@angular/core';
import { BaseList } from '../../../../shared/class/base-list';
import { IMarkModel } from '../interfaces/mark-model';
import { TranslatePipe } from '@ngx-translate/core';
import { Table } from '../../../../shared/components/table/table';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Modal } from '../../../../shared/components/modal/modal';
import { ModalDelete } from './modal-delete/modal-delete';
import { MarkService } from '../services/mark-service';
import { ToastService } from '../../../../shared/components/toast-messages/services/toast-service';

@Component({
  selector: 'app-mark-list',
  imports: [TranslatePipe, Table, Modal, ModalDelete],
  templateUrl: './mark-list.html',
  styleUrl: './mark-list.scss',
})
export class MarkList extends BaseList<IMarkModel> {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private markService = inject(MarkService);
  private toastService = inject(ToastService);

  private _openModal = signal<boolean>(false);

  openModal = computed(() => this._openModal());

  markModal = signal<IMarkModel | null>(null);

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
              this.router.navigate(['mark', 'form', data.id]);
            },
            style: 'btn btn-primary',
          },
          {
            name: 'COMMONS.DELE',
            show: () => true,
            action: (data) => {
              this._openModal.set(true);
              this.markModal.set(data!);
            },
            style: 'btn btn-danger',
          },
        ],
        titles: [
          {
            name: 'MAIN.FEATURES.MARK.',
            dataField: 'name',
          },
        ],
      };
    });
  }

  override reloadData(): void {
    this.toastService.show('As informacoes foram atualizadas', 'info');
    this.markService.search().subscribe((value) => this.dataModel.set(value as IMarkModel[]));
  }

  override onNewRegister(): void {
    this.router.navigate(['mark', 'form']);
  }

  onClosed() {
    this._openModal.set(false);
  }

  onDelete(event: IMarkModel) {
    this.markService.delete(event.id!).subscribe({
      next: () => {
        this.reloadData();
        this.toastService.show('Marca deletada com sucesso', 'success');
        this.onClosed();
      },
      error: () => {
        this.toastService.show('Nao e possivel deletar marca vinculada a empresas', 'danger');
        this.onClosed();
      },
    });
  }
}
