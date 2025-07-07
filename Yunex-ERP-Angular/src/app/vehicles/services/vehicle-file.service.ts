import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleFileService {
  constructor(private http: HttpClient) {}

 addFileToVehicle(licensePlate: string, file: File, fileType: string): Observable<boolean> {
  const url = environment.API_URI + 'vehicle-files/add-file/' + licensePlate;
  const formData = new FormData();

  // Verificar el archivo seleccionado
  console.log('Archivo seleccionado:', file);
  
  formData.append('file', file);
  formData.append('fileType', fileType);

  // Verificar el contenido del FormData
  formData.forEach((value, key) => {
    console.log(`FormData contenido - ${key}:`, value);
  });

  return this.http.post<{ message: string }>(url, formData).pipe(
    map(res => res.message === 'File added to vehicle correctly')
  );
}

  getFileFromVehicle(licensePlate: string, fileName: string): Observable<Blob> {
     const url =  environment.API_URI + 'vehicle-files/get-file/' + licensePlate + '/'+ fileName;
    return this.http.get(url, { responseType: 'blob' });
  }

  getAllFilesFromVehicle(licensePlate: string): Observable<any[]> {
    const url = environment.API_URI + 'vehicle-files/get-all-files/' + licensePlate;
    return this.http.get<any[]>(url);
  }

  updateVehicleFile(licensePlate: string, fileName: string, file: File): Observable<boolean> {
    const url = `${environment.API_URI}vehicle-files/update-file/${licensePlate}/${fileName}`;
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put<{ message: string }>(url, formData).pipe(
      map(res => res.message === 'Vehicle file updated correctly')
    );
  }

  deleteVehicleFile(licensePlate: string, fileName: string): Observable<boolean> {
    const url = environment.API_URI + 'vehicle-files/delete-file/' +licensePlate+ '/' +fileName;
    return this.http.delete<{ message: string }>(url).pipe(
      map(res => res.message === 'Vehicle file deleted correctly')
    );
  }
  downloadFileFromVehicle(licensePlate: string, fileName: string): Observable<Blob> {
    const url =  environment.API_URI + 'vehicle-files/get-file/' + licensePlate + '/'+ fileName;
    return this.http.get(url, { responseType: 'blob' });
  }
}