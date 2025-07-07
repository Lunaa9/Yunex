import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LabService } from '../../../services/lab.service';
import { LabIncidence } from 'src/app/interfaces/lab/labIncidence.interface';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-form-init-module',
  templateUrl: './form-init-module.component.html',
  styleUrls: ['./form-init-module.component.css'],
})
export class FormInitModuleComponent {
  ticket: string = '';
  status: string = 'repairing';
  repairTechnician: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  ticketList: LabIncidence[] = [];
  selectedLabIncidence: LabIncidence | null = null;
  ticketsAvailable: boolean = false;
  ticketCache: { [ticket: string]: LabIncidence } = {};

  constructor(private labservice: LabService) {
    this.loadAllTickets();
  }

  /**
   * Load all tickets from the backend and cache them.
   * Only tickets with status 'to repair' are loaded.
   * If there are no tickets available, ticketsAvailable is set to false.
   * If there is an error loading tickets, the error message is set.
   */
  loadAllTickets(): void {
    this.labservice.modules().subscribe(
      (data: any) => {
        // Filter tickets to only include those with status 'to repair'
        this.ticketList = data.msg.filter((ticket: { status: string }) => ticket.status === 'to repair');
        // If there are any tickets available, set ticketsAvailable to true
        this.ticketsAvailable = this.ticketList.length > 0;
        // Cache all ticket details         
        this.ticketList.forEach(ticket => {
          this.ticketCache[ticket.ticket] = ticket;
        });
      },
      (error: HttpErrorResponse) => {
        // Log the error
        console.log(error);
        // Set the error message
        this.error = 'Error loading tickets';
      }
    );
  }

  /**
   * Retrieves the details of the selected ticket from the cache and
   * assigns it to the selectedLabIncidence property.
   */
  viewDetails(): void {
    // Check if the ticket exists in the cache
    if (this.ticket in this.ticketCache) {
      // Retrieve the ticket details from the cache
      this.selectedLabIncidence = this.ticketCache[this.ticket];
    }
  }

  /**
   * Handle the form submission for the EntryModule API call.
   * 
   * This function sets the isLoading flag to true, clears the error message,
   * and makes a POST request to the backend with the ticket, status, and
   * repairTechnician values. If the request is successful, the page is reloaded.
   * If there is an error, the error message is set and the isLoading flag is
   * set to false.
   */
  handleSubmit2(): void {
    this.isLoading = true; // Set the isLoading flag to true
    this.error = null; // Clear the error message
    this.labservice.EntryModule(this.ticket, this.status, this.repairTechnician).subscribe(
      (response) => { // If the request is successful
        console.log('Entry module updated correctly', response); // Log the response
        window.location.reload(); // Reload the page
      },
      (error: HttpErrorResponse) => { // If there is an error
        console.log(error.error); // Log the error
        this.error = 'Error submitting form'; // Set the error message
      },
      () => {
        this.isLoading = false; // Set the isLoading flag to false
      }
    );
  }

  /**
   * A trackBy function for Angular's *ngFor directive.
   *
   * @param index - The index of the current iteration.
   * @param item - The current item in the iteration.
   * @returns The unique identifier for the current item.
   */
  trackByTicket(index: number, item: LabIncidence): string {
    // The unique identifier for the current item is its ticket property.
    return item.ticket;
  }
}