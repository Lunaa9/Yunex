import { warrantyModules } from './modules.interface';
import { TicketFiles } from './ticketFiles.interface';

export interface warrantyTicket{
    ticket: String,
    module: warrantyModules,
    // historical: Array<String>,
    newModulePrice: Number,
    documents: TicketFiles,
    startRequestDate: String,
    startAttentionDate: String,
    estimatedEndDate: String,
    realEndDate: String,
    endDateCompliance: Boolean,
    quality: Boolean,
    status: String
}

export interface updateObj{
    ticket:string,
    status:string,
    quality:boolean
}