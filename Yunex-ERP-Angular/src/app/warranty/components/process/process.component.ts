import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/warranty/services/data.service';
import { WarrantyticketsService } from 'src/app/warranty/services/warrantytickets.service';
import { TicketFiles } from 'src/app/interfaces/warranties/ticketFiles.interface';
import { TicketFilesService } from 'src/app/warranty/services/ticket-files.service';
import { Actions } from 'src/app/interfaces/warranties/actions.interface';
import jwtDecode from 'jwt-decode';
import { updateObj } from 'src/app/interfaces/warranties/warrantyTicket.interface';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css'],
})
export class ProcessComponent {
  @ViewChild('uploadFile', { static: true }) //viewchild of uploadFile
  inputFile!: ElementRef; //ElementRef variable
  files: TicketFiles = {
    //Ticket files object
    started: { name: '', file: '', phase: 'Iniciado', mimetype: '', user: '' },
    accepted: { name: '', file: '', phase: 'Aceptado', mimetype: '', user: '' },
    waiting: { name: '', file: '', phase: 'Esperando', mimetype: '', user: '' },
    storage: { name: '', file: '', phase: 'Almacen', mimetype: '', user: '' },
    sendingSupplier: {
      name: '',
      file: '',
      phase: 'Enviando',
      mimetype: '',
      user: '',
    },
    supplier: {
      name: '',
      file: '',
      phase: 'Proveedor',
      mimetype: '',
      user: '',
    },
    laboratory: {
      name: '',
      file: '',
      phase: 'Laboratorio',
      mimetype: '',
      user: '',
    },
    newModule: {
      name: '',
      file: '',
      phase: 'Nuevo Modulo',
      mimetype: '',
      user: '',
    },
    solved: {
      name: '',
      file: '',
      phase: 'Solucionado',
      mimetype: '',
      user: '',
    },
    finished: {
      name: '',
      file: '',
      phase: 'Finalizar',
      mimetype: '',
      user: '',
    },
    approved: { name: '', file: '', phase: 'Aprobar', mimetype: '', user: '' },
    warrantyDenied: {
      name: '',
      file: '',
      phase: 'Denegar',
      mimetype: '',
      user: '',
    },
  };
  uploadName: string = ''; //file name
  disabledButton: boolean = true; //button validator
  ticketData: any = ''; //component data
  nextStatus: string = ''; //next process status
  inStorage: boolean = false; //validate if the module there is in the storage
  quality: boolean = false; //quality validator
  keys: Array<any> = []; //array of the file keys
  values: Array<any> = []; //array of the file values
  private token: any = localStorage.getItem('JWT'); //token in the localStorage
  private decoded: any = jwtDecode(this.token); //token decoder
  user: string = this.decoded.email; //user logged
  private subscription: Subscription; //all component subscriptions

  constructor(
    private data: DataService,
    private ticketService: WarrantyticketsService,
    private filesService: TicketFilesService
  ) {
    //subscribe to warrantyData
    this.subscription = data.warrantyData.subscribe((ticket) => {
      this.ticketData = ticket;
    });
  }

  /**
   * take actions according the nextStatus and view
   */
  ngOnInit() {
    this.inStorage = false;
    this.uploadName = '';
    this.subscription.unsubscribe();
    if (this.ticketData.toShow === 'modules') {
      this.subscription.add(
        this.data.object.subscribe((ticket) => {
          this.ticketData = ticket;
          this.nextStatus = 'started';
        })
      );
    } else if (
      this.ticketData.toShow === 'entries' ||
      this.ticketData.toShow === 'finished' ||
      this.ticketData.toShow === 'clients'
    ) {
      this.data.setData(this.ticketData);
      const ticket = this.ticketData.ticket;
      this.takeTicket(ticket);
    }
  }

  /**
   * unsubscribe all component subscriptions
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * take the ticket infomation according teh Id passed
   * @param ticketId
   */
  takeTicket(ticketId: string) {
    this.ticketService.getOneTicket(ticketId).subscribe(
      (ticket) => {
        if (ticket !== undefined) {
          this.files = ticket.documents;
          this.keys = Object.keys(this.files);
          this.values = Object.values(this.files);
          for (let file = 0; file < 12; file++) {
            if (this.values[file].name === '') {
              this.nextStatus = this.keys[file];
              break;
            }
          }
        } else {
          this.nextStatus = 'started';
        }
      },
      (error: HttpErrorResponse) => {
        console.log(`Something went wrong: ${error}`);
      }
    );
  }

