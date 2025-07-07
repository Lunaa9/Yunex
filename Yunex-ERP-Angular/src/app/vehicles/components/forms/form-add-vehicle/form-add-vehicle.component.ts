import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/vehicles/services/vehicle.service';
import { Vehicle } from 'src/app/interfaces/vehicles/vehicle.interface';
import { VehicleDataService } from 'src/app/vehicles/services/Data.service';

@Component({
  selector: 'app-form-add-vehicle',
  templateUrl: './form-add-vehicle.component.html',
  styleUrls: ['./form-add-vehicle.component.css']
})
export class FormAddVehicleComponent {
  vehicleForm: FormGroup;
  brands: string[] = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan','Hyundai'];
  vehicleClasses: string[] = ['Camioneta','grua'];
  fuelTypes: string[] = ['Diesel','Corriente','No aplica']
  constructor(private fb: FormBuilder, private vehicleService: VehicleService, private vehicleDataService: VehicleDataService) {
    this.vehicleForm = this.fb.group({
      licensePlate: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}\d{3}$/)]],
      owner: ['', Validators.required],
      transitLicense: ['', Validators.required],
      brand: ['', Validators.required],
      modelLine: ['', Validators.required],
      vehicleClass: ['', Validators.required],
      yearModel: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      vinNumber: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      engineNumber: ['', Validators.required],
      mileage: [null, Validators.required],
      fuelType: ['', Validators.required],
      transitAuthority: ['', Validators.required],
      mandatoryInsurance: this.fb.group({
        number: ['', Validators.required],
        issuanceDate: ['', Validators.required],
        expirationDate: ['', Validators.required]
      }, { validator: this.dateRangeValidator('issuanceDate', 'expirationDate') }),
      comprehensiveInsurance: this.fb.group({
        number: ['', Validators.required],
        issuanceDate: ['', Validators.required],
        expirationDate: ['', Validators.required]
      }, { validator: this.dateRangeValidator('issuanceDate', 'expirationDate') }),
      mechanicalReview: this.fb.group({
        number: ['', Validators.required],
        issuanceDate: ['', Validators.required],
        expirationDate: ['', Validators.required]
      }, { validator: this.dateRangeValidator('issuanceDate', 'expirationDate') }),
      articulatedBoomReview: this.fb.group({
        number: ['', Validators.required],
        issuanceDate: ['', Validators.required],
        expirationDate: ['', Validators.required]
      }, { validator: this.dateRangeValidator('issuanceDate', 'expirationDate') })
    });
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      const vehicleData: Vehicle = this.vehicleForm.value;
      this.vehicleService.createVehicle(vehicleData).subscribe(
        response => {
          if (response) {
            console.log('Vehicle created successfully');
            this.vehicleDataService.addVehicle(vehicleData);
            window.location.reload();
          } else {
            console.error('Failed to create vehicle');
          }
        },
        error => {
          console.error('Error creating vehicle:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  dateRangeValidator(startKey: string, endKey: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const start = formGroup.get(startKey)?.value;
      const end = formGroup.get(endKey)?.value;

      if (start && end && new Date(start) > new Date(end)) {
        return { dateRangeInvalid: true };
      }
      return null;
    };
  }
}
