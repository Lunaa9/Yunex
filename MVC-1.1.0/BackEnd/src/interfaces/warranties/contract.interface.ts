import internal from "stream";

export interface contract {
    clientName:string,
    contractName:string,
    handover:object,
    // seriales:any[],
    initWarranty:string,
    endWarranty:string,
    ceco:number,
    activeWarranty:boolean
}