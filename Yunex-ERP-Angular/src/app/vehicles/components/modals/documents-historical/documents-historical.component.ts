import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicles/vehicle.interface';
import { VehicleFileService } from 'src/app/vehicles/services/vehicle-file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documents-historical',
  templateUrl: './documents-historical.component.html',
  styleUrls: ['./documents-historical.component.css']
})
export class DocumentsHistoricalComponent {
  @Input() vehicle: Vehicle | null = null;
  @Input() licensePlate: string | null = null;
  @Output() close = new EventEmitter<void>();
  selectedVehicle: Vehicle | null = null; 
  
  // Archivos generales y filtrados
  vehicleFiles: { fileName: string, mimetype: string }[] = [];
  filteredFiles: { fileName: string, mimetype: string }[] = [];

  // Categoría seleccionada
  selectedCategory: string = 'lifesheet';  // La categoría inicial es 'lifesheet'

  constructor(private vehicleFileService: VehicleFileService) {}

  ngOnInit() {
    if (this.licensePlate) {
      this.getAllFilesForVehicle();
    } else {
      console.error('No license plate provided.');
    }
  }

  Close() {
    this.close.emit();
  }

  // Obtener todos los archivos del vehículo y filtrarlos por la categoría inicial
  getAllFilesForVehicle() {
    if (this.licensePlate) {
      this.vehicleFileService.getAllFilesFromVehicle(this.licensePlate).subscribe(
        (files) => {
          console.log('Archivos recibidos:', files);
          
          // Guardar todos los archivos recibidos
          this.vehicleFiles = files.map(file => ({
            fileName: file.fileName,
            mimetype: file.mimeType, 
            fileData: file.fileData
          }));
          
          // Filtrar los archivos según la categoría seleccionada
          this.filterFilesByCategory();
        },
        (error) => {
          console.error('Error fetching files:', error);
        }
      );
    }
  }

  // Filtrar archivos según la categoría seleccionada
  filterFilesByCategory() {
    this.filteredFiles = this.vehicleFiles.filter(file => 
      file.fileName.toLowerCase().includes(this.selectedCategory.toLowerCase())
    );
  }

  selectVehicle(vehicle: Vehicle): void {
    this.selectedVehicle = vehicle;  // Almacena el vehículo seleccionado
    // Aquí puedes agregar lógica para filtrar los archivos del vehículo seleccionado
  }
  // Cambiar la categoría y filtrar los archivos
  selectCategory(category: string) {
    this.selectedCategory = category;  // Cambiar la categoría seleccionada
    this.filterFilesByCategory();  // Volver a filtrar los archivos según la nueva categoría
  }

  // Método para descargar el archivo
  downloadVehicleFile(licensePlate: string, fileName: string): void {
    this.vehicleFileService.downloadFileFromVehicle(licensePlate, fileName).subscribe(
      (blob: Blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = fileName;  // Descargar con el nombre del archivo
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
      },
      error => {
        console.error('Error al descargar el archivo:', error);
      }
    );
  }

  // Método para ver el archivo en el navegador
  viewFile(fileName: string, mimeType: string): void {
    if (this.licensePlate) {
      this.vehicleFileService.getFileFromVehicle(this.licensePlate, fileName).subscribe(
        (blob: Blob) => {
          if (blob.size === 0) {
            console.log('Este archivo no existe');
          } else {
            const filePath = window.URL.createObjectURL(blob);
            const newTab = window.open(filePath, '_blank');
            if (!newTab) {
              console.error('No se pudo abrir la nueva pestaña. Permite las ventanas emergentes para este sitio.');
            }
          }
        },
        error => {
          console.error('Error al ver el archivo:', error);
        }
      );
    }
  }

  // Método para eliminar un archivo
  deleteFile(fileName: string): void {
    if (this.licensePlate) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Esta acción no se podrá deshacer!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, elimínalo!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.vehicleFileService.deleteVehicleFile(this.licensePlate!, fileName).subscribe(
            () => {
              Swal.fire('Eliminado!', 'El archivo ha sido eliminado.', 'success');
              // Actualizar la lista de archivos
              this.filteredFiles = this.filteredFiles.filter(file => file.fileName !== fileName);
            },
            error => {
              console.error('Error al eliminar el archivo:', error);
              Swal.fire('Error', 'Ocurrió un error al intentar eliminar el archivo.', 'error');
            }
          );
        }
      });
    } else {
      console.error('licensePlate no está definido');
      Swal.fire('Error', 'La placa del vehículo no está disponible.', 'error');
    }
  }
  
}
