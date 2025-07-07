import clientModel from "../../models/warranty/client.model";
import contractModel from "../../models/warranty/contract.model";
import modulesModel from "../../models/warranty/modules.model";
import { ParamsChart, chartData, warrantyChart, ChartValues } from "../../interfaces/warranties/charts.interface";
import warrantyTicketModel from "../../models/warranty/warrantyTicket.model";

/**
 * 
 * @returns Identifier Object{
        clients:Array<client>,
        contracts:Array<contract>,
        modules:Array<module>,
        tickets:Array<tickets>
    };
 */
const getIdentifiersService = async (params:chartData) =>{
    const response:ParamsChart={
        clients:[],
        contracts:[],
        modules:[],
        tickets:0
    };
    if(params.contract){
      response.modules = await modulesModel.distinct("serial",{contractNum:params.contract});
    }else if(params.client){
      response.contracts = await contractModel.distinct("contractName",{clientName:params.client});
    }else{
      response.clients = await clientModel.distinct("name");
      response.contracts = await contractModel.distinct("contractName");
      response.modules = await modulesModel.distinct("serial");
      response.tickets = await warrantyTicketModel.find({},{_id:0,ticket:1}).count();
    }
    return response;
}

/**
 * 
 * @returns a data Object{
        contracts:Array<contract>,
        modules:Array<module>,
        tickets:Array<tickets>
    };
 */
const getAllDataService = async (params:chartData) =>{
  const obj:ChartValues={
    params:params,
    contracts:[],
    modules:[],
    tickets:[],
    year:params.year
  };
  obj.contracts = await contractModel.find({},{_id:0,activeWarranty:1});
  obj.modules = await modulesModel.find({},{_id:0,status:1});
  obj.tickets = await warrantyTicketModel.find({},
    {_id:0,status:1,quality:1,endDateCompliance:1, newModulePrice:1});
  return await createData(obj );
}

/**
 * 
 * @param client 
 * @returns data Object Array{
        contracts:Array<contract>,
        modules:Array<module>,
        tickets:Array<tickets>
    };
 */
const getClientDataService = async (params:chartData) => {
  const obj:ChartValues={
    params:params,
    contracts:[],
    modules:[],
    tickets:[],
    year:params.year
  };
  obj.contracts = await contractModel.find({clientName:params.client},{_id:0,activeWarranty:1});
  if(obj.contracts.length<=0){
    return false;
  }else{
    obj.modules = await modulesModel.find({clientName:params.client},{_id:0,status:1});
    obj.tickets = await warrantyTicketModel.find({"module.clientName":params.client},
    {_id:0,status:1,quality:1,endDateCompliance:1, newModulePrice:1});

    return await createData(obj);
  }
}

/**
 * 
 * @param contract 
 * @returns data Object Array{
        contracts:Array<contract>,
        modules:Array<module>,
        tickets:Array<tickets>
    };
 */
const getContractDataService = async (params:chartData) => {
  const obj:ChartValues={
    params:params,
    contracts:[],
    modules:[],
    tickets:[],
    year:params.year
  };
  obj.contracts = await contractModel.find({clientName:params.client},{_id:0,activeWarranty:1});
  if(obj.contracts.length<=0){
    return false;
  }else{
    obj.modules = await modulesModel.find({contractNum:params.contract},{_id:0,status:1});
    obj.tickets = await warrantyTicketModel.find({"module.contractNum":params.contract},
      {_id:0,status:1,quality:1,endDateCompliance:1, newModulePrice:1});
    
    return await createData(obj);
  }
}

/**
 * 
 * @param modulo 
 * @returns data Object Array{
        contracts:Array<contract>,
        modules:Array<module>,
        tickets:Array<tickets>
    };
 */
const getModuleDataService = async (params:chartData) => {
  const obj:ChartValues={
    params:params,
    contracts:[],
    modules:[],
    tickets:[],
    year:params.year
  };
  obj.contracts = await contractModel.find({clientName:params.client},{_id:0,activeWarranty:1});
  if(obj.contracts.length<=0){
    return false;
  }else{
    obj.modules = await modulesModel.find({contractNum:params.contract},{_id:0,status:1});
    obj.tickets = await warrantyTicketModel.find({"module.serial":params.module},
      {_id:0,status:1,quality:1,endDateCompliance:1, newModulePrice:1,startRequestDate:1});
    
    return await createData(obj);
  }
}

