import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { WarrantyticketsService } from 'src/app/warranty/services/warrantytickets.service';
import { DataService } from 'src/app/warranty/services/data.service';
import { Subscription } from 'rxjs';
import { WarrantyData } from 'src/app/interfaces/warranties/warrantyData.interface';

@Component({
  selector: 'app-table-historical',
  templateUrl: './table-historical.component.html',
  styleUrls: ['./table-historical.component.css']
})
export class TableHistoricalComponent {
  tickets:Array<any>=[];//tickets array
  filterTable:string='';//filterTable params
  page:number=0;//page number
  historical:boolean=false;//historical validator
  histData:any=null;//component data
  private subscription:Subscription;//all component subscriptions

  constructor(private ticketService:WarrantyticketsService, private data:DataService){
    this.subscription=Subscription.EMPTY;
  }

  ngOnInit():void{
    //subscribe to object observable and validate to get files
    this.subscription=this.data.object.subscribe(
      obj=>{
        this.histData=obj;
        this.historical=obj.show;
        if(!obj.show){
          this.getAllFiles();
        }
      }
    );
  };

  /**
   * unsubscribe all component subscription
   */
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  /**
   * get the files array
   */
  getAllFiles(){
    this.ticketService.getTickets().subscribe(
      res=>{
        if(!res){
          console.log("Something went wrong");
        }else{
          this.tickets=res;
        }
      },(error:HttpErrorResponse)=>{
        console.log(`Something went wrong ${error}`);
      }
    )
  };

  /**
   * show the historical component
   * @param ticket 
   */
  openHistorical(ticket:string){
    this.histData.show=true;
    const object:WarrantyData={
      client:'',
      contractNum:'',
      serial:'',
      ticket:ticket,
      toShow:'clients'
    };
    this.data.setData(object);
    this.data.setObject(this.histData);
  }
}