import { Component, computed, inject, signal } from '@angular/core';
import { BaseList } from '../../../shared/class/base-list';
import { Table } from '../../../shared/components/table/table';
import { IPersonWebListConfig } from '../interfaces/person-web-config';
import { PeopleService } from '../services/people-service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TPersonModel } from '../interfaces/person-model';
import { ENTITIES_PERSON_LIST, NATURAL_PERSON_LIST } from '../tools/person-setup';
import { ITableTitle } from '../../../shared/components/table/interfaces/table-title';
import { ITableButton } from '../../../shared/components/table/interfaces/table-button';
import { Modal } from '../../../shared/components/modal/modal';
import { ModalView } from './components/modal-view/modal-view';
import { ModalDeactivate } from './components/modal-deactivate/modal-deactivate';
import { ToastService } from '../../../shared/components/toast-messages/services/toast-service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-people-list',
  imports: [Modal, ModalDeactivate, ModalView, Table, TranslatePipe],
  templateUrl: './people-list.html',
  styleUrl: './people-list.scss',
})
export class PeopleList extends BaseList<TPersonModel> {
  peopleService = inject(PeopleService);

  toastService = inject(ToastService);

  router = inject(Router);

  route = inject(ActivatedRoute);

  html!: IPersonWebListConfig;

  titles!: ITableTitle<TPersonModel>[];

  buttons!: ITableButton<TPersonModel>[];

  isOpen = computed(() => this._isOpen());

  havePerson = computed(() => this._person());

  isDeactivating = signal<boolean>(false);

  private _isOpen = signal<boolean>(false);

  private _person = signal<TPersonModel | null>(null);

  constructor() {
    super();

    this.createData();
    this.setHtmlConfig();
  }

  isNaturalPerson(): boolean {
    return this.route.snapshot.routeConfig?.path?.includes('naturalPerson') ?? false;
  }

  onClosed(): void {
    this._isOpen.set(false);
    this.isDeactivating.set(false);
  }

  openModal(model: TPersonModel, isDeactivating = false): void {
    this._isOpen.set(true);
    this.isDeactivating.set(isDeactivating);
    this._person.set(model);
  }

  onDeactivate(event: TPersonModel): void {
    if (event.id == null) {
      return;
    }

    this.peopleService.delete(event.id).subscribe({
      next: () => {
        this.reloadData();
        this.onClosed();
      },
      error: () => this.onClosed(),
    });
  }

  override onNewRegister(): void {
    if (this.isNaturalPerson()) {
      this.router.navigate(['people', 'form', 'naturalPerson']);
    } else {
      this.router.navigate(['people', 'form', 'legalPerson']);
    }
  }

  override createData(): void {
    const routeData = toSignal(this.route.data);

    this.setTitlesConfig();
    this.setButtonsConfig();

    this.dataModel.set(routeData()?.['data']);
    this.configTable = computed(() => {
      return {
        data: this.dataModel(),
        titles: this.titles,
        buttons: this.buttons,
      };
    });
  }

  override reloadData(): void {
    const personType = this.isNaturalPerson() ? 'F' : 'J';
    this.peopleService.searchByQuery(personType).subscribe((result) => {
      this.dataModel.set(result);
      this.toastService.show('MAIN.FEATURES.PEOPLE.MESSAGES.LIST_REFRESHED', 'info', 1000);
    });
  }

  private setHtmlConfig() {
    if (this.isNaturalPerson()) {
      this.html = NATURAL_PERSON_LIST;
    } else {
      this.html = ENTITIES_PERSON_LIST;
    }
  }

  private setTitlesConfig() {
    if (this.isNaturalPerson()) {
      this.titles = this.makeTitlesNaturalPerson();
    } else {
      this.titles = this.makeTitlesLegalPerson();
    }
  }

  private makeTitlesNaturalPerson(): ITableTitle<TPersonModel>[] {
    return [
      { name: 'MAIN.FEATURES.PEOPLE.NAMEF', dataField: 'name' },
      { name: 'MAIN.FEATURES.PEOPLE.NICKNAMEF', dataField: 'nickname' },
      { name: 'MAIN.FEATURES.PEOPLE.FEDERALDOCUMENTF', dataField: 'federalDocument' },
      { name: 'MAIN.FEATURES.PEOPLE.STATEDOCUMENTF', dataField: 'stateDocument' },
    ];
  }

  private makeTitlesLegalPerson(): ITableTitle<TPersonModel>[] {
    return [
      { name: 'MAIN.FEATURES.PEOPLE.NAMEJ', dataField: 'name' },
      { name: 'MAIN.FEATURES.PEOPLE.NICKNAMEJ', dataField: 'nickname' },
      { name: 'MAIN.FEATURES.PEOPLE.FEDERALDOCUMENTJ', dataField: 'federalDocument' },
      { name: 'MAIN.FEATURES.PEOPLE.STATEDOCUMENTJ', dataField: 'stateDocument' },
    ];
  }

  private setButtonsConfig() {
    if (this.isNaturalPerson()) {
      this.buttons = this.makeButtonsNaturalPerson();
    } else {
      this.buttons = this.makeButtonsLegalPerson();
    }
  }

  private makeButtonsNaturalPerson(): ITableButton<TPersonModel>[] {
    return [
      {
        name: 'COMMONS.VIEW',
        style: 'btn btn-primary',
        show: () => true,
        action: (data) => this.openModal(data),
      },
      {
        name: 'COMMONS.DEL',
        style: 'btn btn-danger',
        show: () => true,
        action: (data) => this.openModal(data, true),
      },
    ];
  }

  private makeButtonsLegalPerson(): ITableButton<TPersonModel>[] {
    return [
      {
        name: 'COMMONS.VIEW',
        style: 'btn btn-primary',
        show: () => true,
        action: (data) => this.openModal(data),
      },
      {
        name: 'COMMONS.DEL',
        style: 'btn btn-danger',
        show: () => true,
        action: (data) => this.openModal(data, true),
      },
    ];
  }
}
