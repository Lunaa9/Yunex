import { Component, Input } from '@angular/core';
import { LabIncidence } from 'src/app/interfaces/lab/labIncidence.interface';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css'],
})
export class DetailViewComponent {
  @Input() incidenceToShow: LabIncidence = {
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

  constructor(private tableService: TableService) {}

  close() {
    this.tableService.show = false;
  }
}