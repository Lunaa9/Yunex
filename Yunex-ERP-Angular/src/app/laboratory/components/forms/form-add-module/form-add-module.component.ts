import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { LabService } from '../../../services/lab.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-add-module',
  templateUrl: './form-add-module.component.html',
  styleUrls: ['./form-add-module.component.css']
})
export class FormAddModuleComponent {
  incidence={//the incidence object
    ticket: 'L-xxx',
    admissionDate: 'today',
    module: {
      name: '',
      serial: '',
      instalationDate: '',
      warrantyTime: 0,
      estimatedRepairTime: 0,
      estimatedOutTime: 0,
    },
    equipment: '',
    sticker: '',
    serial: '',
    status: 'to repair' ,
    approved: false,
    city: '',
    comments: '',
    contractNumber: '',
    client: '',
    sender: '',
    warranty: 'No',
    expectedOutDate: 'in a month',
    repairCenterResponsable: '',
    servicesResponsable: '' ,
    realOutDate: '',
    outDateCompliance: false,
    estimatedRepairTime: 0,
    realRepairTime: 0,
    repairTimeCompliance: false,
    year: 2023,
    failure: '',
    repairProcedure: 'none',
    repairTechnician: 'none',
    activity: 'repair'
  };
  isLoading: boolean = false;//isLoading validator
  error: string | null = null;//isLoading validator

  constructor(private labservice: LabService) {}

  /**
   * Controller to add incidences.
   *
   * @param {any} values - The form values.
   * @returns {void} - No return value.
   */
  




  handleSubmit(values: any): void {
    this.isLoading = true;
    this.error = null;
  
    // Formatea la fecha
    const date = new Date(this.incidence.module.instalationDate);
    this.incidence.module.instalationDate = date.toISOString().split('T')[0]; // yyyy-MM-dd
    
  
    this.labservice.newModule(this.incidence).subscribe({
      next: (response) => {
        console.log('new module created correctly', response);
        
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Módulo creado correctamente',
        }).then(() => {
          window.location.reload(); // solo después de mostrar la alerta
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error || 'Ocurrió un error inesperado',
        });
        this.isLoading = false;
      }
    });
  }

}
