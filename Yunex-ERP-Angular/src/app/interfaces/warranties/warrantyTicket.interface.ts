import { WarrantyModule } from "./warrantyModule.interface"
import { TicketFiles } from "./ticketFiles.interface"

export interface warrantyTicket{
    ticket: string,
    module: WarrantyModule,
    // historical: Array<string>,
    newModulePrice: Number,
    documents: TicketFiles,
    startRequestDate: string,
    startAttentionDate: string,
    estimatedEndDate: string,
    realEndDate: string,
    endDateCompliance: Boolean,
    quality: Boolean,
    status: string
}

export interface updateObj{
    ticket:string,
    status:string,
    quality:boolean
}