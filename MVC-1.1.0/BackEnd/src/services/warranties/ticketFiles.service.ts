import ticketFilesModel from '../../models/warranty/ticketFiles.model';
import { warrantyProcedure } from '../../interfaces/warranties/warrantyProcedure.interface';
import { response } from 'express';

/**
 * 
 * @param ticketFile receives a file: string,
  data: Buffer,
  size: number,
  encoding: string,
  tempFilePath: string,
  truncated: boolean,
  mimetype: string,
  md5: string,
  mv: Array}
 * @returns string
 */
const createTicketFileService = async (ticketFile:any)=>{
  try{
    const fileData=await generateTicketFile(ticketFile);
    const file = await ticketFilesModel.create(fileData);
    const response = {ticket:file.ticket,mimetype:file.mimetype};
      return response;
    }catch(error){
      console.log(`ERROR ADDED FILE=${error}`);
      return "FILE NOT CREATED";
    }
};

/**
 * generate the ticketFile object
 * @param ticketFile 
 * @returns return the ticktFile object
 */
const generateTicketFile = async (ticketFile:any): Promise<warrantyProcedure> => {
  const tickets = await ticketFilesModel.find({},{ticket:1,_id:0});
  const ticketNumber = tickets.map(ticket => parseInt(ticket.ticket.split('-')[1]));
  try{
    const lastTicket = Math.max(...ticketNumber);
      let nextTicket = 1;
      if (lastTicket>0){
        nextTicket = lastTicket+1;
      }
      const ticket = `TF-${nextTicket}`;
      const fileData:warrantyProcedure= {
        ticket:ticket,
        name:await clearName(ticketFile.name),
        fileType:ticketFile.name.slice(ticketFile.name.lastIndexOf('.')+1),
        data:ticketFile.data,
        size:Math.round(ticketFile.size/1000),
        mimetype:ticketFile.mimetype,
        date:new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
      };
      return fileData;
  }catch(error){
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
  const sameFileName = await ticketFilesModel.find({},{name:1,_id:0});     
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
* @returns ticketFile {name: string,
  data: Buffer,
  size: number,
  mimetype: string}
*/
const getOneTicketFileService = async (ticket:string)=>{
  const response = await ticketFilesModel.findOne({ticket:ticket},{data:1,_id:0});
  return response;
};
      
/**
* returns all ticket files
* @returns ticketFile {name: string,
  data: Buffer,
  size: number,
  mimetype: string}
*/
const getAllTicketFileService = async ()=>{
  const response = await ticketFilesModel.find({},{data:0});
  return response;
};
      
/**
  * 
  * @param ticketFile 
  * @returns string
  */
const updateTicketFileService = async (ticketFile:any)=>{
  ticketFile.name=await clearName(ticketFile.name);
  const response = await ticketFilesModel.findOneAndUpdate({name:ticketFile.name},ticketFile);
  if(response){
    return "Module TicketFile updated correctly"
  }else{
    return "NOT WARRANTY PROCEDURE UPDATED"
  }
};
      
/**
  * 
  * @param name 
  * @returns string
  */
const deleteTicketFileService = async (name:string)=>{
  const response = await ticketFilesModel.deleteOne({name:name});
  if(response){
    return "TicketFile deleted correctly";
  }else{
    return "NOT WARRANTY PROCEDURE DELETED";
  }
};
    
export {
  createTicketFileService,
  getOneTicketFileService,
  getAllTicketFileService,
  updateTicketFileService,
  deleteTicketFileService
}