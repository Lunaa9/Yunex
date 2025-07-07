import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRepairComponent } from './auth-repair.component';

describe('AuthRepairComponent', () => {
  let component: AuthRepairComponent;
  let fixture: ComponentFixture<AuthRepairComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthRepairComponent]
    });
    fixture = TestBed.createComponent(AuthRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
