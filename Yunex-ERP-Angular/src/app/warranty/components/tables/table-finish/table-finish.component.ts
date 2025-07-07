import { Component } from '@angular/core';
import { warrantyTicket } from 'src/app/interfaces/warranties/warrantyTicket.interface';
import { WarrantyticketsService } from 'src/app/warranty/services/warrantytickets.service';
import { DataService } from 'src/app/warranty/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-finish',
  templateUrl: './table-finish.component.html',
  styleUrls: ['./table-finish.component.css']
})
export class TableFinishComponent {
  contract:string='';//contract name
  tickets:Array<warrantyTicket>=[];//tickets array
  filterTable='';//filterTable params
  page: number=0;//page number
  void:boolean=false;//void validator
  table:string='finished';//table type to the pipe
  actions:any=null;//actions to take
  finishedData:any=null;//component data
  private subscription:Subscription;//all component subscriptions

  constructor(private ticketService:WarrantyticketsService, private data:DataService){
    //subscription to warrantyData observable
    this.subscription = data.warrantyData.subscribe(data=>{
      this.finishedData=data;
      this.contract=data.contractNum;
    })
  }

  ngOnInit():void{
    //subscription to object observable and validation to getTickets
    this.subscription.add(this.data.object.subscribe(data=>{
      this.actions=data;
      if(!this.actions.show){
        this.getTickets();
      }
    }))
  }

  /**
   * unsubscribe all components subscriptions
   */
  ngOndestroy():void{
    this.subscription.unsubscribe();
  }

  /**
   * Get tickets array by the contract name
   */
  getTickets():void{
    this.ticketService.getTicketByContract(this.contract).subscribe(
      tickets=>{
        this.tickets=tickets.filter((ticket:any)=>
          ticket.status==='finished' || 
          ticket.status ==='approved' || 
          ticket.status==='warrantyDenied');
        if(this.tickets.length<=0){
          this.void=true;
        }
      }
    )
  }

  /**
   * show the approved modal
   * @param ticket 
   */
  approved(ticket:string){
    this.finishedData.ticket=ticket;
    this.data.setObject(this.finishedData);
    this.actions.show=true;
    this.actions.action='nextPhase';
  }

  /**
   * open the ticket historical
   * @param ticket 
   */
  openHistorical(ticket:string){
    this.actions.action='historical';
    this.actions.show=true;
    this.finishedData.ticket=ticket;
    this.data.setData(this.finishedData);
    this.data.setObject(this.actions);
  }
}