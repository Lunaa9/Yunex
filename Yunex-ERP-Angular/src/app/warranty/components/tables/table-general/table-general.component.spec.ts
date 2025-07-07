import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGeneralComponent } from './table-general.component';

describe('TableGeneralComponent', () => {
  let component: TableGeneralComponent;
  let fixture: ComponentFixture<TableGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableGeneralComponent]
    });
    fixture = TestBed.createComponent(TableGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
