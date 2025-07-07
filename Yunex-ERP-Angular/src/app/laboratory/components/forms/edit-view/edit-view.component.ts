import { Component, Input } from '@angular/core';
import { LabIncidence } from 'src/app/interfaces/lab/labIncidence.interface';
import { TableService } from '../../../services/table.service';
import { LabService } from '../../../services/lab.service'

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
      instalationDate: '',
      warrantyTime: 0,
      estimatedRepairTime: 0,
      estimatedOutTime: 0
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
   * @param private tableService: TableService Inject the tableservice into this component
   * @param private labservice: LabService Create a private labservice variable
   *
   * @return An instance of the class
   *
   * @docauthor Trelent
   */
  constructor(private tableService: TableService, private labservice: LabService) {}

  /**
   * Controller to edit the incidences.
   * Sends a request to the labservice to update the module.
   * If successful, it reloads the page.
   * If unsuccessful, it logs an error message.
   *
   * @return {void}
   */
  handleSubmit(){
    // Set loading state to true and clear any previous error
    this.isLoading = true;
    this.error = null;
    
    try {  
      // Send a request to update the module
      this.labservice.UpdateModule(
        this.incidenceToShow
      ).subscribe(
        // If the request is successful, reload the page
        (response) => {
          console.log('Entry module updated correctly', response);
          window.location.reload();
        }
      );
    } catch {
      // Log an error if the request fails
      console.log('Error');
    } finally {
      // Set loading state to false
      this.isLoading = false;
    }
  }

  /**
   * close the frame
   */
  close() {
    this.tableService.show = false;
  }
}