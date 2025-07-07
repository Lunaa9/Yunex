import { Component, Input } from '@angular/core';
import { VehicleService } from 'src/app/vehicles/services/vehicle.service';
import { Vehicle } from 'src/app/interfaces/vehicles/vehicle.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent {
  @Input() tabs: string[] = ['GENERAL','SEGURO OBLIGATORIO','POLIZA TODO RIESGO','REVISIÓN TECNOMECÁNICA','REVISIÓN PLUMA ARTICULADA'];
  vehicles: Vehicle[] = []; 
  selectedTab: string = '';
  isEditMode: boolean = false;
  selectedVehicle: Vehicle | null = null;
  isEditVehicleVisible = false;
  action: 'view' | 'edit' | null = null;
  searchText: string = '';
  page: number = 0;

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
  

  onTabSelected(tab: string) {
    this.selectedTab = tab;
  }
  getDaysRemaining(expirationDate: Date | string): number {
    const expiration = (typeof expirationDate === 'string') ? new Date(expirationDate) : expirationDate;
    const now = new Date();
  
    if (expiration < now) {
      return 0; // Ya venció
    }
  
    const timeDiff = expiration.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convertir a días
  }

  getRowClass(expirationDate: Date | string): string {
    const daysRemaining = this.getDaysRemaining(expirationDate);
  
    if (daysRemaining <= 0) {
      return '#ff6f6f';
    } else if (daysRemaining <= 40) {
      return '#ffff99';
    } else {
      return '#99ff99';
    }
  }
  view(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
    this.action = 'view';
  }

  edit(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
    this.action = 'edit';
  }

  closeModal() {
    this.selectedVehicle = null;
    this.action = null;
  }
  
}
