import { Component, Input } from '@angular/core';
import { VehicleService } from '../../../services/vehicle.service';
import { VehicleFileService } from '../../../services/vehicle-file.service'; 
import { Vehicle } from 'src/app/interfaces/vehicles/vehicle.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-add-document',
  templateUrl: './form-add-document.component.html',
  styleUrls: ['./form-add-document.component.css']
})
export class FormAddDocumentComponent {
  @Input() selectedLicensePlate: string | null = null;
  @Input() isLicensePlateDisabled: boolean = false;
  vehicle: string = '';
  selectedFile: File | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  vehicleList: Vehicle[] = [];
  selectedVehicle: Vehicle | null = null;
  vehiclesAvailable: boolean = false;
  vehicleCache: { [licensePlate: string]: Vehicle } = {};
  isFormVisible: boolean = true;
  @Input() documentCategory: string | null = null;
  constructor(
    private vehicleService: VehicleService,
    private vehicleFileService: VehicleFileService 
  ) {
    this.loadAllVehicles();
  }

  loadAllVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe(
      (data: Vehicle[] | false) => {
        if (data) {
          this.vehicleList = data;
          this.vehiclesAvailable = this.vehicleList.length > 0;
          this.vehicleList.forEach(vehicle => {
            this.vehicleCache[vehicle.licensePlate] = vehicle;
          });
          if (this.selectedLicensePlate && this.selectedLicensePlate in this.vehicleCache) {
            this.selectedVehicle = this.vehicleCache[this.selectedLicensePlate];
            this.vehicle = this.selectedLicensePlate; // Esto asigna la placa a 'vehicle'
          }
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.error = 'Error loading vehicles';
      }
    );
  }

  viewDetails(): void {
    if (this.vehicle in this.vehicleCache) {
      this.selectedVehicle = this.vehicleCache[this.vehicle];
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  handleSubmit(): void {
    if (this.selectedVehicle && this.selectedFile) {
      // Obtener la fecha actual y formatearla para el nombre del archivo
      const currentDate = new Date();
      const timestamp = currentDate.getFullYear().toString() +
                        (currentDate.getMonth() + 1).toString().padStart(2, '0') +
                        currentDate.getDate().toString().padStart(2, '0') +
                        currentDate.getHours().toString().padStart(2, '0') +
                        currentDate.getMinutes().toString().padStart(2, '0') +
                        currentDate.getSeconds().toString().padStart(2, '0');      
      const fileName = this.documentCategory 
      ? `${this.documentCategory}_${timestamp}`
      : `file_${timestamp}`;
                        
      const renamedFile = new File([this.selectedFile], fileName, { type: this.selectedFile.type });
                  
      this.isLoading = true;
      this.vehicleFileService.addFileToVehicle(this.selectedVehicle.licensePlate, renamedFile, this.documentCategory ?? 'general').subscribe(
        success => {
          if (success) {
            console.log('Lifesheet added successfully');
            this.closeForm();
          } else {
            this.error = 'Failed to add lifesheet';
          }
          this.isLoading = false;
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding lifesheet:', error);
          this.error = 'Error adding lifesheet';
          this.isLoading = false;
        }
      );
    } else {
      console.log('Please select a vehicle and a file before submitting.');
    }
  }
  
  
  
  

  closeForm(): void {
    this.isFormVisible = false; 
  }

  trackByVehicle(index: number, item: Vehicle): string {
    return item.licensePlate;
  }
}
