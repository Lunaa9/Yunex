import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitRepairModuleComponent } from './init-repair-module.component';

describe('InitRepairModuleComponent', () => {
  let component: InitRepairModuleComponent;
  let fixture: ComponentFixture<InitRepairModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitRepairModuleComponent]
    });
    fixture = TestBed.createComponent(InitRepairModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
