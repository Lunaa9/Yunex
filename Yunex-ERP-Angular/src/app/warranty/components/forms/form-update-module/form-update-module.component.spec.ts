import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateModuleComponent } from './form-update-module.component';

describe('FormUpdateModuleComponent', () => {
  let component: FormUpdateModuleComponent;
  let fixture: ComponentFixture<FormUpdateModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUpdateModuleComponent],
    });
    fixture = TestBed.createComponent(FormUpdateModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
