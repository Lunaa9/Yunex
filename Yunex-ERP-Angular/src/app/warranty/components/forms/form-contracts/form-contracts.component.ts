import { Component } from '@angular/core';
import { contractService } from 'src/app/warranty/services/contract.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { clientService } from 'src/app/warranty/services/clients.service';
import { client } from 'src/app/interfaces/warranties/client.interface';
import { contract } from 'src/app/interfaces/warranties/contract.interface';
import { DataService } from 'src/app/warranty/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-contracts',
  templateUrl: './form-contracts.component.html',
  styleUrls: ['./form-contracts.component.css'],
})
export class FormContratosComponent {
  wrongDate: boolean = false; //The wrongDate validator
  overload: boolean = false; //Overload validator
  contract: contract = {
    //The contract object that is sending
    clientName: '',
    contractName: '',
    handover: [],
    initWarranty: '',
    endWarranty: '',
    ceco: 0,
    activeWarranty: false,
  };
  file: any = []; //The array with the file buffer data

  clientsNames: client[] = []; //The clientsNames Array
  isLoading: boolean = false; //isLoading validator
  error: string | null = null; //the type error

  constructor(
    private contractService: contractService,
    private sanitizer: DomSanitizer,
    private clientservice: clientService,
    private data: DataService
  ) {}

  ngOnInit() {
    this.getClients();
    this.data.clientData.subscribe((client) => {
      if (client) {
        this.contract.clientName = client.name;
      }
    });
  }

  /**
   * Get the clientsName array
   */
  getClients() {
    this.clientservice.getClients().subscribe((data) => {
      this.clientsNames = data;
    });
  }

  /**
   * Verify if the date is valid
   */
  date() {
    if (this.contract.endWarranty) {
      if (this.contract.initWarranty >= this.contract.endWarranty) {
        this.wrongDate = true;
      } else {
        this.wrongDate = false;
      }
    }
  }

  /**
   * Get the handover file
   * @param event
   */
  handleSubmit2(event: any): any {
    const filecapture = event.target.files[0];
    this.file = filecapture;
    this.extraerBase64(filecapture).then((archivo: any) => {
      this.contract.handover = archivo.base;
    });
  }

  /**
   * become the handover file to base64
   * @param $event
   * @returns the file object
   */
  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const usafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(usafeImg);
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            blob: $event,
            image,
            base: reader.result,
          });
        };
        reader.onerror = () => {
          resolve({
            blob: $event,
            image,
            base: null,
          });
        };
        reader.readAsDataURL($event);
      } catch (e) {
        resolve(null);
      }
    });

  /**
   * controller to add the incidences
   * @param labincidence
   * @returns msg
   */
  handleSubmit5(): void {
    this.overload = true;
    this.isLoading = true;
    this.error = null;
  
    try {
      this.contractService.newcontract(this.contract).subscribe(
        (response) => {
          console.log('new contract created correctly', response);
          this.data.setObject({ action: '', show: false, module: '' });
  
          Swal.fire({
            title: '<strong>Contrato creado</strong>',
            text: 'El contrato ha sido registrado correctamente.',
            icon: 'success',
            iconColor: '#rgba(36, 255, 7, 0.9)',
            confirmButtonColor: '#3085d6',
            confirmButtonText: '<i class="fas fa-check-circle"></i> Aceptar',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
  
          // Verifica el mensaje del backend
          if (error.status === 409 || error.error?.message?.includes('ya existe')) {
            Swal.fire({
              title: 'Contrato existente',
              text: 'Ya existe un contrato con ese nombre para el cliente.',
              icon: 'warning',
              confirmButtonText: 'Aceptar'
            });
          } else {
            Swal.fire({
              title: '<strong>Contrato existente</strong>',
              html: 'Ya existe un contrato con el nombre proporcionado.<br><small>Por favor, elige otro nombre o edita el contrato existente.</small>',
              icon: 'warning',
              iconColor: '#rgba(233, 15, 15, 0.9)',
              confirmButtonText: '<i class="fas fa-check-circle"></i> Entendido',
              confirmButtonColor: '#3085d6',
              background: '#fffbea',
              backdrop: `
                rgba(0,0,123,0.2)
                left top
                no-repeat
              `,
            });
          }
  
          this.error = 'No se pudo crear el contrato.';
        }
      );
    } catch {
      console.log('error en try-catch');
    } finally {
      this.isLoading = false;
    }
  }
}
