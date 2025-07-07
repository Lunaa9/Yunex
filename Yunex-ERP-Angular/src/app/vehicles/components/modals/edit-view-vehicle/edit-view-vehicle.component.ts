import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/interfaces/vehicles/vehicle.interface';
import { VehicleService } from 'src/app/vehicles/services/vehicle.service';

@Component({
  selector: 'app-edit-view-vehicle',
  templateUrl: './edit-view-vehicle.component.html',
  styleUrls: ['./edit-view-vehicle.component.css']
})
export class EditViewVehicleComponent {
  @Input() vehicle: Vehicle | null = null;
  @Input() action: 'view' | 'edit' | null = null;
  @Output() close = new EventEmitter<void>();
  @Input() selectedTab: string = '';
  vehicleForm: FormGroup;
  brands: string[] = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan','Hyundai'];
  vehicleClasses: string[] = ['Camioneta','grua'];
  fuelTypes: string[] = ['Diesel','Corriente','No aplica']
  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {
    this.vehicleForm = this.fb.group({
      licensePlate: ['', Validators.required],
      owner: ['', Validators.required],
      transitLicense: ['', Validators.required],
      brand: ['', Validators.required],
      modelLine: ['', Validators.required],
      vehicleClass: ['', Validators.required],
      yearModel: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['vehicle'] && this.vehicle) {
      // Verifica el formato de las fechas
      console.log('Vehicle data:', this.vehicle);
  
      // Asegúrate de que las fechas estén en formato yyyy-MM-dd
      this.vehicleForm.patchValue({
        ...this.vehicle,
        mandatoryInsurance: {
          ...this.vehicle.mandatoryInsurance,
          issuanceDate: this.formatDate(this.vehicle.mandatoryInsurance.issuanceDate),
          expirationDate: this.formatDate(this.vehicle.mandatoryInsurance.expirationDate)
        },
        comprehensiveInsurance: {
          ...this.vehicle.comprehensiveInsurance,
          issuanceDate: this.formatDate(this.vehicle.comprehensiveInsurance.issuanceDate),
          expirationDate: this.formatDate(this.vehicle.comprehensiveInsurance.expirationDate)
        },
        mechanicalReview: {
          ...this.vehicle.mechanicalReview,
          issuanceDate: this.formatDate(this.vehicle.mechanicalReview.issuanceDate),
          expirationDate: this.formatDate(this.vehicle.mechanicalReview.expirationDate)
        },
        articulatedBoomReview: {
          ...this.vehicle.articulatedBoomReview,
          issuanceDate: this.formatDate(this.vehicle.articulatedBoomReview.issuanceDate),
          expirationDate: this.formatDate(this.vehicle.articulatedBoomReview.expirationDate)
        }
      });
    }
  
    if (changes['action']) {
      if (this.action !== 'edit') {
        this.vehicleForm.disable(); // Desactiva todo el formulario si no estás en modo 'edit'
      } else {
        this.vehicleForm.enable();
        this.disableFields();  // Activa el formulario si estás en modo 'edit'
      }
    }
  }
  
  // Función para convertir Date a formato yyyy-MM-dd
  private formatDate(date: Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    // Convierte a UTC
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  onSubmit() {
    if (this.vehicleForm.valid) {
      
    const vehicleData = this.vehicleForm.value;
    console.log('Sending data:', vehicleData); // Verifica los datos enviados
    this.vehicleService.updateVehicle(vehicleData).subscribe(
      response => {
        console.log('Vehicle updated successfully:', response);
        window.location.reload();
      },
      error => {
        console.error('Error updating vehicle:', error);
      }
    );
  }
  }

  closeModal() {
    this.close.emit();
  }
  private disableFields() {
    // Deshabilita campos específicos si no estás en modo 'edit'
    this.vehicleForm.get('modelLine')?.disable();
    this.vehicleForm.get('transitLicense')?.disable();
    this.vehicleForm.get('yearModel')?.disable();
    this.vehicleForm.get('vehicleClass')?.disable();
    this.vehicleForm.get('brand')?.disable();
    // Repite esto para todos los campos que desees deshabilitar
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