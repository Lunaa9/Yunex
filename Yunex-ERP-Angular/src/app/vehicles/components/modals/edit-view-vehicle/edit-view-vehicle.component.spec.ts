import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditViewVehicleComponent } from './edit-view-vehicle.component';

describe('EditViewVehicleComponent', () => {
  let component: EditViewVehicleComponent;
  let fixture: ComponentFixture<EditViewVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditViewVehicleComponent]
    });
    fixture = TestBed.createComponent(EditViewVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
