import warrantyProcedureModel from "../../models/warranty/warrantyProcedure.model";
import {warrantyProcedure} from '../../interfaces/warranties/warrantyProcedure.interface'

/**
 * 
 * @param procedureFile receives a file name: string,
  data: Buffer,
  size: number,
  encoding: string,
  tempFilePath: string,
  truncated: boolean,
  mimetype: string,
  md5: string,
  mv: Array}{
 * @returns string
 */
const createWarrantyProcedureService = async (procedureFile:any)=>{
  try{
    const fileData=await generateProcedureFile(procedureFile);
    await warrantyProcedureModel.create(fileData);
    return "File added correctly";
  }catch(error){
    console.log(`ERROR ADDED FILE=${error}`);
    return "FILE NOT CREATED";
  }
};

/**
 * generate the procedureFile object
 * @param ticketFile 
 * @returns return the procedureFile object
 */
const generateProcedureFile = async (ticketFile:any): Promise<warrantyProcedure> => {
  const tickets = await warrantyProcedureModel.find({},{ticket:1,_id:0});
  const ticketNumber = tickets.map(ticket => parseInt(ticket.ticket.split('-')[1]));
  try{
      const lastTicket = Math.max(...ticketNumber);
      let nextTicket = 1;
      if (lastTicket>0){
          nextTicket = lastTicket+1;
      }
      const ticket = `PF-${nextTicket}`;
      const fileData:warrantyProcedure= {
        ticket:ticket,
        name:await clearName(ticketFile.name),
        fileType:ticketFile.name.slice(ticketFile.name.lastIndexOf('.')+1),
        data:ticketFile.data,
        size:Math.round(ticketFile.size/1000),
        mimetype:ticketFile.mimetype,
        date:new Date().toLocaleDateString('es-CO', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
      };
      return fileData;
  } catch(error){
      console.log(`ERROR GENERATING CREATING FILE OBJECT: ${error}`);
      throw error;
  }
};

/**
 * clear the name format and change it if the name exist
 * @param fileName 
 * @param create 
 * @returns string
 */
const clearName = async(fileName:string):Promise<string> =>{
  fileName=fileName.slice(0,fileName.lastIndexOf('.'));
  const sameFileName = await warrantyProcedureModel.find({},{name:1,_id:0});

  try{
    if(fileName){
      const numName = sameFileName.filter((name)=>{
        const files = name.name.slice(0,name.name.lastIndexOf('('));    
        if(files === fileName || fileName === name.name){
          return 1;
        }
      });
      
      if(numName.length>0) {
        const nFiles = numName.length.toString();
        const newFileName=fileName+`(${nFiles})`;
        return newFileName;
      }
    };
    return fileName;
  }catch(error){
    console.log(`ERROR GIVING A NEW FILE NAME: ${error}`);
    throw error;
  }
};

/**
 * 
 * @param name 
 * @returns warrantyProcedureFile {name: string,
  data: Buffer,
  size: number,
  mimetype: string}
 */
const getOneWarrantyProcedureService = async (name:string)=>{
  const response = await warrantyProcedureModel.findOne({name:name},{data:1,_id:0});
  return response;
};

/**
 * returns all warrantyProcedure files
 * @returns warrantyProcedureFile {name: string,
  data: Buffer,
  size: number,
  mimetype: string}
 */
const getAllWarrantyProcedureService = async ()=>{
  const response = await warrantyProcedureModel.find({},{data:0});
  return response;
};

/**
 * 
 * @param procedureDocument 
 * @returns string
 */
const updateWarrantyProcedureService = async (procedureDocument:any)=>{
  procedureDocument.name=await clearName(procedureDocument.name);
  const response = await warrantyProcedureModel.findOneAndUpdate({name:procedureDocument.name},procedureDocument);
  if(response){
    return "Module warrantyProcedure updated correctly"
  }else{
    return "NOT WARRANTY PROCEDURE UPDATED"
  }
};

/**
 * 
 * @param name 
 * @returns string
 */
const deleteWarrantyProcedureService = async (name:string)=>{
  const response = await warrantyProcedureModel.deleteOne({name:name});
  if(response){
    return "WarrantyProcedure deleted correctly";
  }else{
    return "NOT WARRANTY PROCEDURE DELETED";
  }
}

export {
    createWarrantyProcedureService,
    getOneWarrantyProcedureService,
    getAllWarrantyProcedureService,
    updateWarrantyProcedureService,
    deleteWarrantyProcedureService
}