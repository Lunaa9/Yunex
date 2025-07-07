import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddModuleComponent } from './form-add-module.component';

describe('FormAddModuleComponent', () => {
  let component: FormAddModuleComponent;
  let fixture: ComponentFixture<FormAddModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAddModuleComponent]
    });
    fixture = TestBed.createComponent(FormAddModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