/**
 * 
 * @param obj 
 * @param act 
 * @returns allData Object{
 *  count:Array<dataFormat>,
 *  active:Array<dataFormat>,
 *  status:Array<dataFormat>,
 *  process:Array<dataFormat>,
 *  quality:Array<dataFormat>,
 *  compli:Array<dataFormat>,
 *  new:Array<dataFormat>,
 * }
 */
const createData = async (obj:ChartValues) => {
  const data:warrantyChart={
    params:{},
    count:{
      labels:['Contratos','Modulos','Tickets'],
      data:[0,0,0]
    },
    active:{
      labels:['Activa','Inactiva'],
      data:[0,0]
    },
    status:{
      labels:['Activo','Inactivo','En Proceso'],
      data:[0,0,0]
    },
    process:{
      labels:['Finalizado','Aprobado','Rechazado','En proceso'],
      data:[0,0,0,0]
    },
    quality:{
      labels:['Sin Reprocesos','Con Reprocesos'],
      data:[0,0]
    },
    compli:{
      labels:['Cumplió','No Cumplió'],
      data:[0,0]
    },
    new:{
      labels:['Módulo Nuevo','Reparado'],
      data:[0,0]
    }
  }
  data.params = await getIdentifiersService(obj.params);
  data.count.data[0] = await contractModel.find({},{_id:1}).count();
  data.count.data[1] = await modulesModel.find({},{_id:1}).count();
  data.count.data[2] = await warrantyTicketModel.find({},{_id:1}).count();
  if(obj.contracts){
    for(let x of obj.contracts){
      if(x.activeWarranty){
        data.active.data[0]++;
      }else{
        data.active.data[1]++;
      }
    }
  }if(obj.modules){
    for(let x of obj.modules){
      if(x.status==='active'){
        data.status.data[0]++;
      }else if(x.status==='inactive'){
        data.status.data[1]++;
      }else if(x.status==='inProcess'){
        data.status.data[2]++;
      }
    }
  }if(obj.tickets){
    if(obj.year){
      const newArray:Array<any>=[];
      const stYear = new Date(obj.year-1,9,1);
      const enYear = new Date(obj.year,8,30);
      for(let x of obj.tickets){
        const [y,m,d]=x.startRequestDate.split('-');
        const date = new Date(y,m-1,d);
        if(date>=stYear && date<=enYear){
          newArray.push(x);
        }
      }
      obj.tickets=newArray;
    };
    for(let x of obj.tickets){
      if(x.status==='finished'){
        data.process.data[0]++;
      }else if(x.status==='approved'){
        data.process.data[1]++;
      }else if(x.status==='warrantyDenied'){
        data.process.data[2]++;
      }else{
        data.process.data[3]++;
      }
      if(x.quality){
        data.quality.data[0]++;
      }else{
        data.quality.data[1]++;
      }
      if(x.enddataeCompliance){
        data.compli.data[0]++;
      }else{
        data.compli.data[1]++;
      }
      if(x.newModulePrice>0){
        data.new.data[0]++;
      }else{
        data.new.data[1]++;
      }
    }
  }
  return data;
}

/**
 * 
 * @param text 
 * @returns Array wih the search result[
 *  Array<client>,
 *  Array<contract>,
 *  Array<module>,
 *  Array<ticket>
 * ]
 */
const searchAllService = async (text:string) => {
    const clients:Array<any> = await clientModel.find({name:text});
    const contracts:Array<any> = await contractModel.find({contractName:text},{handover:0});
    const modules:Array<any> = await modulesModel.find({serial:text},{purchaseOrder:0,historical:0});
    const tickets:Array<any> = await warrantyTicketModel.find({ticket:text},{documents:0});
    const response = clients.concat(contracts,modules,tickets);
    if(response.length>0){
      return response;
    }else{
      return "Nothing found";
    }
}

export{
    getIdentifiersService,
    getAllDataService,
    getClientDataService,
    getContractDataService,
    getModuleDataService,
    searchAllService
}