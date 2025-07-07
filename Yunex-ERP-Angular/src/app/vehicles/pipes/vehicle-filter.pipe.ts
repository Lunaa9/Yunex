import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicles/vehicle.interface';

@Pipe({
  name: 'vehicleFilter'
})
export class VehicleFilterPipe implements PipeTransform {

  transform(vehicles: Vehicle[], searchText: string, page: number = 0): Vehicle[] {
    if (!vehicles || !searchText) {
      return vehicles.slice(page, page + 5);
    }

    const filteredVehicles = vehicles.filter(vehicle =>
      vehicle.licensePlate.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchText.toLowerCase())
    );

    return filteredVehicles.slice(page, page + 5);
  }
}