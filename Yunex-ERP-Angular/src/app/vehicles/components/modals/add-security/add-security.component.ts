import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-security',
  templateUrl: './add-security.component.html',
  styleUrls: ['./add-security.component.css']
})
export class AddSecurityComponent {
  @Input() selectedSecurity!: string ;
  form: boolean = false;
  
  openForm(){
    this.form=true;
  }

  //close the modal
  closeForm(){
    this.form=false;
  }
}

