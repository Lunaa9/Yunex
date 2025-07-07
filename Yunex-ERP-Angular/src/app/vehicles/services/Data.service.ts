import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehicle } from 'src/app/interfaces/vehicles/vehicle.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleDataService {
   private vehiclesSource = new BehaviorSubject<Vehicle[]>([]);

   vehiclesData = this.vehiclesSource.asObservable();

   constructor() {}
 
   addVehicle(vehicle: Vehicle) {
     const currentVehicles = this.vehiclesSource.value;
     this.vehiclesSource.next([...currentVehicles, vehicle]);
   }
 
   getVehicles(): Observable<Vehicle[]> {
     return this.vehiclesData;
   }
 }