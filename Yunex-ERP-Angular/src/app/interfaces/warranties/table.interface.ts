export interface TableIndices {
    ticket: string,
    moduleName: string,
    serial: string,
    status: string,
    approved:boolean,
    city: string,
    warranty: string,
    expectedOutDate: string,
    outDateCompliance: boolean,
    repairTimeCompliance: boolean,
    sticker: string,
    repairProcedure?: string;
    activity?: string;
}
