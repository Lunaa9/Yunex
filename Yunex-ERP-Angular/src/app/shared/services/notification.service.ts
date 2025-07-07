import { Injectable } from '@angular/core';                                                                                                                                                
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  /**
   * @returns notification data
   */

  getLabNoti(): Observable<any> {
    const url = environment.API_URI + "noti/lab-noti";
    return this.http.get(url).pipe(
      map(res => {
        const res2 = JSON.parse(JSON.stringify(res))
        if(res2.msg === "Something went wrong"){
            return false;
        }else {
            return res2.msg;
        }
      })
    )
  };


  getWrrtyNoti(): Observable<any> {
    const url = environment.API_URI + "noti/wrrty-noti";
    return this.http.get(url).pipe(
      map(res => {
        const res2 = JSON.parse(JSON.stringify(res))
        if(res2.msg === "Something went wrong"){
            return false;
        }else {
            return res2.msg;
        }
      })
    )
  }
}

