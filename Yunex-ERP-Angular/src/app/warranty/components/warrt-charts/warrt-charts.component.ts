import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { ParamsChart, warrantyChart } from 'src/app/interfaces/warranties/charts.interface';
import {Chart,ChartType} from 'chart.js/auto';

@Component({
  selector: 'app-warrt-charts',
  templateUrl: './warrt-charts.component.html',
  styleUrls: ['./warrt-charts.component.css']
})
export class WarrtChartsComponent{
  chartsData! : warrantyChart;//chart's data
  params! :ParamsChart;//params object
  clientData!:Chart;//client data chart
  contActive!:Chart;//active contracts chart
  modlStatus!:Chart;//modules status chart
  tickProcess!:Chart;//tickets pocess chart
  tickQuality!:Chart;//tickets quality chart
  tickCompli!:Chart;//tickets compliance chart
  tickNew!:Chart;//new modules chart
  destroy:boolean=false;//destroy validator
  private subscription:Subscription;//all component subscrition

  constructor(private data:DataService){ 
    this.subscription=Subscription.EMPTY;
  }

  ngOnInit(){
    //subscribe to chartData observable
    this.data.chartData.subscribe(
      res=>{
        this.chartsData=res;
        this.params=res.params;
        this.destroy ? this.destroyData() : null;
        this.genCharts();
      }
    );
  };

  /**
   * unsubscribe all component subscription
   */
  ngOnDestroy(){
    this.subscription.unsubscribe();
  };

  /**
   * destroy the canvas elements from the dom
   */
  destroyData(){
    this.clientData.destroy();
    this.contActive.destroy();
    this.modlStatus.destroy();
    this.tickProcess.destroy();
    this.tickQuality.destroy();
    this.tickCompli.destroy();
    this.tickNew.destroy();
  }

  /**
   * initialize the charts elements
   */
  genCharts(){
    this.destroy=true;
    const count = {labels:this.chartsData.count.labels,
      datasets: [{
        label: 'Cantidad',
        data: this.chartsData.count.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(117,234,172)'
        ],
        borderWidth: 1
      }]
    }
    const warrActive = {
      labels:this.chartsData.active.labels,
      datasets: [{
        label: 'Contratos',
        data: this.chartsData.active.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 2
      }]
    }
    const mdlStatus = {
      labels:this.chartsData.status.labels,
      datasets: [{
        label: 'Modulos',
        data: this.chartsData.status.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(117,234,172)'
        ],
        hoverOffset: 3
      }]
    }
    const process = {labels:this.chartsData.process.labels,
      datasets: [{
        label: 'Tickets',
        data: this.chartsData.process.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(117,234,172)',
          'rgb(32,215,29)'
        ],
        borderWidth: 1
      }]
    }
    const quality = {
      labels:this.chartsData.quality.labels,
      datasets: [{
        label: 'Tickets',
        data: this.chartsData.quality.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 2
      }]
    }
    const compli = {
      labels:this.chartsData.compli.labels,
      datasets: [{
        label: 'Tickets',
        data: this.chartsData.compli.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 2
      }]
    }
    const newMdl = {
      labels:this.chartsData.new.labels,
      datasets: [{
        label: 'Tickets',
        data: this.chartsData.new.data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 2
      }]
    }
    this.clientData = new Chart("client",{
      type:'bar' as ChartType,
      data:count,
      options: {
        responsive:true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.contActive = new Chart("wrrActive",{
      type:'pie' as ChartType,
      data:warrActive,
      options: {
        aspectRatio:0.7,
        responsive:true
      }
    });
    this.modlStatus = new Chart("mdlStatus",{
      type:'pie' as ChartType,
      data:mdlStatus,
      options: {
        aspectRatio:0.7,
        responsive:true
      }
    });
    this.tickProcess = new Chart("process",{
      type:'bar' as ChartType,
      data:process,
      options: {
        responsive:true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.tickQuality = new Chart("quality",{
      type:'pie' as ChartType,
      data:quality,
      options: {
        aspectRatio:0.7,
        responsive:true
      }
    });
    this.tickCompli = new Chart("compli",{
      type:'pie' as ChartType,
      data:compli,
      options: {
        aspectRatio:0.7,
        responsive:true
      }
    });
    this.tickNew = new Chart("new",{
      type:'pie' as ChartType,
      data:newMdl,
      options: {
        aspectRatio:0.7,
        responsive:true
      }
    });
  }
}
