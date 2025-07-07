import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddAssemblyComponent } from './form-add-assembly.component';

describe('FormAddAssemblyComponent', () => {
  let component: FormAddAssemblyComponent;
  let fixture: ComponentFixture<FormAddAssemblyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAddAssemblyComponent]
    });
    fixture = TestBed.createComponent(FormAddAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
