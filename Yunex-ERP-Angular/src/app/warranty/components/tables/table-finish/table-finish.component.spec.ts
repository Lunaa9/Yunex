import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFinishComponent } from './table-finish.component';

describe('TableFinishComponent', () => {
  let component: TableFinishComponent;
  let fixture: ComponentFixture<TableFinishComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableFinishComponent]
    });
    fixture = TestBed.createComponent(TableFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
