import { labChartParams } from "../../interfaces/lab/charts.interface";
import labIncidencesModel from "../../models/lab/labIncidence.model";
import assemblyModel from "../../models/lab/assembly.model";

/**
 * 
 * @param id 
 * @returns return the next identifiers according the labChartParams
 */
const getIdentifiersService = async (id:labChartParams) => {
    let response:Array<string>=[];
    if(id.table==='incidence'){
        if(id.year){
            id.client
            ? response=await labIncidencesModel.distinct("contractNumber",{client:id.client})
            : response=await labIncidencesModel.distinct("client",{year:id.year});
        }else{
            id.client
            ? response=await labIncidencesModel.distinct("contractNumber",{client:id.client})
            : response=await labIncidencesModel.distinct("client");
        }
    }else if(id.table==='assembly'){
      if(id.year){
            id.client
            ? response=await assemblyModel.distinct("contract",{client:id.client})
            : response=await assemblyModel.distinct("client",{year:id.year});
        }else{
            id.client
            ? response=await assemblyModel.distinct("contract",{client:id.client})
            : response=await assemblyModel.distinct("client");
        }
    }
    return response;
};

/**
 * 
 * @param client 
 * @param contractNumber 
 * @param year 
 * @returns return an object with the quantity of each chart value
 */
const getIncidencesService = async (client:string, contractNumber:string, year:string) => {
    let data:Array<any>;
    const sendData={_id:0, status:1, approved:1, repairTimeCompliance:1,outDateCompliance:1,warranty:1};
    data = await labIncidencesModel.find({},sendData);
    if(!year && client){
      !contractNumber
        ? data = await labIncidencesModel.find({ client:client },sendData)
        : data = await labIncidencesModel.find({ client:client,contractNumber:contractNumber },sendData);
    }else if(year && client){
      !contractNumber
        ? data = await labIncidencesModel.find({ client:client,year:year },sendData)
        : data = await labIncidencesModel.find({ client:client,contractNumber:contractNumber,year:year },sendData);
    } else if(year){
      data = await labIncidencesModel.find({ year:year },sendData);
    }
    const response = await dataIncidences(data);
    return response;
};

/**
 * 
 * @param client 
 * @param contract 
 * @param year 
 * @returns return an object with the quantity of each chart value
 */
const getAssembliesService = async (client:string, contract:string, year:string) => {
    let data:Array<any>;
    const sendData={_id:0, assemblyType:1,status:1,complianceDate:1,received:1}
    data = await assemblyModel.find({},sendData);
    if(!year && client){
      !contract
        ? data = await assemblyModel.find({ client:client },sendData)
        : data = await assemblyModel.find({ client:client,contract:contract },sendData);
    }else if(year && client){
      !contract
        ? data = await assemblyModel.find({ client:client,year:year },sendData)
        : data = await assemblyModel.find({ client:client,contract:contract,year:year },sendData);
    } else if(year){
      data = await assemblyModel.find({ year:year },sendData);
    }
    const response = await dataAssemblies(data);
    return response;
};

/**
 * build the chart data object
 * @param data 
 * @returns an object with the quantity of each chart value
 */
const dataIncidences = async (data:Array<any>) => {
  const globalData={
    total:data.length,
    repaired:0,
    repairing:0,
    toRepair:0,
    irreparable:0,
    approved:0,
    repairTimeTrue:0,
    outTimeTrue:0,
    repairTimeFalse:0,
    outTimeFalse:0,
    warrantyTrue:0,
    warrantyFalse:0
  };
  for(let obj of data){
    if(obj.status==='repairing'){
      globalData.repairing++;
    }else if(obj.status==='to repair'){
      globalData.toRepair++;
    }else if(obj.status==='repaired'){
      globalData.repaired++;
    }else if(obj.status==='irreparable'){
      globalData.irreparable++;
    }
    if(obj.approved){
      globalData.approved++;
    }
    obj.repairTimeCompliance
    ? globalData.repairTimeTrue++
    : globalData.repairTimeFalse++;
    obj.outDateCompliance
    ? globalData.outTimeTrue++
    : globalData.outTimeFalse++;
    obj.warranty
    ? globalData.warrantyTrue++
    :globalData.warrantyFalse++;
  }
  return globalData;
}

/**
 * build the chart data object
 * @param data 
 * @returns an object with the quantity of each chart value
 */
const dataAssemblies = async (data:Array<any>) => {
  const globalData={
    total:data.length,
    trafLight:0,
    trays:0,
    SxProt:0,
    C800:0,
    C900:0,
    CST950:0,
    CSX:0,
    satisf:0,
    observ:0,
    repro:0,
    dateTrue:0,
    dateFalse:0,
    started:0,
    inProcess:0,
    finished:0
  };
  for(let obj of data){
    if(obj.assemblyType==='Semaforos'){
      globalData.trafLight++;
    }else if(obj.assemblyType==='Bandejas'){
      globalData.trays++;
    }else if(obj.assemblyType==='SX Protector'){
      globalData.SxProt++;
    }else if(obj.assemblyType==='Controlador C800'){
      globalData.C800++;
    }else if(obj.assemblyType==='Controlador C900'){
      globalData.C900++;
    }else if(obj.assemblyType==='Controlador ST950'){
      globalData.CST950++;
    }else if(obj.assemblyType==='Controlador SX'){
      globalData.CSX++;
    }
    if(obj.received==='A Satisfaccion'){
      globalData.satisf++;
    }else if(obj.received==='Con Observaciones'){
      globalData.observ++;
    }else if(obj.received==='Reprocesado'){
      globalData.repro++;
    }
    if(obj.status==='started'){
      globalData.started++;
    }else if(obj.status==='inProcess'){
      globalData.inProcess++;
    }else if(obj.status==='finished'){
      globalData.finished++;
    }
    if(obj.complianceDate && obj.status==='finished'){
      globalData.dateTrue++;
    }else if(!obj.complianceDate && obj.status==='finished'){
      globalData.dateFalse++;
    }
  }
  return globalData;
}

export{
    getIdentifiersService,
    getIncidencesService,
    getAssembliesService
}