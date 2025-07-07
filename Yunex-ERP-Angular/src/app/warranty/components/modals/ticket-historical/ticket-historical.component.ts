import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/warranty/services/data.service';
import { WarrantyticketsService } from 'src/app/warranty/services/warrantytickets.service';
import { TicketFilesService } from 'src/app/warranty/services/ticket-files.service';

@Component({
  selector: 'app-ticket-historical',
  templateUrl: './ticket-historical.component.html',
  styleUrls: ['./ticket-historical.component.css']
})
export class TicketHistoricalComponent {
  tickets:Array<any>=[];//tickets array
  oneTicket:any=null;//take the ticket files
  files:Array<any>=[];//files Array
  histData:any=null;//data of the component
  serial:string='';//module serial
  ticket:string='';//ticket identifier 
  dataObject:any=null;//data object
  void:boolean=false;//void validator
  private subscription:Subscription;//the component subscription

  constructor(private data:DataService, private ticketSvc:WarrantyticketsService, private filesSvc:TicketFilesService){
    //subscription to object observable
    this.void = false;
    this.subscription=data.object.subscribe(
      (objData)=>{
        this.histData=objData;
      }
    );
    //subscription to warrantyData observable
    this.subscription.add(data.warrantyData.subscribe(
      warrData=>{
        this.dataObject=warrData;
        this.serial=warrData.serial;
        this.ticket=warrData.ticket;
      }
    ));
  }

  ngOnInit():void{
    //validation about the serial and ticket
    if(this.serial && !this.ticket){
      this.getTickets();
    }else if(this.ticket && !this.serial){
      this.getOneTicket(this.ticket);
    }else if(this.ticket && this.serial){
      this.getTickets();
    }
  }

  /**
   * unsubscribe of all subscriptions
   */
  ngOndestroy(){
    this.subscription.unsubscribe();
  }

  /**
   * get the tickets array
   */
  getTickets(){
    if (this.ticket) {
      this.ticketSvc.getOneTicket(this.ticket).subscribe(
          res => {
              this.tickets = [];
              this.tickets.push(res);
              this.void = this.tickets.length <= 0;
          }
      );
  } else {
      this.ticketSvc.getTicketByModule(this.serial).subscribe(
          res => {
              this.tickets = res;
              this.void = this.tickets.length <= 0;
          }
      );
  }
  }
  /**
   * get one ticket information
   * @param ticket 
   */
  getOneTicket(ticket:string){
    this.ticket=ticket;
    this.files = [];
    this.oneTicket = null; 
    
    this.ticketSvc.getOneTicket(ticket).subscribe(
        res=>{
            this.oneTicket=res.documents;
            if(!this.serial){
                this.serial=res.module.serial;
                this.getTickets();
            }
            this.getFiles();
        }
    );
}

  /**
   * get the files ticket array
   */
  getFiles(){
    for(const file in this.oneTicket){
      if(!this.oneTicket[file].name){
        break;
      }
      this.files.push(this.oneTicket[file]);
    }
  }

  /**
   * dowload the file selected
   * @param ticket 
   * @param mimetype 
   */
  download(ticket:string,mimetype:string){
    this.filesSvc.dowloadFile(ticket).subscribe(
      res=>{
        const binaryData=[];
        if(res==='not found'){
          console.log('This file does not exist');
        }else{
          binaryData.push(res);
          const filePath = window.URL.createObjectURL(new Blob(binaryData, {type:mimetype}));
          const fileDownload=document.createElement('a');
          fileDownload.href=filePath;
          fileDownload.setAttribute('download',ticket);
          fileDownload.click();
        }
      })
  };

  /**
   * close the modal
   */
  close(){
    this.dataObject.ticket='';
    this.dataObject.serial='';
    this.histData.action='';
    this.histData.show=false;
    this.data.setData(this.dataObject);
    this.data.setObject(this.histData);
  }
}