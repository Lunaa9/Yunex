import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabUsersComponent } from './lab-users.component';

describe('LabUsersComponent', () => {
  let component: LabUsersComponent;
  let fixture: ComponentFixture<LabUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabUsersComponent]
    });
    fixture = TestBed.createComponent(LabUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
