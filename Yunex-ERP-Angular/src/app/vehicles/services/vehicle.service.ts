import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehicle } from 'src/app/interfaces/vehicles/vehicle.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  createVehicle(vehicle: Vehicle): Observable<boolean> {
    const url = environment.API_URI + 'vehicle/create-vehicle';
    return this.http.post<{ msg: string }>(url, vehicle).pipe(
      map(res => res.msg === 'Vehicle created correctly')
    );
  }

  getAllVehicles(): Observable<Vehicle[] | false> {
    const url = environment.API_URI + 'vehicle/get-all-vehicles';
    return this.http.get<{ msg: Vehicle[] | 'Empty' }>(url).pipe(
      map(res => res.msg === 'Empty' ? false : res.msg)
    );
  }

  getVehicle(id: string): Observable<Vehicle | false> {
    const url = `${environment.API_URI}vehicle/${id}`;
    return this.http.get<{ msg: Vehicle | 'Empty' }>(url).pipe(
      map(res => res.msg === 'Empty' ? false : res.msg)
    );
  }

  updateVehicle(vehicle: Vehicle): Observable<boolean> {
    const url = environment.API_URI + 'vehicle/update-vehicle';
    return this.http.put<{ msg: string }>(url, vehicle).pipe(
      map(res => res.msg === 'Vehicle updated correctly')
    );
  }

  async deleteVehicle(licensePlate: string): Promise<boolean> {
    const url = environment.API_URI + 'vehicle/delete-vehicle';
    try {
      const res = await this.http.delete(url, { body: { licensePlate: licensePlate } }).toPromise();
      const response = JSON.parse(JSON.stringify(res));
      return response.msg === 'Vehicle deleted correctly' ? true : false;
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      throw error;
    }
  }
  
}