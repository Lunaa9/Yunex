import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ExcelLab } from 'src/app/interfaces/lab/excelLab.interface';
import { LabIncidence } from 'src/app/interfaces/lab/labIncidence.interface';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable()

export class ExporterServices {
    incidences: LabIncidence[] = [];

    constructor(private http: HttpClient) {}

    exportToExcel(json:any[], excelFileName:string): void {
        const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook : XLSX.WorkBook = {
            Sheets: {'data': worksheet},
            SheetNames: ['data']
        };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});
        this.saveAsExcel(excelBuffer, excelFileName);
    }

    /**
     * set the excel table and return it as array
     * @returns excelData array
     */

    async getExcelInfo(): Promise<ExcelLab[]> {
        const url: string = environment.API_URI + 'laboratory/get-all';
        try {
          const res = await this.http.get(url).toPromise();
          const response = JSON.parse(JSON.stringify(res));
          this.incidences = response.msg;
          const excelData: ExcelLab[] = this.incidences.map(
            (incidence: LabIncidence) => {
              const newExcelRow: ExcelLab = {
                ticket: incidence.ticket,
                admissionDate: incidence.admissionDate,
                moduleName: incidence.module.name,
                serial: incidence.module.serial,
                sticker: incidence.sticker,
                equipment: incidence.equipment,
                status: incidence.status,
                approved: incidence.approved,
                city: incidence.city,
                comments: incidence.comments,
                contractNumber: incidence.contractNumber,
                client: incidence.client,
                sender: incidence.sender,
                warranty: incidence.warranty,
                expectedOutDate: incidence.expectedOutDate,
                repairCenterResponsable: incidence.repairCenterResponsable,
                servicesResponsable: incidence.servicesResponsable,
                realOutDate: incidence.realOutDate,
                outDateCompliance: incidence.outDateCompliance,
                estimatedRepairTime: incidence.estimatedRepairTime,
                realRepairTime: incidence.realRepairTime,
                repairTimeCompliance: incidence.repairTimeCompliance,
                year: incidence.year,
                failure: incidence.failure,
                repairProcedure: incidence.repairProcedure,
                repairTechnician: incidence.repairTechnician,
              };
              return newExcelRow;
            }
          );
          return excelData;
        } catch (error) {
          console.error('Error getting data:', error);
          throw error;
        }
      }

    private saveAsExcel(buffer: any, fileName:string ): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXT)
    }
}