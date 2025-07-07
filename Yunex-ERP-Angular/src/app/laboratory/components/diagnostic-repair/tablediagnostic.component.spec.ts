import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablediagnosticComponent } from './tablediagnostic.component';

describe('TableComponent', () => {
  let component: TablediagnosticComponent;
  let fixture: ComponentFixture<TablediagnosticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablediagnosticComponent]
    });
    fixture = TestBed.createComponent(TablediagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
