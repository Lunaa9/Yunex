import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddSecurityComponent } from './form-add-security.component';

describe('FormAddSecurityComponent', () => {
  let component: FormAddSecurityComponent;
  let fixture: ComponentFixture<FormAddSecurityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAddSecurityComponent]
    });
    fixture = TestBed.createComponent(FormAddSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
