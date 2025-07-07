import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOutModuleComponent } from './form-out-module.component';

describe('FormOutModuleComponent', () => {
  let component: FormOutModuleComponent;
  let fixture: ComponentFixture<FormOutModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormOutModuleComponent]
    });
    fixture = TestBed.createComponent(FormOutModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
