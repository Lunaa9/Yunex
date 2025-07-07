import {warrantyModules} from '../../interfaces/warranties/modules.interface';
import modulesModel from '../../models/warranty/modules.model';
import warrantyTicketModel from '../../models/warranty/warrantyTicket.model';
import * as xlsx from "xlsx";


/**
 * 
 * @param module  {
 *  serial:String,
    type:String,
    category:String,
    ubication:String,
    functionalUnit:String,
    buy:String,
    startDate:String,
    warrantyTime:String,
    endDate:String,
    startDateProv:String,
    endDateProv:String,
    status:String}
 * @returns A message if the module was created correctly or not
 */
const createModuleService=async (module:warrantyModules)=>{
    try{
        const serialExist= await modulesModel.findOne({serial:module.serial},{serial:1});
        if(serialExist){
            return "This serial exist";
        }else{
            await modulesModel.create(module);
            return "Module created correctly";
        }
    }catch(error){
        console.log(`ERROR CREATING MODULE=${error}`);
        return "Invalid module object";
    }
};


/**
 * 
 * @param serial 
 * @returns A warrantyModule  {
 *  serial:String,
    type:String,
    category:String,
    ubication:String,
    functionalUnit:String,
    buy:String,
    startDate:String,
    warrantyTime:String,
    endDate:String,
    startDateProv:String,
    endDateProv:String,
    status:String}
 */
const getOneModuleService = async (contractNum:string) => {
    const response = await modulesModel.find({contractNum:contractNum},{_id:0});
    return response;
};

/**
 * 
 * @returns A warrantyModule array [{
 *  serial:String,
    type:String,
    category:String,
    ubication:String,
    functionalUnit:String,
    buy:String,
    startDate:String,
    warrantyTime:String,
    endDate:String,
    startDateProv:String,
    endDateProv:String,
    status:String}]
 */
const getAllModuleService = async () => {
    const response = await modulesModel.find({});
    return response;
};

/**
 * 
 * @param module  {
 *  serial:String,
    type:String,
    category:String,
    ubication:String,
    functionalUnit:String,
    buy:String,
    startDate:String,
    warrantyTime:String,
    endDate:String,
    startDateProv:String,
    endDateProv:String,
    status:String}
 * @returns A message if the module was updated correctly or not
 */
const updateModuleService = async (module:warrantyModules)=>{
    const response = await modulesModel.findOneAndUpdate({serial:module.serial},module);
    await warrantyTicketModel.updateMany({"module.serial":module.serial},{$set:{module:module}});
    if (response){
        return "Module updated correctly";
    }else{
        return "NOT MODULE";
    }
};


/**
 * 
 * @param serial 
 * @returns A message if the modules was deleted or not
 */
const deleteModuleService = async (serial:string)=>{
    const response = await modulesModel.deleteOne({serial:serial});
    if (response){
        return "Module deleted correctly";
    }else {
        return "NOT MODULE"
    }
};

/**
 * 
 * @param file 
 * @returns if the data was upload correctly
 */
const excelToJsonService = async (file:any) =>{
    const binaryData=file.data;
    const excel=xlsx.read(binaryData,{type:'buffer'});
    const pageName=excel.SheetNames;
    const data=xlsx.utils.sheet_to_json(excel.Sheets[pageName[0]]); 
    const json:Array<any>=data;
    const newData:Array<any>=[];
      for(let x of json){
        if(!x.purchaseOrder){
            x.purchaseOrder={name:'',file:'',phase:'',mimetype:'',user:''};
        } 
        const keys = Object.keys(x);
        if(keys.length===15){
          if(!x.serial) return false;
          if(!x.name) return false;
          if(!x.contractNum) return false;
          if(!x.clientName) return false;
          if(!x.type) return false;
          if(!x.category) return false;
          if(!x.ubication) return false;
          if(!x.functionalUnit) return false;
          if(!x.startDate) return false;
          if(!x.warrantyTime) return false;
          if(!x.endDate) return false;
          if(!x.startDateSupp) return false;
          if(!x.endDateSupp) return false;
          if(!x.status) return false;
          newData.push(x);
        }else{
          return false;
        }
      }
    const response = await modulesModel.insertMany(newData);
    if(response){
      return response;
    }else{
      return false;
    }
  ;}

export {
    createModuleService,
    getOneModuleService,
    getAllModuleService,
    updateModuleService,
    deleteModuleService,
    excelToJsonService
}
