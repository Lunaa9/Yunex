import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditViewVehicleComponent } from './form-edit-view-vehicle.component';

describe('FormEditViewVehicleComponent', () => {
  let component: FormEditViewVehicleComponent;
  let fixture: ComponentFixture<FormEditViewVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEditViewVehicleComponent]
    });
    fixture = TestBed.createComponent(FormEditViewVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
