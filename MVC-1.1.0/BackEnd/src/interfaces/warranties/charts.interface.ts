export interface chartData{
    client:string,
    contract:string,
    module:string,
    year:number
}
export interface dataChart{
    labels:Array<string>,
    data:Array<number>
}
export interface warrantyChart{
    params:object,
    count:dataChart,
    active:dataChart,
    status:dataChart,
    process:dataChart,
    quality:dataChart,
    compli:dataChart,
    new:dataChart
}
export interface ParamsChart{
    clients:Array<string>,
    contracts:Array<string>,
    modules:Array<string>,
    tickets:number
}
export interface ChartValues{
    params:chartData,
    contracts:Array<any>,
    modules:Array<any>,
    tickets:Array<any>,
    year:number
}