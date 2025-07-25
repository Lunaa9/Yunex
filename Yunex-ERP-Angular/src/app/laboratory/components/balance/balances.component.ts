import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../../services/charts.service';
import { DataChartsService } from '../../services/data-charts.service';
import { chartAssemblies, chartIncidences, labChartParams } from 'src/app/interfaces/lab/charts.interface';
import { Chart } from 'chart.js'; // Importamos Chart.js para crear la gráfica

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})
export class BalancesComponent implements OnInit {
  btnText: string = 'Mostrar Graficas';
  showCharts: boolean = false;

  years: number[] = [];
  clients: string[] = [];
  contracts: string[] = [];

  data: labChartParams = {
    table: 'incidence',
    year: 0,
    client: '',
    contract: ''
  };

  incidenceData: chartIncidences = {
    total: 0,
    repaired: 0,
    repairing: 0,
    toRepair: 0,
    irreparable: 0,
    approved: 0,
    repairTimeTrue: 0,
    outTimeTrue: 0,
    repairTimeFalse: 0,
    outTimeFalse: 0,
    warrantyTrue: 0,
    warrantyFalse: 0
  };

  assemblyData: chartAssemblies = {
    total: 0,
    trafLight: 0,
    trays: 0,
    SxProt: 0,
    C800: 0,
    C900: 0,
    CST950: 0,
    CSX: 0,
    satisf: 0,
    observ: 0,
    repro: 0,
    dateTrue: 0,
    dateFalse: 0,
    started: 0,
    inProcess: 0,
    finished: 0
  };

  constructor(
    private chartService: DataChartsService,
    private chartsSvc: ChartsService
  ) {}

  ngOnInit() {
    this.genYears();
    this.getBalanceCard(false);
  }

  changeTable() {
    this.data.year = 0;
    this.data.client = '';
    this.data.contract = '';
    this.getBalanceCard(false);
  }

  getBalanceCard(clientDiff: boolean) {
    if (clientDiff) {
      this.data.contract = '';
    }

    this.chartsSvc.getIdentifiers(this.data).subscribe({
      next: res => {
        this.data.client ? this.contracts = res : this.clients = res;
        this.send();
      },
      error: err => {
        console.error('Error al obtener identificadores:', err);
      }
    });
  }
  send() {
    if (this.data.table === 'incidence') {
      this.chartsSvc.getIncidences(this.data.client, this.data.contract, this.data.year).subscribe({
        next: res => {
          this.incidenceData = res;
          this.chartService.setIncidence(this.incidenceData);
        },
        error: err => {
          console.error('Error al obtener incidencias:', err);
        }
      });
    } else if (this.data.table === 'assembly') {
      this.chartsSvc.getAssemblies(this.data.client, this.data.contract, this.data.year).subscribe({
        next: res => {
          this.assemblyData = res;
          this.chartService.setAssembly(this.assemblyData);
        },
        error: err => {
          console.error('Error al obtener ensambles:', err);
        }
      });
    }
  }

  genYears() {
    const today = new Date();
    const lastYear = new Date(today.getFullYear(), 9, 1); // Octubre = mes 9
    const endYear = today >= lastYear ? today.getFullYear() + 1 : today.getFullYear();

    for (let x = 2020; x <= endYear; x++) {
      this.years.push(x);
    }
  }

  toggleCharts() {
    this.showCharts = !this.showCharts;
    this.btnText = this.showCharts ? 'Ocultar Graficas' : 'Mostrar Graficas';
  }
}
