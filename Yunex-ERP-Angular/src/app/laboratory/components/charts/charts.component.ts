import { Component } from '@angular/core';
import { DataChartsService } from '../../services/data-charts.service';
import {Chart,ChartType} from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { assemblyCharts, incidenceCharts } from 'src/app/interfaces/lab/charts.interface';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  incidenceList!:incidenceCharts;//incidence data
  assemblyList!:assemblyCharts;//assembly data
  statusIn!:Chart;//status incidence chart
  expTimeIn!:Chart;//expected repair time chart
  outDateIn!:Chart;//out date chart
  warrIn!:Chart;//warranty incidence chart
  statusAs!:Chart;//status assembly chart
  typeAs!:Chart;//assembly incidence chart
  received!:Chart;//assembly received chart
  compliDate!:Chart;//compliance date chart
  incidence:boolean=false;//incidence validator
  assembly:boolean=false;//assembly validator
  destroy:boolean=false;//destroy validator
  private subscription!:Subscription;//subscription that keep the component subscriptions

  constructor(private chartsService:DataChartsService){}

  ngOnInit(){
    //validator to get charts according the balance component
    this.subscription=this.chartsService.getChartData$.subscribe(
      data=>{
        if(this.destroy)this.destroyCharts();
        if(data.warranty){
          this.incidenceList=data;
          this.incidence=true;
          this.assembly=false;
          this.genIncidences();
        }else{
          this.assemblyList=data;
          this.incidence=false;
          this.assembly=true;
          this.genAssemblies();
        }
    });
  }
  
  ngOnDestroy(){
    //unsubscribe for all the subscriptions done
    this.subscription.unsubscribe();
  }

  /**
   * destroy the canvas element fom the dom
   */
  destroyCharts(){
    if(this.statusIn!==undefined){
      this.statusIn.destroy();
      this.expTimeIn.destroy();
      this.outDateIn.destroy();
      this.warrIn.destroy();
    }else if(this.statusAs!==undefined){
      this.statusAs.destroy();
      this.typeAs.destroy();
      this.received.destroy();
      this.compliDate.destroy();
    }
  }

  /**
   * initialize the incidence charts
   */
  genIncidences(){
    this.destroy=true;
    const statusData = {
      labels:this.incidenceList.status.labels,
      datasets: [{
        label: 'Estados de las Incidencias',
        data: this.incidenceList.status.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(117,234,172)',
          'rgb(32,215,29)',
          'rgb(29,54,215)'
        ],
        borderWidth: 1
      }]
    };
    const rTimeData = {
      labels:this.incidenceList.repairTime.labels,
      datasets: [{
        label: 'Tiempo de Reparación',
        data: this.incidenceList.repairTime.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 2
      }]
    }
    const oTimeData = {
      labels:this.incidenceList.outTime.labels,
      datasets: [{
        label: 'Fecha de Salida',
        data: this.incidenceList.outTime.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 2
      }]
    }
    const warrantyData = {
      labels:this.incidenceList.warranty.labels,
      datasets: [{
        label: 'Garantía',
        data: this.incidenceList.warranty.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 2
      }]
    }
    this.statusIn = new Chart("status",{
      type:'bar' as ChartType,
      data:statusData,
      options: {
        responsive:true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.expTimeIn = new Chart("expTime",{
      type:'pie' as ChartType,
      data:rTimeData,
      options: {
        aspectRatio:0.7,
        responsive:true
      }
    });
    this.outDateIn = new Chart("outDate",{
      type:'pie' as ChartType,
      data:oTimeData,
      options: {
        aspectRatio:0.7,
        responsive:true
      }
    });
    this.warrIn = new Chart("warranty",{
      type:'pie' as ChartType,
      data:warrantyData,
      options: {
        aspectRatio:0.7,
        responsive:true
      }
    });
  };

  /**
   * initialize the assembly charts
   */
  genAssemblies(){
    const typeData = {
      labels:this.assemblyList.type.labels,
      datasets: [{
        label: 'Tipos de Ensambles',
        data: this.assemblyList.type.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(117,234,172)',
          'rgb(32,215,29)',
          'rgb(29,54,215)',
          'rgb(245,230,24)',
          'rgb(245,24,216)'
        ],
        borderWidth: 1
      }]
    };
    const statusData = {
      labels:this.assemblyList.status.labels,
      datasets: [{
        label: 'Estados de Ensambles',
        data: this.assemblyList.status.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(117,234,172)'

        ],
        hoverOffset: 3
      }]
    }
    const receivedData = {
      labels:this.assemblyList.received.labels,
      datasets: [{
        label: 'Estado Recibido',
        data: this.assemblyList.received.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(117,234,172)'
        ],
        hoverOffset: 3
      }]
    }
    const compliData = {
      labels:this.assemblyList.compliDate.labels,
      datasets: [{
        label: 'Fecha de Finalización',
        data: this.assemblyList.compliDate.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 2
      }]
    }
    this.typeAs = new Chart("typeAs",{
      type:'bar' as ChartType,
      data:typeData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.statusAs = new Chart("statusAs",{
      type:'pie' as ChartType,
      data:statusData,
      options: {
        aspectRatio:0.7
      }
    });
    this.received = new Chart("received",{
      type:'pie' as ChartType,
      data:receivedData,
      options: {
        aspectRatio:0.7
      }
    });
    this.compliDate = new Chart("compliDate",{
      type:'pie' as ChartType,
      data:compliData,
      options: {
        aspectRatio:0.7
      }
    });
  }
}
