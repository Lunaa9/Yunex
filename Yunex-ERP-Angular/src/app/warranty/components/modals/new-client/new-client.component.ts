import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/warranty/services/data.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent {
  form:boolean=false;//form validator
  private subscription:Subscription;//al new-client component subscription

  constructor(private data:DataService){
    //Subsciption to object
    this.subscription=data.object.subscribe(
      data=>{
        if(!data.show){
          this.form=false;
        }
      }
    )
  }

  //unsubscribe from all subscription
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  //open the modal
  openForm(){
    this.form=true;
  }

  //close the modal
  closeForm(){
    this.form=false;
  }
}