  /**
   * active the next button when there is a file
   * @param event
   */
  activeUploadButton(event: any) {
    if (event.target.files.length > 0) {
      this.disabledButton = false;
      this.uploadName = event.target.files[0].name;
    }
  }

  /**
   * delete the file in the input
   * @param input
   */
  deleteFile(input: ElementRef) {
    input.nativeElement.value = '';
    this.uploadName = '';
    this.disabledButton = true;
  }

  /**
   * upload the file and choose the next phase
   * @param event
   */
  upload(event: any) {
    this.disabledButton = true;
    const ticketFile = new FormData(event.currentTarget);
    this.filesService.createFile(ticketFile).subscribe(
      (res) => {
        if (this.nextStatus === 'started') {
          this.files.started.file = res.ticket;
          this.files.started.name = this.uploadName;
          this.files.started.mimetype = res.mimetype;
          this.files.started.user = this.user;
          this.files.newModule.file = 'denied';
          this.files.newModule.name = 'denied';
          this.files.warrantyDenied.file = 'denied';
          this.files.warrantyDenied.name = 'denied';
          this.genWarrantyTicket();
        } else {
          this.files[this.nextStatus as keyof TicketFiles].file = res.ticket;
          this.files[this.nextStatus as keyof TicketFiles].mimetype =
            res.mimetype;
          this.files[this.nextStatus as keyof TicketFiles].user = this.user;
          this.files[this.nextStatus as keyof TicketFiles].name =
            this.uploadName;
          this.updateWarrantyTicket();
        }
      },
      (error: HttpErrorResponse) => {
        console.log(`Something went wrong: ${error}`);
      }
    );
  }

  /**
   * create a new warrantyTicket
   */
  genWarrantyTicket() {
    try {
      const module = this.ticketData.module;
      this.ticketService.createTickets(module, this.files).subscribe(
        (res) => {
          console.log(`Ticket generated correctly ${res}`);
          this.finish();
        },
        (error: HttpErrorResponse) => {
          console.log(`something went wrong: ${error.error}`);
        }
      );
    } catch (error) {
      console.log(`error${error}`);
    }
  }

  /**
   * set if the module is in the storage
   */
  moduleInStorage() {
    if (this.inStorage) {
      this.files.waiting.name = 'denied';
      this.files.waiting.file = 'denied';
      this.nextStatus = 'waiting';
      this.updateWarrantyTicket();
    } else {
      console.log('¿Que haces aqui Fred?');
    }
  }

  /**
   * update the ticket with new information
   */
  updateWarrantyTicket() {
    try {
      const updateObj: updateObj = {
        ticket: this.ticketData.ticket,
        status: this.nextStatus,
        quality: this.quality,
      };
      this.ticketService
        .updateTicket(this.files, updateObj)
        .subscribe((res) => {
          if (
            this.nextStatus === 'finished' ||
            this.nextStatus === 'approved' ||
            this.nextStatus === 'warrantyDenied'
          ) {
            this.finish();
          } else {
            res ? this.ngOnInit() : console.log('Something went wrong');
          }
        });
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
    }
  }

  /**
   * open the newModule modal
   */
  newModule() {
    const object: Actions = {
      module: '',
      action: 'newModule',
      show: true,
    };
    this.data.setObject(object);
  }

  /**
   * Deny the ticket warranty
   */
  denyWarranty() {
    for (const file in this.files) {
      if (this.files[file as keyof TicketFiles].name === '') {
        this.files[file as keyof TicketFiles].name = 'denied';
        this.files[file as keyof TicketFiles].file = 'denied';
      }
    }
    this.nextStatus = 'warrantyDenied';
    this.files.warrantyDenied.name = '';
    this.files.warrantyDenied.file = '';
    this.keys = Object.keys(this.files);
    this.values = Object.values(this.files);
  }

  /**
   * Finish the warranty process
   */
  finish() {
    const object: Actions = {
      module: '',
      action: '',
      show: false,
    };
    this.data.setObject(object);
  }
}
