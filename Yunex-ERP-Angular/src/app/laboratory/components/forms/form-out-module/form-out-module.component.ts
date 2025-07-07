import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LabService } from '../../../services/lab.service';
import { LabIncidence } from 'src/app/interfaces/lab/labIncidence.interface';

@Component({
  selector: 'app-form-out-module',
  templateUrl: './form-out-module.component.html',
  styleUrls: ['./form-out-module.component.css']
})
export class FormOutModuleComponent {
  ticket: string = '';
  realRepairTime: number = 0;
  status: string = '';
  approved: boolean = false;
  failure: string = '';
  sticker: string = '';
  comments: string = '';
  repairProcedure: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  ticketList: LabIncidence[] = [];
  ticketCache: { [ticket: string]: LabIncidence } = {};

  constructor(private labservice: LabService) { }

  ngOnInit(): void {
    // Load tickets when component initializes
    this.loadTickets();
  }

  loadTickets(): void {
    this.isLoading = true;
    this.labservice.modules().subscribe(
      (data: any) => {
        this.ticketList = data.msg.filter((ticket: { status: string }) => ticket.status === 'repairing');
        this.isLoading = false;
        // Cache all ticket details
        this.ticketList.forEach(ticket => {
          this.ticketCache[ticket.ticket] = ticket;
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading tickets:', error);
        this.isLoading = false;
        // Handle error appropriately
      }
    );
  }


  handleSubmit3(): void {
    this.isLoading = true;
    this.error = null;
    try {
      this.labservice.OutModule(
        this.ticket,
        this.realRepairTime,
        this.status,
        this.approved,
        this.failure,
        this.sticker,
        this.comments,
        this.repairProcedure,
      ).subscribe(
        response => {
          console.log('Entry module update correctly', response);
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          console.error('Error submitting form:', error);
          this.error = 'Error submitting form';
        },
        () => {
          this.isLoading = false;
        }
      );
    } catch (error) {
      console.error('Error:', error);
      this.error = 'Error submitting form';
      this.isLoading = false;
    }
  }
}
