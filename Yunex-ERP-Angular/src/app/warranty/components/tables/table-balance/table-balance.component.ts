import { Component } from '@angular/core';
import { ChartsService } from 'src/app/warranty/services/charts.service';
import { chartData, ParamsChart, warrantyChart } from 'src/app/interfaces/warranties/charts.interface';
import { DataService } from 'src/app/warranty/services/data.service';

@Component({
  selector: 'app-table-balance',
  templateUrl: './table-balance.component.html',
  styleUrls: ['./table-balance.component.css']
})
export class TableBalanceComponent {
  balanceData:chartData={//balance object
    client:'',
    contract:'',
    module:'',
    year:''
  };
  mainData:ParamsChart={//Filter data
    clients:[],
    contracts:[],
    modules:[],
    tickets:0
  };
  years:Array<Number>=[];//years aray
  show:boolean=false;//show validator
  btnTxt:string='Mostrar Gráficas';//Button charts content
  cantCli:number=0;//The number the clients
  cantCont:number=0;//The number the contracts
  cantModl:number=0;//The number the modules
  cantTick:number=0;//The number the tickets 

  constructor(private chartSvc:ChartsService, private data:DataService){}

  ngOnInit(){
    this.controller();
  }

  /**
   * validate whats request realize
   */
  controller(){
    if(this.balanceData.client && !this.balanceData.contract){
      this.client();
    }else if(this.balanceData.contract && !this.balanceData.module){
      this.contract();
    }else if(this.balanceData.module){
      this.module();
    }else{
      this.all();
    }
  }
  /**
   * get all data
   */
  all(){
    this.chartSvc.getAllData(this.balanceData).subscribe(
      res=>{
        this.setChartData(res);
      }
    );
  };

  /**
   * get data around the client
   */
  client(){
    this.chartSvc.getClientData(this.balanceData).subscribe(
      res=>{
        this.setChartData(res);
      }
    );
  };

  /**
   * get data around the contract
   */
  contract(){
    this.chartSvc.getContractData(this.balanceData).subscribe(
      res=>{
        this.setChartData(res);
      }
    );
  }

  /**
   * get data around the module
   */
  module(){
    this.chartSvc.getModuleData(this.balanceData).subscribe(
      res=>{
        this.setChartData(res);
      }
    );
  }


  setChartData(data:warrantyChart){
    const params=data.params;
    if(!this.balanceData.client){
      this.mainData.clients=params.clients;
      this.cantCli=params.clients.length;
      this.cantCont=params.contracts.length;
      this.cantModl=params.modules.length;
      this.cantTick=params.tickets;
    }else if(!this.balanceData.contract){
      this.mainData.contracts=params.contracts;
    }else if(!this.balanceData.module){
      this.mainData.modules=params.modules;
    }
    this.data.setDataChart(data);
  }

  reset(){
    if(!this.balanceData.client){
      this.balanceData.contract='';
    }if(!this.balanceData.contract){
      this.balanceData.module='';
    }if(!this.balanceData.module){
      this.balanceData.year='';
    }else{
      this.genYears();
    }
    this.controller();
  }

  /**
   * generate the years until the currectly business year
   */
  genYears(){
    const today=new Date();
    let endYear:number=0;
    const lastYear=new Date(today.getFullYear(),9,1);
    if(today>=lastYear){
      endYear=today.getFullYear()+1;
    }else{
      endYear=today.getFullYear();
    }
    for(let x=2010;x<=endYear;x++){
      this.years.push(x);
    }
  }

  /**
   * show or hide the charts component
   * @param show 
   */
  charts(show:boolean){
    if(show){
      this.btnTxt='Mostrar Graficas';
      this.show=false;
    }else{
      this.btnTxt='Ocultar Graficas';
      this.show=true;
    }
  }
}