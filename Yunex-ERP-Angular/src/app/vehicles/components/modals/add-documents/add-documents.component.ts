import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.css']
})
export class AddDocumentsComponent {

  form: boolean = false;
  @Input() vehicleLicensePlate: string | null = null;
  @Input() isLicensePlateDisabled: boolean = false;
  @Input() documentCategory: string | null = null;
  openForm(){
    this.form=true;
  }

  //close the modal
  closeForm(){
    this.form=false;
  }
}