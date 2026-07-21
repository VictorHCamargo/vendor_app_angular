import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BaseList } from '../../../../shared/class/base-list';
import { Modal } from '../../../../shared/components/modal/modal';
import { ProductDeleteModal } from '../../../../shared/components/product-delete-modal/product-delete-modal';
import { Table } from '../../../../shared/components/table/table';
import { ToastService } from '../../../../shared/components/toast-messages/services/toast-service';
import { IMarkModel } from '../interfaces/mark-model'; import { MarkService } from '../services/mark-service';
@Component({ selector: 'app-mark-list', imports: [TranslatePipe, Table, Modal, ProductDeleteModal], templateUrl: './mark-list.html', styleUrl: './mark-list.scss' })
export class MarkList extends BaseList<IMarkModel> {
  private route = inject(ActivatedRoute); private router = inject(Router); private service = inject(MarkService); private toast = inject(ToastService); private translate = inject(TranslateService);
  private modalOpen = signal(false); openModal = computed(() => this.modalOpen()); selected = signal<IMarkModel | null>(null);
  constructor() { super(); this.createData(); }
  override createData(): void { this.dataModel.set(toSignal(this.route.data)()?.['data']); this.configTable = computed(() => ({ data: this.dataModel(), titles: [{ name: 'MAIN.FEATURES.PRODUCT_MASTER.FIELDS.NAME', dataField: 'name' }], buttons: [{ name: 'COMMONS.EDIT', show: () => true, action: (item) => this.router.navigate(['mark', 'form', item.id]), style: 'btn btn-primary' }, { name: 'COMMONS.DELE', show: () => true, action: (item) => { this.selected.set(item); this.modalOpen.set(true); }, style: 'btn btn-danger' }] })); }
  override reloadData(): void { this.service.search().subscribe((data) => this.dataModel.set(data)); }
  override onNewRegister(): void { this.router.navigate(['mark', 'form']); }
  closeModal(): void { this.modalOpen.set(false); }
  deleteSelected(): void { const item = this.selected(); if (!item?.id) return; this.service.delete(item.id).subscribe({ next: () => { this.reloadData(); this.toast.show(this.t('DELETE.SUCCESS'), 'success'); this.closeModal(); }, error: () => { this.toast.show(this.t('DELETE.ERROR'), 'danger'); this.closeModal(); } }); }
  private t(key: string): string { return this.translate.instant(`MAIN.FEATURES.PRODUCT_MASTER.MESSAGES.${key}`, { entity: this.translate.instant('MAIN.FEATURES.PRODUCT_MASTER.ENTITIES.MARK') }); }
}
