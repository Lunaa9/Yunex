import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { WarrantyticketsService } from 'src/app/warranty/services/warrantytickets.service';
import { DataService } from 'src/app/warranty/services/data.service';
import { WarrantyData } from 'src/app/interfaces/warranties/warrantyData.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-general',
  templateUrl: './table-general.component.html',
  styleUrls: ['./table-general.component.css']
})
export class TableGeneralComponent {
  void:boolean=false;//void validator
  modal:boolean=false;//modal validator
  action:string='';//action to take
  tickets:Array<any>=[];//tickets array
  generalData:any=null;//component data
  page:number=0;//page number
  filterTable:string='';//filterTable params
  today:Date=new Date();//The today date
  private subscription:Subscription;//all component subscription
  
  constructor(private ticketSvc:WarrantyticketsService, private data:DataService){
    this.subscription=Subscription.EMPTY;
    this.today.setHours(0,0,0,0)
  }

  ngOnInit():void{
    //subscription to object observable and validate to get tickets
    this.subscription=this.data.object.subscribe(
      obj=>{
        this.generalData=obj;
        this.modal=obj.show;
        this.action=obj.action;
        if(!obj.show){
          this.getTickets();
        }
      }
    );
  };

  /**
   * unsubscribe all component subscripion
   */
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  /**
   * get the active tickets
   */
  getTickets(){
    this.ticketSvc.getTickets().subscribe(
      tickets=>{
        this.tickets=tickets.filter((ticket:any)=>
          ticket.status!=='finished' && 
          ticket.status!=='approved' && 
          ticket.status!=='warrantyDenied');
        if(this.tickets.length<=0){
          this.void=true;
        }
      },(error:HttpErrorResponse)=>{
        this.void=true;
        console.log(`Something went wrong ${error}`);
      }
    );
  };

  /**
   * show the historical modal
   * @param ticket 
   */
  openHistorical(ticket:string){
    this.generalData.show=true;
    this.generalData.action='historical';
    const object:WarrantyData={
      client:'',
      contractNum:'',
      serial:'',
      ticket:ticket,
      toShow:'clients'
    };
    this.data.setData(object);
    this.data.setObject(this.generalData);
  }

  /**
   * show the process warranty modal
   * @param ticket 
   */
  processWrrty(ticket:string){
    this.generalData.show=true;
    this.generalData.action='generalProcess';
    const object:WarrantyData={
      client:'',
      contractNum:'',
      serial:'',
      ticket:ticket,
      toShow:'clients'
    };
    this.data.setData(object);
    this.data.setObject(this.generalData);
  }

  /**
   * Verify the warranty time status
   * @param date 
   * @returns 
   */
  noWarranty(date:string):number{
    if(date){
      const startDate=new Date(date).getTime();
      const time=Math.round((this.today.getTime()-startDate)/(1000*60*60*24));
      return time;
    }else{
      return 0;
    }
  }
}