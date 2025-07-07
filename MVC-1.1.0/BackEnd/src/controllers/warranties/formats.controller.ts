import { Response, Request } from "express";
import {
    createFormatFileService,
    getOneFormatFileService,
    getAllFormatFileService,
    updateWarrantyProcedureService,
    deleteFormatFileService
} from "../../services/warranties/formats.service";
import { handleHttp } from "../../utils/error.handle";

/**
 * 
 * @param param0 warrantyFormat File {name: string,
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
export const createFormatFile = async ({files}:Request,res:Response)=>{
  try{
    const {...filesWProcedure} = files;
    const {...file} = Object.values(filesWProcedure)[0];
    
    if(file){
      const response = await createFormatFileService(file);
        if(response==="File added correctly"){
          res.status(200).send({msg:response});
        }if(response === 'FILE NOT CREATED'){
          res.status(400).send({msg:"Something went wrong"});
        }
    }
  }catch(error){
    console.log(`ERROR ADDED FORMAT FILE=${error}`);
    handleHttp(res, `ERROR ADDED FORMAT FILE=${error}`);
  }
};

/**
 * 
 * @param param0 name
 * @param res formatFile {name: string,
  data: Buffer,
  size: number,
  mimetype: string}
 */
export const getOneFormatFile = async ({body}:Request,res:Response)=>{
  try{
    const {name} = body;
    const response = await getOneFormatFileService(name);
    // res.set('Content-Type','application/json');
    response
    ? res.status(200).send(response?.data)
    : res.status(401).send('not found');
  }catch(error){
    console.log(`ERROR GETTING WARRANTY FORMAT FILE: ${error}`);
    handleHttp(res, `ERROR GETTING WARRANTY FORMAT FILE: ${error}`);
  }
};

/**
 * send all formatFiles
 * @param req 
 * @param res formatFiles {name: string,
  data: Buffer,
  size: number,
  mimetype: string}
 */
export const getAllFormatFile = async (req:Request,res:Response)=>{
  try{
    const response = await getAllFormatFileService();
    response
    ? res.status(200).send({msg:response})
    : res.status(401).send({msg:'empty'});
  }catch(error){
    console.log(`ERROR GETTING ALL WARRANTY FORMAT FILE: ${error}`);
    handleHttp(res, `ERROR GETTING ALL WARRANTY FORMAT FILE: ${error}`);
  }
};

/**
 * 
 * @param req formatFile {name: string,
  data: Buffer,
  size: number,
  mimetype: string}
 * @param res A message if the format file was updated correctly or not
 */
export const updateWarrantyProcedure = async (req:Request,res:Response) => {
  try{
    const {...filesWProcedure} = req.files;
    const file = Object.values(filesWProcedure)[0];
    const response = await updateWarrantyProcedureService(file);
    response === "Module formatFile updated correctly"
    ? res.status(200).send({msg:response}) 
    : res.status(401).send({msg:response});
  }catch(error){
    console.log(`ERROR UPDATING WARRANTY FORMAT FILE=${error}`);
    handleHttp(res, `ERROR UPTADING WARRANTY FORMAT FILE=${error}`);
  }
};

/**
 * 
 * @param param0 name
 * @param res A message if the file was deleted correctly or not
 */
export const deleteFormatFile = async ({ body }:Request, res:Response)=>{
  try{
    const { name } = body;
    const response = await deleteFormatFileService(name);
    response === "FormatFile deleted correctly"
    ? res.status(200).send({msg:response})
    : res.status(401).send({msg:response});

  } catch(error)  {
    console.log(`ERROR DELETING WARRANTY FORMAT FILE: ${error}`);
    handleHttp(res, `ERROR DELETING WARRANTY FORMAT FILE: ${error}`);
  }
};                                                                                                          