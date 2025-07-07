import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/warranty/services/data.service';

@Component({
  selector: 'app-entry-modules',
  templateUrl: './entry-modules.component.html',
  styleUrls: ['./entry-modules.component.css']
})
export class EntryModulesComponent {
  form:boolean=false;//the form validatr
  private subscription:Subscription;

  constructor(private data:DataService){
    this.subscription=data.object.subscribe(
      //subscription to object observable
      data=>{
        if(!data.show){
          this.form=false;
        }
      }
    )
  }

  /**
   * unsubscribe from all subscriptions from entry-modules component
   */
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  /**
   * open the form modal
   */
  openForm(){
    this.form=true;
  }

  /**
   * close the form modal
   */
  closeForm(){
    this.form=false;
  }
}