import { Injectable } from '@angular/core';
import { contract } from 'src/app/interfaces/warranties/contract.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class contractService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @param contract
   * @returns boolean value
   */
  newcontract(contract: contract) {
    const url = environment.API_URI + 'contrat/create-contract';
    const peticion = this.http.post(url, { contract }).pipe(
      map((res) => {
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === 'contract create correctly') {
          return true;
        } else {
          return false;
        }
      })
    );
    return peticion;
  }

  /**
   *
   * @returns false or the request response
   */
  getAllContract(): Observable<any> {
    const url = environment.API_URI + 'contrat/get-all-contract';
    const response = this.http.get(url).pipe(
      map((res) => {
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === 'Empty') {
          return false;
        } else {
          return res2.msg;
        }
      })
    );
    return response;
  }

  /**
   *
   * @param client
   * @returns an observable with the request response
   */
  getOneContract(client: string): Observable<any> {
    const url = environment.API_URI + 'contrat/get-contract';
    const response = this.http.post(url, { client }).pipe(
      map((res) => {
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === 'Empty') {
          return false;
        } else {
          return res2.msg;
        }
      })
    );
    return response;
  }

  /**
   *
   * @param contract
   * @returns validate if the contract was updated correctly
   */
  async updateContract(contract: contract): Promise<boolean> {
    const url = environment.API_URI + 'contrat/update-contract';
    try {
      const res = await this.http.put(url, { contract }).toPromise();
      const res2 = JSON.parse(JSON.stringify(res));
      return res2.msg === 'contract updated ok' ? true : false;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }

  /**
   *
   * @param ContractName
   * @returns promise<boolean>
   */
  async deleteClients(ContractName: string): Promise<boolean> {
    const url = environment.API_URI + 'contrat/delete-contract';
    try {
      const res = await this.http
        .delete(url, { body: { ContractName: ContractName } })
        .toPromise();
      const response = JSON.parse(JSON.stringify(res));
      return response.msg === 'contract delete correctly' ? true : false;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }
}
