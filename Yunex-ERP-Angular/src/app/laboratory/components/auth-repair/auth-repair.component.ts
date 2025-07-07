import { Component, Input } from '@angular/core';
import { LabIncidence } from 'src/app/interfaces/lab/labIncidence.interface';
import { TableService } from '../../services/table.service';
import { LabService } from '../../services/lab.service'


@Component({
  selector: 'app-auth-repair',
  templateUrl: './auth-repair.component.html',
  styleUrls: ['./auth-repair.component.css']
})
export class AuthRepairComponent {
  isLoading: boolean = false;
  error: string | null = null;

  @Input() incidenceToShow: LabIncidence = {
    ticket: '',
    admissionDate: '',
    module: {
      name: '',
      serial: '',
      instalationDate: '',
      warrantyTime: 0,
      estimatedRepairTime: 0,
      estimatedOutTime: 0,
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

  constructor(private tableService: TableService, private labservice: LabService) {}

  disapprove(){
    if(this.incidenceToShow.approved === false){
      this.incidenceToShow.status = 'to repair'
    }
  }

  handleSubmit(){
    this.isLoading = true;
    this.error = null;

    try {   
      if(this.incidenceToShow.approved === false ){
        this.disapprove();
      this.labservice.UpdateModule(
        this.incidenceToShow
        ).subscribe(response => {
        console.log('entry module update correctly', response)
        window.location.reload()
        }
      )} else {
        this.labservice.authRepair(
          this.incidenceToShow
          ).subscribe(( response) => {
          console.log('entry module update correctly', response)
          window.location.reload()
          }
        )
      }
    } catch {
      console.log('error')
    }finally {
      this.isLoading = false;
    }
  }

        
  close() {
    this.tableService.show = false;
  }
}