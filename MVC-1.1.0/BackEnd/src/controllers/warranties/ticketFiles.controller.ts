import { Response, Request } from "express";
import {createTicketFileService,
        getOneTicketFileService,
        getAllTicketFileService,        
        updateTicketFileService,
        deleteTicketFileService
} from '../../services/warranties/ticketFiles.service';
import { handleHttp } from "../../utils/error.handle";

/**
 * 
 * @param param0 ticketFile {name: string,
  data: Buffer,
  size: number,
  encoding: string,
  tempFilePath: string,
  truncated: boolean,
  mimetype: string,
  md5: string,
  mv: Array} 
 * @param res A message if the file was added correctly or not
 */
  export const createTicketFile= async ({files}:Request,res:Response)=>{
    try{
      const {...filesWProcedure} = files;
      const {...file} = Object.values(filesWProcedure)[0];
      
      if(file){
        const response = await createTicketFileService(file);
          if(response==="FILE NOT CREATED"){
            res.status(400).send({msg:"Something went wrong"});
          }if(response !== 'FILE NOT CREATED'){
            res.status(200).send({msg:response});
          }
      }
    }catch(error){
      console.log(`ERROR ADDED WARRANTY FILE=${error}`);
      handleHttp(res, `ERROR ADDED WARRANTY FILE=${error}`);
    }
  };
  
  /**
   * 
   * @param param0 name
   * @param res ticketFile {name: string,
    data: Buffer,
    size: number,
    mimetype: string}
   */
  export const getOneTicketFile = async ({body}:Request,res:Response)=>{
    try{
      const {ticket} = body;
      const response = await getOneTicketFileService(ticket);
      response
      ? res.status(200).send(response?.data)
      : res.status(401).send('not found');
    }catch(error){
      console.log(`ERROR GETTING TICKET FILE: ${error}`);
      handleHttp(res, `ERROR GETTING TICKET FILE: ${error}`);
    }
  };
  
  /**
   * send all ticketFiles
   * @param req 
   * @param res ticketFile {name: string,
    data: Buffer,
    size: number,
    mimetype: string}
   */
  export const getAllTicketFile = async (req:Request,res:Response)=>{
    try{
      const response = await getAllTicketFileService();
      response
      ? res.status(200).send({msg:response})
      : res.status(401).send({msg:'empty'});
    }catch(error){
      console.log(`ERROR GETTING ALL TICKET FILE: ${error}`);
      handleHttp(res, `ERROR GETTING ALL TICKET FILE: ${error}`);
    }
  };
  
  /**
   * 
   * @param req ticketFile {name: string,
    data: Buffer,
    size: number,
    mimetype: string}
   * @param res A message if the procedure file was updated correctly or not
   */
  export const updateTicketFile = async (req:Request,res:Response) => {
    try{
      const {...filesWProcedure} = req.files;
      const file = Object.values(filesWProcedure)[0];
      const response = await updateTicketFileService(file);
      response === "Module TicketFile updated correctly"
      ? res.status(200).send({msg:response}) 
      : res.status(401).send({msg:response});
    }catch(error){
      console.log(`ERROR UPDATING TICKET FILE=${error}`);
      handleHttp(res, `ERROR UPTADING TICKET FILE=${error}`);
    }
  };
  
  /**
   * 
   * @param param0 name
   * @param res A message if the document was deleted correctly or not
   */
  export const deleteTicketFile = async ({ body }:Request, res:Response)=>{
    try{
      const { name } = body;
      const response = await deleteTicketFileService(name);
      response === "TicketFile deleted correctly"
      ? res.status(200).send({msg:response})
      : res.status(401).send({msg:response});
  
    } catch(error)  {
      console.log(`ERROR DELETING TICKET FILE: ${error}`);
      handleHttp(res, `ERROR DELETING TICKET FILE: ${error}`);
    }
  };