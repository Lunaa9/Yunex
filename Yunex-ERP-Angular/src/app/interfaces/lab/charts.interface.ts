export interface labChartParams{
    table:string,
    year:number,
    client:string,
    contract:string
}

export interface chartIncidences{
    total:number,
    repaired:number,
    repairing:number,
    toRepair:number,
    irreparable:number,
    approved:number,
    repairTimeTrue:number,
    outTimeTrue:number,
    repairTimeFalse:number,
    outTimeFalse:number,
    warrantyTrue:number,
    warrantyFalse:number
}

export interface chartAssemblies{
    total:number,
    trafLight:number,
    trays:number,
    SxProt:number,
    C800:number,
    C900:number,
    CST950:number,
    CSX:number,
    satisf:number,
    observ:number,
    repro:number,
    dateTrue:number,
    dateFalse:number,
    started:number,
    inProcess:number,
    finished:number
}

export interface dataChart{
    labels:Array<string>,
    data:Array<number>
}

export interface incidenceCharts{
    status:dataChart,
    repairTime:dataChart,
    outTime:dataChart,
    warranty:dataChart
}

export interface assemblyCharts{
    status:dataChart,
    type:dataChart,
    received:dataChart,
    compliDate:dataChart
}