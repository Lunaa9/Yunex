import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormForgotComponent } from './form-forgot.component';

describe('FormForgotComponent', () => {
  let component: FormForgotComponent;
  let fixture: ComponentFixture<FormForgotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormForgotComponent]
    });
    fixture = TestBed.createComponent(FormForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
