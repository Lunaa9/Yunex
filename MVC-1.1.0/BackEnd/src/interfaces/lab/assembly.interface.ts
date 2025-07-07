export interface assembly{
    consecutive:number,
    startDate:string,
    year:number,
    graph:string,
    assemblyType:string,
    amount:number,
    status:'started'|'inProcess'|'finished',
    contract:string,
    client:string,
    senderName:string,
    expectedOutDate:string,
    realEndDate:string,
    complianceDate:boolean,
    received:string,
    assemblyRes:string,
    serviceRes:string
    
}