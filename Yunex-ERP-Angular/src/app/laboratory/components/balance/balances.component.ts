import { Component } from '@angular/core';
import { ChartsService } from '../../services/charts.service';
import { DataChartsService } from '../../services/data-charts.service';
import { chartAssemblies, chartIncidences, labChartParams } from 'src/app/interfaces/lab/charts.interface';


@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})
export class BalancesComponent {
  btnText:string='Mostrar Graficas';//The button charts text
  showCharts:boolean=false; //show charts component
  years:Array<number>=[]; //The differents years in the data base
  clients:Array<string>=[]; //The differents clients in the data base
  contracts:Array<string>=[]; //The diffenrents client contracts
  data:labChartParams={//params object
    table:'incidence',
    year:0,
    client:'',
    contract:''
  }
  //this object have the amount of each data
  incidenceData:chartIncidences={
    total:0,
    repaired:0,
    repairing:0,
    toRepair:0,
    irreparable:0,
    approved:0,
    repairTimeTrue:0,
    outTimeTrue:0,
    repairTimeFalse:0,
    outTimeFalse:0,
    warrantyTrue:0,
    warrantyFalse:0
  };
  //this object have the amount of each data
  assemblyData:chartAssemblies={
    total:0,
    trafLight:0,
    trays:0,
    SxProt:0,
    C800:0,
    C900:0,
    CST950:0,
    CSX:0,
    satisf:0,
    observ:0,
    repro:0,
    dateTrue:0,
    dateFalse:0,
    started:0,
    inProcess:0,
    finished:0
  }

  constructor(private chartService:DataChartsService, private chartsSvc:ChartsService ){}

  ngOnInit(){
    this.genYears();
    this.getBalanceCard(false);
  }
    /**
   * get and filter the data balance
   * @param clientDiff 
   */

  /**
   * reset the balance filter
   */  
  changeTable(){
    this.data.year=0;
    this.data.client='';
    this.data.contract='';
    this.getBalanceCard(false);
  }

  getBalanceCard(clientDiff:boolean){
    clientDiff ? this.data.contract='' : null;
    this.chartsSvc.getIdentifiers(this.data).subscribe(
      res => {
        if(this.data.year){
          this.data.client
          ? this.contracts=res
          : this.clients=res;
        }else{
          this.data.client
          ? this.contracts=res
          : this.clients=res;
        }
        this.send();
      }
    )
  }
  
  /**
   * Send the params object to get the respective data and send to the data-chart service
   */
  send(){
    if(this.data.table==='incidence'){
      this.chartsSvc.getIncidences(this.data.client,this.data.contract,this.data.year).subscribe(
        res => {
          this.incidenceData=res;
          this.chartService.setIncidence(this.incidenceData);
        }
      );
    }else if(this.data.table==='assembly'){
      this.chartsSvc.getAssemblies(this.data.client,this.data.contract,this.data.year).subscribe(
        res => {
          this.assemblyData=res;
          this.chartService.setAssembly(this.assemblyData);
        }
      );
    }
  };

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

  /** This function show or hide the statistical charts
  * @returns boolean
  */
  charts(show:boolean){
    if(show){
      this.btnText='Mostrar Graficas';
      this.showCharts=false;
    }else{
      this.btnText='Ocultar Graficas';
      this.showCharts=true;
    }
  }
}