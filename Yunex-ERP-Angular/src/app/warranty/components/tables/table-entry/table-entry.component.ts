import { Component } from '@angular/core';
import { warrantyTicket } from 'src/app/interfaces/warranties/warrantyTicket.interface';
import { WarrantyticketsService } from 'src/app/warranty/services/warrantytickets.service';
import { DataService } from 'src/app/warranty/services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-entry',
  templateUrl: './table-entry.component.html',
  styleUrls: ['./table-entry.component.css']
})
export class TableEntryComponent {
  ticketData:any='';//component data
  contract:string='';//contractName
  actions:any=null;//actions to take
  tickets:Array<warrantyTicket>=[];//tickets array
  filterTable = '';//filterTable params
  page: number = 0;// number page
  void:boolean=false;//void validator
  table:string='entries';//table type to the pipe
  private subscription:Subscription;//all component subscription

  constructor(private ticketService:WarrantyticketsService, private data:DataService){
    //subsciption to warrantyData observable
    this.subscription = data.warrantyData.subscribe((data)=>{
      this.ticketData=data;
      this.contract=data.contractNum;
    })
  }

  ngOnInit():void{
    //subscription to object observable and validate to get tickets array
    this.subscription.add(this.data.object.subscribe(data=>{
      this.actions=data;
      if(!data.show) {
        this.getTickets();
      }
    }));
  }
  
  /**
   * unsubscribe all components subscriptions
   */
  ngOnDestroy():void{
    this.subscription.unsubscribe()
  }

  /**
   * get the tickets that are not finished
   */
  getTickets():void{
    this.ticketService.getTicketByContract(this.contract).subscribe(
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
  }

  /**
   * show the warrantyProcess modal
   * @param ticket 
   */
  warrantyProcess(ticket:string){
    this.ticketData.ticket=ticket;
    this.data.setData(this.ticketData);
    this.actions.show=true;
    this.actions.action='nextPhase';
  }

  /**
   * show the historical modal according the ticket
   * @param ticket 
   */
  openHistorical(ticket:string){
    this.actions.action='historical';
    this.actions.show=true;
    this.ticketData.ticket=ticket;
    this.data.setData(this.ticketData);
    this.data.setObject(this.actions);
  }
}