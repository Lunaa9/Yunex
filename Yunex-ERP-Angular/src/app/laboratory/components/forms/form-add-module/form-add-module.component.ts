import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { LabService } from '../../../services/lab.service'

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
  handleSubmit(values: any): void{
    // Set isLoading and error to initial values
    this.isLoading = true;
    this.error = null;

    // Format instalation date
    this.incidence.module.instalationDate = new Date(this.incidence.module.instalationDate).toLocaleDateString('es-CO');

    try {
      // Make API call to add new module
      this.labservice.newModule(this.incidence).subscribe(
        response => {
          // Log response and reload page
          console.log('new module created correctly', response);
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          // Log error and set error message
          console.log(error.error);
          this.error = "Usuario o contraseña incorrectos";
        }
      )
    } catch {
      // Log error
      console.log('error');
    } finally {
      // Set isLoading to false
      this.isLoading = false;
    }
  }
}
