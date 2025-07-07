import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSecurityComponent } from './add-security.component';

describe('AddSecurityComponent', () => {
  let component: AddSecurityComponent;
  let fixture: ComponentFixture<AddSecurityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSecurityComponent]
    });
    fixture = TestBed.createComponent(AddSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
