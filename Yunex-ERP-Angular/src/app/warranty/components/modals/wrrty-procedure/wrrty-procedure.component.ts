import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/warranty/services/data.service';
import { WarrantyticketsService } from 'src/app/warranty/services/warrantytickets.service';

@Component({
  selector: 'app-wrrty-procedure',
  templateUrl: './wrrty-procedure.component.html',
  styleUrls: ['./wrrty-procedure.component.css'],
})
export class WrrtyProcedureComponent {
  processData: any = ''; //The mdal data
  action: string = ''; //the action to take
  status: string = ''; //The process status
  serial: string = ''; //The module serial
  private subscription: Subscription; //The component subscriptions

  constructor(
    private data: DataService,
    private ticketService: WarrantyticketsService
  ) {
    //subscription to object observable
    this.subscription = data.object.subscribe((act) => {
      this.action = act.action;
    });
  }

  ngOnInit() {
    //subscription to warrantyData observable
    this.subscription.add(
      this.data.warrantyData.subscribe((ticket) => {
        this.processData = ticket;
        this.getOneTicket();
      })
    );
  }

  /**
   * unsubscribe all component subscriptions
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * validation to get the ticket information
   */
  getOneTicket() {
    const ticket = this.processData.ticket;
    if (ticket === '') {
      this.serial = this.processData.serial;
    } else if (ticket !== '') {
      this.ticketService.getOneTicket(ticket).subscribe((ticket) => {
        this.status = ticket.status;
        this.serial = ticket.module.serial;
      });
    }
  }

  /**
   * close the modal
   */
  close() {
    const object = {
      module: '',
      action: '',
      show: false,
    };
    this.data.setObject(object);
  }
}
