import { Component, Input } from '@angular/core';
import { LabIncidence } from 'src/app/interfaces/lab/labIncidence.interface';
import { LabService } from '../../../services/lab.service'
import { TableService } from '../../../services/table.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.css'],
})
export class EditViewComponent {
  isLoading: boolean = false;//is loading validator
  error: string | null = null;//error type

  @Input() incidenceToShow:LabIncidence={//labincidence object
    ticket: '',
    admissionDate: '',
    module: {
      name: '',
      serial: '',
      installationDate: '',
      warrantyTime: 0,
      estimatedRepairTime: 0,
      estimatedOutTime: 0,
      warrantyDate: ''
    },
    equipment: '',
    sticker:'',
    status: '',
    approved:false,
    city: '',
    comments: '',
    contractNumber: '',
    client: '',
    sender: '',
    warranty: '',
    expectedOutDate: '',
    repairCenterResponsable: '',
    servicesResponsable: '',
    realOutDate: '',
    outDateCompliance: false,
    estimatedRepairTime: 0,
    realRepairTime: 0,
    repairTimeCompliance: false,
    year: 0,
    failure: '',
    repairProcedure: '',
    repairTechnician: '',
    activity:''
  };

  /**
   * The constructor function for the LabIncidenceComponent.
   * 
   *
   * @param private labservice: LabService Create a private labservice variable
   * @param private tableService: TableService Inject the tableservice into this component
   *
   * @return An instance of the class
   *
   * @docauthor Trelent
   */
  constructor(private labservice: LabService, private tableService: TableService) {}

  close(): void {
    this.tableService.show = false;
  }

  /**
   * Controller to edit the incidences.
   * Sends a request to the labservice to update the module.
   * If successful, it reloads the page.
   * If unsuccessful, it logs an error message.
   *
   * @return {void}
   */
  handleSubmit(): void {
    this.isLoading = true;
    this.error = null;
    this.incidenceToShow.module = this.incidenceToShow.module;    
  
    this.labservice.UpdateModule(this.incidenceToShow).subscribe({
      next: ( response ) => {
        this.isLoading = true;
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '¡Cambios guardados!',
          text: 'El módulo fue actualizado correctamente.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.reload(); // recarga después de aceptar la alerta
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.error = err.message;
  
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: err.error?.message || 'Ocurrió un error al editar el módulo.'
        });
      }
    });
  }

}
