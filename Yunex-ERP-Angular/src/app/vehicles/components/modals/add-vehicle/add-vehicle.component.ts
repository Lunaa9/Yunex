import { Component } from '@angular/core';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent {
  form: boolean = false;
  
  openForm(){
    this.form=true;
  }

  //close the modal
  closeForm(){
    this.form=false;
  }
}
