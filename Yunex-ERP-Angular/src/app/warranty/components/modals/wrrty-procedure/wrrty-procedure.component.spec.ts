import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrrtyProcedureComponent } from './wrrty-procedure.component';

describe('WrrtyProcedureComponent', () => {
  let component: WrrtyProcedureComponent;
  let fixture: ComponentFixture<WrrtyProcedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WrrtyProcedureComponent]
    });
    fixture = TestBed.createComponent(WrrtyProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
