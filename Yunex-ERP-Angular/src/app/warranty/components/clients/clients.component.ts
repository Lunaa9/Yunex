import { Component } from '@angular/core';
import { client } from 'src/app/interfaces/warranties/client.interface';
import { DataService } from '../../services/data.service';
import { clientService } from '../../services/clients.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  clientsList: client[] = [];//The client list
  clientData:any=null;//The client component data
  void:boolean=false;//The void validator
  private subscription:Subscription;//The client component subscriptions

  constructor(private data: DataService, private clientService: clientService){
    //Subscription to warrantyData
    this.subscription = data.warrantyData.subscribe(
      client=>{
        this.clientData=client;
      }
    )
  }
  
  ngOnInit(): void {
    //Subscription to object and do a validation to get the clients info
    this.subscription.add(this.data.object.subscribe(
      data=>{
        if(!data.show){
          this.getClients();
        }
      }
    ));
  }
  /**
   * Unsubscribe to every subscription saved
   */
  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

  /**
   * Get the list with the clients list
   */
  getClients(){
    this.clientService.getClients().subscribe(
      data => {
        this.clientsList = data;   
        if(this.clientsList.length<=0){
          this.void=true;
        }
      },error => {
        console.log(`error:${error}`);
      }
    )
  }
  
  /**
  * Pass the clientName to get its contracts
  * @param client 
  */
  getOneContract(client: client){
    this.data.setClient(client); 
    this.clientData.client=client.name;
    this.clientData.toShow='contracts';
    this.data.setData(this.clientData);

    
  }
}