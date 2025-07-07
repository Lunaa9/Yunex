import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { WarrantyData } from 'src/app/interfaces/warranties/warrantyData.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-warranty-process',
  templateUrl: './warranty-process.component.html',
  styleUrls: ['./warranty-process.component.css']
})
export class WarrantyProcessComponent {
  tableToShow:string='';//the table that is showing
  isActive:boolean=false;//isActive validator
  isActiveEnd:boolean=false;//isActiveEnd validator
  modal:boolean=false;//modal validator
  private subscription:Subscription;//all component subscriptions

  pageData:WarrantyData={//component data
    client:'',
    contractNum:'',
    serial:'',
    ticket:'',
    toShow:''
  }

  constructor(private data:DataService){
    //subscription to object observable
    this.subscription=data.object.subscribe(
      res=>{
        if(!res.show){
          this.modal=false;
        }
      }
    );
  }

  ngOnInit(): void {
    //subscription to warrantyData observable
    this.subscription.add(this.data.warrantyData.subscribe(data=>{
      this.pageData=data;
      this.tableToShow=data.toShow;
    }));
  }
  
  //unsubscribe all component subscriptons
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  /**
   * change the view to entries
   */
  getTableEntries(){
    this.pageData.toShow='entries';
    this.change();
  }

  /**
   * change the view to modules
   */
  getTableAll(){
    this.pageData.ticket='';
    this.pageData.toShow='modules';
    this.change();
  }

  /**
   * change the view to finished
   */
  getTablefinish(){
    this.pageData.toShow='finished';
    this.change();
  }

  /**
   * change the view to change
   */
  change(){
    this.data.setData(this.pageData);
  }

  /**
   * return to the back page
   */
  backPage(){
    const object:any={//null object
      module:'',
      action:'',
      show:false     
    };
    if(this.tableToShow==='contracts'){
      this.pageData={
        client:'',
        contractNum:'',
        serial:'',
        ticket:'',
        toShow:'clients'
      }
    }else if(this.tableToShow==='modules'){
      this.pageData={
        client:this.pageData.client,
        contractNum:this.pageData.contractNum,
        serial:'',
        ticket:'',
        toShow:'contracts'
      }
    }else if(this.tableToShow==='entries' || this.tableToShow==='finished'){
      this.pageData={
        client:this.pageData.client,
        contractNum:this.pageData.contractNum,
        serial:this.pageData.serial,
        ticket:'',
        toShow:'modules'
      }
    }else{
      window.location.reload();
    }
    this.data.setData(this.pageData);
    this.data.setObject(object);
  }
}