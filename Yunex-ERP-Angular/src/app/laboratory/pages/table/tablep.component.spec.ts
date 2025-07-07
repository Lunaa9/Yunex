import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponentP } from './tablep.component';

describe('TableComponent', () => {
  let component: TableComponentP;
  let fixture: ComponentFixture<TableComponentP>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponentP]
    });
    fixture = TestBed.createComponent(TableComponentP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
