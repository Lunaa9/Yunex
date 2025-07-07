import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairModuleComponent } from './repair-module.component';

describe('RepairModuleComponent', () => {
  let component: RepairModuleComponent;
  let fixture: ComponentFixture<RepairModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepairModuleComponent]
    });
    fixture = TestBed.createComponent(RepairModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
