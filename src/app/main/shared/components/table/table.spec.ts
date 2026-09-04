import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Table } from './table';
import { IGroupModel } from '../../../features/products/group/interfaces/group-model';

describe('Table', () => {
  let component: Table<IGroupModel>;
  let fixture: ComponentFixture<Table<IGroupModel>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Table],
    }).compileComponents();

    fixture = TestBed.createComponent(Table<IGroupModel>);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
