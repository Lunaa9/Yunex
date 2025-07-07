import { Component } from '@angular/core';
import { VehicleService } from 'src/app/vehicles/services/vehicle.service';
import { Vehicle } from 'src/app/interfaces/vehicles/vehicle.interface';
import { VehicleDataService } from '../../services/Data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-table-documents',
  templateUrl: './table-documents.component.html',
  styleUrls: ['./table-documents.component.css']
})
export class TableDocumentsComponent {
  showVehicleHistory = false;  // Controla la visibilidad del historial
  selectedLicensePlate: string | null = null;
  selectedVehicle: Vehicle | null = null; 
  vehicles: Vehicle[] = []; 
  page: number = 0;
  searchText: string = '';
  selectedSecurity = '';
  constructor(private vehicleService: VehicleService) {}
  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicleService.getAllVehicles().subscribe((vehicles) => {
      if (vehicles) {
        this.vehicles = vehicles;
      }
    });
  }
  async deleteVehicle(licensePlate: string): Promise<void> {
    console.log('Licencia seleccionada:', licensePlate);
    
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción no se podrá deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, elimínalo!',
      cancelButtonText: 'Cancelar',
    });
    
    if (result.isConfirmed) {
      try {
        const response = await this.vehicleService.deleteVehicle(licensePlate);
        
        if (response) {
          Swal.fire('Eliminado!', 'El vehículo ha sido eliminado.', 'success');
          this.loadVehicles(); // Actualiza la lista de vehículos
        } else {
          Swal.fire('Algo salió mal!', 'No se pudo eliminar el vehículo.', 'error');
        }
      } catch (error) {
        console.error('Error eliminando el vehículo:', error);
        Swal.fire('Error', 'Ocurrió un error al intentar eliminar el vehículo.', 'error');
      }
    }
  }

  openVehicleHistory(licensePlate: string) {
    const vehicle = this.vehicles.find(v => v.licensePlate === licensePlate); 
    if (vehicle) {
      this.selectedVehicle = vehicle;  
      this.selectedLicensePlate = licensePlate;
      this.showVehicleHistory = true;
    }
  }

  closeVehicleHistory() {
    this.showVehicleHistory = false;
    this.selectedLicensePlate = null;
  }
}