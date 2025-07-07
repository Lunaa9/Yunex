import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/warranty/services/data.service';

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.css']
})
export class NewContractComponent {
  form:boolean=false;//form validator 
  private subscription:Subscription;//all subscription in the component

  constructor(private data:DataService){
    //subscription to object observable
    this.subscription=data.object.subscribe(
      data=>{
        if(!data.show){
          this.form=false;
        }
      }
    )
  }

  //unsubscribe from all subscriptions
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  //open the modal form
  openForm(){
    this.form=true;
  }

  //close the modal form
  closeForm(){
    this.form=false;
  }
}