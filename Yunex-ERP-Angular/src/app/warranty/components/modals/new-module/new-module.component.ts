import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/warranty/services/data.service';
import { Subscription } from 'rxjs';
import { TicketFilesService } from 'src/app/warranty/services/ticket-files.service';
import { WarrantyticketsService } from 'src/app/warranty/services/warrantytickets.service';
import { file } from 'src/app/interfaces/warranties/ticketFiles.interface';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-new-module',
  templateUrl: './new-module.component.html',
  styleUrls: ['./new-module.component.css']
})
export class NewModuleComponent {
  @ViewChild('uploadFile')//Viewchild of uploadFile input
  inputFile!:ElementRef;//An ElementRef variable
  action:any='';//Action to take
  newData:any='';//newData object
  uploadName:string='';//Name to the file uploaded
  disabledButton:boolean=true;//disabledButton validator
  inputText:boolean=false;//inputText validator
  file:string='';//file Ticket
  serial:string='';//Module serial
  newPrice:number=0;//The new module prive value
  finished:boolean=true;//finished validator
  mimetype:string='';//file mimetype
  private token:any=localStorage.getItem('JWT');//The active token
  private decoded:any=jwtDecode(this.token);//The token decoder
  user:string=this.decoded.email;//user logged
  private subscription:Subscription;//All subscription in this component

  constructor(private data:DataService,private fileService:TicketFilesService,private ticketService:WarrantyticketsService){
    //subscription to object observable
    this.subscription = data.object.subscribe(
      act=>{
        this.action=act;
      }
    );
    //subscription to warrantyData observable
    this.subscription.add(data.warrantyData.subscribe(
      wData=>{
        this.newData=wData;
      }
    ))
  }

  /**
   * Unsubscribe from all subscription
   */
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  /**
   * verify if there's a file in the input
   * @param event 
   */
  isFile(event:any){
    if((event.target.files).length>0){
      this.uploadName=event.target.files[0].name;
      this.disabledButton=false;
    };
  };

  /**
   * 
   * @param input delete the file from the input
   */
  deleteFile(input:ElementRef){
    input.nativeElement.value='';
    this.uploadName='';
    this.disabledButton=true;
  }

  /**
   * upload the purchaseOrder file
   * @param event 
   */
  uploadPurchaseOrder(event:any){
    this.inputText=true;
    this.disabledButton=true;
    const ticketFile=new FormData(event.currentTarget);
    this.fileService.createFile(ticketFile).subscribe(
      file=>{
        this.file=file.ticket;
        this.mimetype=file.mimetype;
        this.waterfallUpdate();
      }
    );
  }

  /**
   * Realize the waterfall update
   */
  async waterfallUpdate(){
    const newModule:file={
      name:this.uploadName,
      file:this.file,
      mimetype:this.mimetype,
      user:this.user,
      phase:'Modulo Nuevo'
    }
    const ticket = this.newData.ticket;
    this.ticketService.newModule(ticket,newModule,this.serial,this.newPrice).subscribe(
      res=>{
        if(res){
          this.action.action='';
          this.data.setObject(this.action);
        }else{  
          this.finished=false;
        }
      }
    )
  }

  /**
   * close the component
   */
  close(){
    this.action.action='';
    this.data.setObject(this.action)
  }
}