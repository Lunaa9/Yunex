export interface chartData{
    client:string,
    contract:string,
    module:string,
    year:string
}
export interface dataFormat{
    name:string,
    value:number
}
export interface allData{
    count:Array<dataFormat>,
    active:Array<dataFormat>,
    status:Array<dataFormat>,
    process:Array<dataFormat>,
    quality:Array<dataFormat>,
    compli:Array<dataFormat>,
    new:Array<dataFormat>
}
export interface toServiceChart{
    client:string,
    contract:string,
    module:string,
    ticket:string
}
export interface dataChart{
    labels:Array<string>,
    data:Array<number>
}
export interface ParamsChart{
    clients:Array<string>,
    contracts:Array<string>,
    modules:Array<string>,
    tickets:number
}
export interface warrantyChart{
    params:ParamsChart,
    count:dataChart,
    active:dataChart,
    status:dataChart,
    process:dataChart,
    quality:dataChart,
    compli:dataChart,
    new:dataChart
}