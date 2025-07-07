import {
    createModuleService,
    getOneModuleService,
    getAllModuleService,
    updateModuleService,
    deleteModuleService,
    excelToJsonService
} from "../../services/warranties/modules.service";
import { Response,Request } from "express";
import { handleHttp } from "../../utils/error.handle";

/**
 * 
 * @param param0 Receives a warrantyModule {
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
 * @param res A message if the module was created correctly or not
 */
export const createModule = async({body}:Request,res:Response)=>{
    try{
        const {warrantyModule}=body;
        if(warrantyModule && warrantyModule.serial){
            const response = await createModuleService(warrantyModule);
            if(response==='This serial exist'){
                res.status(400).send({msg:response});
            }else{
                res.status(200).send({msg:response});
            }
        }
    }catch(error){
        console.log(`ERROR CREATING WARRANTY MODULE=${error}`);
        handleHttp(res,`ERROR CREATING WARRANTY MODULE=${error}`);
    }
};

/**
 * 
 * @param param0 Receives a serial
 * @param res A warrantyModule  {
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
export const getOneModule = async({body}:Request,res:Response)=>{
    try{
        const {contractNum}=body;
        const response= await getOneModuleService(contractNum);
        response
        ? res.status(200).send({msg:response})
        : res.status(400).send({msg:"Not Found"});
    }catch(error){
        console.log(`ERROR GETTIN MODULE=${error}`);
        handleHttp(res,`ERROR GETTING MODULE=${error}`);
    }
};

/**
 * 
 * @param req 
 * @param res A warrantyModules array [{
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
export const getAllModule = async(req:Request,res:Response) =>{
    try{
        const response= await getAllModuleService();
        response
        ? res.status(200).send({msg:response})
        : res.status(400).send({msg:'Empty'});
    }catch(error){
        console.log(`ERROR GETTING WARRANTY MODULES=${error}`);
        handleHttp(res,`ERROR GETTING WARRANTY MODULES=${error}`);
    }
};

/**
 * 
 * @param param0 Receives a warrantyModule  {
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
 * @param res A message if the modules was updated correctly or not
 */
export const updateModule= async({body}:Request,res:Response)=>{
    try{
        const {...warrantyModule}=body;
        const response=await updateModuleService(warrantyModule);
        response === "Module updated correctly"
        ? res.status(200).send({msg:"Module updated correctly"})
        : res.status(400).send({msg:"Error updating the module"})
    }catch(error){
        console.log(`ERROR UPDATING WARRANTY MODULE=${error}`);
        handleHttp(res,`ERROR UPDATING WARRANTY MODULE=${error}`);
    }
};

/**
 * 
 * @param param0 A serial
 * @param res A message if the module was deleted correctly or not
 */
export const deleteModule= async ({body}:Request,res:Response)=>{
    try{
        const {serial}=body;
        const response= await deleteModuleService(serial);
        response === "Module deleted correctly"
        ? res.status(200).send({msg:response})
        : res.status(400).send({msg:response});
    }catch(error){
        console.log(`ERROR DELETING THE MODULE=${error}`);
        handleHttp(res,`ERROR DELETING THE MODULE=${error}`);
    }
}

/**
 * 
 * @param param0 
 * @param res If the data was upload correctly
 */
export const excelToJason = async ({files}:Request,res:Response) => {
    try{
      const {...filesWProcedure} = files;
      const {...file} = Object.values(filesWProcedure)[0];
      const response = await excelToJsonService(file);
      response
      ? res.status(200).send({ msg: "data upload correctly" })
      : res.status(401).send({ msg: "Something went wrong" });
    }catch(error){
      console.log(`ERROR GETTING EXCEL=${error}`);
      handleHttp(res, `ERROR GETTING EXCEL=${error}`);
    }
  }