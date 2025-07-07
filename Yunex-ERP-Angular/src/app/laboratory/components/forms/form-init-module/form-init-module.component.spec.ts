import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInitModuleComponent } from './form-init-module.component';

describe('FormInitModuleComponent', () => {
  let component: FormInitModuleComponent;
  let fixture: ComponentFixture<FormInitModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormInitModuleComponent]
    });
    fixture = TestBed.createComponent(FormInitModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
