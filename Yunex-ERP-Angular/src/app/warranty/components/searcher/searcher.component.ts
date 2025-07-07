import { Component } from '@angular/core';
import { ChartsService } from '../../services/charts.service';
import { DataService } from '../../services/data.service';
import { WarrantyData } from 'src/app/interfaces/warranties/warrantyData.interface';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent {
  searchParams:string='';// params fo search
  resSearch: any[] = [];// aray of search result
  focus:boolean=false;// focus validator
  element:WarrantyData={//element searcher
    client:'',
    contractNum:'',
    serial:'',
    ticket:'',
    toShow:''
  };

  constructor(private data:DataService,private chartSvc:ChartsService){}

  //do validations according the params and get the resSearch
  search(){
    if(this.searchParams){
      this.chartSvc.search(this.searchParams).subscribe(
        res=>{
          this.resSearch=res;
          this.focus=true;
        }
      );
    }else{
      this.resSearch=[];
    }
  }

  /**
   * 
   * @param element go to the component accoding the result selected
   */
  selected(element:any){
    if(element.NIT){
      this.element.client=element.name;
      this.element.toShow='contracts';
      this.data.setData(this.element);
    }else if(element.contractName){
      this.element.client=element.clientName;
      this.element.contractNum=element.contractName;
      this.element.toShow='modules';
      this.data.setData(this.element);
    }else if(element.serial){
      this.element.contractNum=element.contractNum;
      this.element.toShow='modules';
      this.data.setData(this.element);
    }else if(element.ticket){
      this.element.contractNum=element.module.contractNum;
      this.element.serial=element.module.serial;
      if(element.status==='finished'
      ||element.status==='approved'
      ||element.status==='warrantyDenied'){
        this.element.toShow='finished';
        this.data.setData(this.element);
      }else{
        this.element.toShow='entries';
        this.data.setData(this.element);
      }
    }
  }

  /**
   * focus out
   */
  onFocusOut(){
    if(this.searchParams===''){
      this.resSearch=[];
      this.focus=false;
    }
  }
}