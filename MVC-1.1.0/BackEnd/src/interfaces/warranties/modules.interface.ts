import { file } from './ticketFiles.interface';

export interface warrantyModules{
    serial:string,
    name:string,
    contractNum:string,
    clientName:string,
    type:string,
    category:string,
    ubication:string,
    functionalUnit:string,
    purchaseOrder:file,
    startDate:string,
    warrantyTime:string,
    endDate:string,
    startDateSupp:string,
    endDateSupp:string,
    status:string
}