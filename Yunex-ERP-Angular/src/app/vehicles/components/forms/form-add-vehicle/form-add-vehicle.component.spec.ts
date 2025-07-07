import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddVehicleComponent } from './form-add-vehicle.component';

describe('FormAddVehicleComponent', () => {
  let component: FormAddVehicleComponent;
  let fixture: ComponentFixture<FormAddVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAddVehicleComponent]
    });
    fixture = TestBed.createComponent(FormAddVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
