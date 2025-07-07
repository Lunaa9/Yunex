import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditUserComponent } from './form-edit-user.component';

describe('FormInitModuleComponent', () => {
  let component: FormEditUserComponent;
  let fixture: ComponentFixture<FormEditUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEditUserComponent]
    });
    fixture = TestBed.createComponent(FormEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 
