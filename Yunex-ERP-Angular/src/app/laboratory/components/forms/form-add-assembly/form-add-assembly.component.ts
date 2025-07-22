import { Component } from '@angular/core';
import { assembly } from 'src/app/interfaces/lab/assembly.interface';
import { AssemblyService } from 'src/app/laboratory/services/assembly.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-add-assembly',
  templateUrl: './form-add-assembly.component.html',
  styleUrls: ['./form-add-assembly.component.css'],
})
export class FormAddAssemblyComponent {
  newAssembly: assembly = {
    //new Assembly object to upload
    consecutive: 0,
    startDate: '',
    year: 0,
    graph: '',
    assemblyType: '',
    amount: 0,
    status: 'started',
    contract: '',
    client: '',
    senderName: '',
    expectedOutDate: '',
    realEndDate: '',
    complianceDate: false,
    received: '',
    assemblyRes: '',
    serviceRes: 'Ingeniero Cesar Ospina',
  };
  assemblyTypes: string[] = [
    //array with all assembly types
    'Semaforos',
    'Bandejas',
    'SX Protector',
    'Controlador C800',
    'Contolador C900',
    'Controlador ST950',
    'Controlador SX',
  ];
  form: boolean = false; //form validator
  overload: boolean = false; //overload validator
  alertDanger: boolean = false; //the alert danger validator
  excel: boolean = false; //activate excel send button
  data: any[] = [];

  constructor(private assemblySvc: AssemblyService) {}

  /**
   * Create a new assembly object and send it to the backend to be stored.
   *
   * This function uses the AssemblyService to send the newAssembly object to the backend.
   * If the creation is successful, the page is reloaded to update the table.
   * If the creation fails, an error message is logged to the console.
   */
  createAssembly() {
    // Send the newDbly object to the backend to create a new assembly
    this.assemblySvc.createAssambly(this.newAssembly).subscribe(
      function (res) {
        // Reload the page to update the table
        res ? Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Módulo creado correctamente',
        }).then(() => {
           // solo después de mostrar la alerta
        }) : console.log('failed');
      }
    );
  }

  uploadXls(event: any) {
    this.overload = true;
    this.alertDanger = false;
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.alertDanger = true;
      this.overload = false;
      return;
    }

    const file = input.files[0];
    const formData = new FormData();
    try {
      formData.append('file', file);
    } catch (error) {
      console.error('Error appending file to formData:', error);
      this.alertDanger = true;
      this.overload = false;
      return;
    }

    try {
      this.assemblySvc.uploadExcel(formData).subscribe(
        (res) => {
          if (res) {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Módulo creado correctamente',
            }).then(() => {
              window.location.reload(); // solo después de mostrar la alerta
            });
          } else {
            this.alertDanger = true;
          }
          this.overload = false;
        },
        (error: HttpErrorResponse) => {
          console.error('Error uploading file:', error);
          this.alertDanger = true;
          this.overload = false;
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      this.alertDanger = true;
      this.overload = false;
    }
  }

  /**
   * This function is triggered when the user selects a file to upload.
   * It validates if a file has been selected and sets the corresponding
   * flags to indicate the successful upload.
   *
   * @param event - The event triggered when a file is selected.
   */
  uploadButton(event: any): void {
    // Check if a file has been selected
    if (event.target.files[0]) {
      // Set the excel flag to true
      this.excel = true;
      // Set the alertDanger flag to false
      this.alertDanger = false;
      // Set the overload flag to false
      this.overload = false;
    }
  }
}
