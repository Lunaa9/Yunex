import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  notiDanger:Array<any>=[];//expired notifications
  notiWarning:Array<any>=[];//notifications near to expire
  toApprove:Array<any>=[];//notifications to approve
  noNoti:boolean=true;//are there notifications
  private token:any=localStorage.getItem('JWT');//token in the localStorage
  private decoded:any=jwtDecode(this.token);//token decoder
  role:string=this.decoded.rol;
  redPoint:string=JSON.parse(JSON.stringify(localStorage.getItem('redPoint')));//did the user see the notifications?

  constructor(private notiService: NotificationService){}

  /**
   * get the notifications according the date and status
   */
  ngOnInit(){
    if(this.role==='LAB MANAGER'){
      this.notiService.getLabNoti().subscribe(
        (data) => {
          this.notiDanger=data.danger;
          this.notiWarning=data.warning;
          this.toApprove=data.approved;
          if(this.notiDanger.length>0 || this.notiWarning.length>0 || this.toApprove.length>0){
            this.noNoti=false;
          }
        }
      );
    }else if(this.role==='ADMIN'){
      this.notiService.getWrrtyNoti().subscribe(
        (data) => {
          this.notiDanger=data.danger;
          this.notiWarning=data.warning;
          if(this.notiDanger.length>0 || this.notiWarning.length>0){
            this.noNoti=false;
          }
        }
      );
    }
  }

  /**
   * show red point or not
   */

  point(){
    localStorage.setItem('redPoint','false')
    this.redPoint=JSON.parse(JSON.stringify(localStorage.getItem('redPoint')));
  }
}