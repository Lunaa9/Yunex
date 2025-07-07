import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { TableIndices } from 'src/app/interfaces/warranties/table.interface';
import { LabIncidence } from 'src/app/interfaces/lab/labIncidence.interface';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient) {}

  loading: boolean = false;
  incidences: LabIncidence[] = [];
  show: boolean = false;

  getColumns(): string[] {
    let indices: TableIndices = {
      ticket: '',
      moduleName: '',
      sticker:'',
      serial: '',
      status: '',
      approved:false,
      client: '',
      warranty: '',
      expectedOutDate: '',
      outDateCompliance: false,
      repairTimeCompliance: false,
      technician: '',
    };
    let response: string[] = Object.keys(indices);
    response.push('options');
    return response;
  }

  async getIncidences(): Promise<TableIndices[]> {
    const url: string = environment.API_URI + 'laboratory/get-all';
    try {
      this.loading = true;
      const res = await this.http.get(url).toPromise();
      const response = JSON.parse(JSON.stringify(res));
      this.incidences = response.msg;
      const tableIncidences: TableIndices[] = this.incidences.map(
        (incidence: LabIncidence) => {
          const newIncidence: TableIndices = {
            ticket: incidence.ticket,
            moduleName: incidence.module.name,
            sticker: incidence.sticker,
            serial: incidence.module.serial,
            status: incidence.status,
            approved:incidence.approved,
            client: incidence.client,
            warranty: incidence.warranty,
            expectedOutDate: incidence.expectedOutDate,
            outDateCompliance: incidence.outDateCompliance,
            repairTimeCompliance: incidence.repairTimeCompliance,
            technician: incidence.repairTechnician,
          };
          this.loading = false;
          return newIncidence;
        }
      );
      this.loading = false;
      return tableIncidences;
    } catch(error){
      this.loading = false;
      console.error('Error getting data:', error);
      throw error;
    }
  }
  async deleteIncidence(ticket: string): Promise<boolean> {
    const url: string = environment.API_URI + 'laboratory/delete';
    try {
      const res = await this.http.delete(url, { body: { ticket: ticket } }).toPromise();
      const response = JSON.parse(JSON.stringify(res));
      return response.msg === 'LabModel deleted correctly' ? true : false;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }
}
