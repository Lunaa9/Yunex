import { Response, Request } from "express";
import {
    createWarrantyProcedureService,
    getOneWarrantyProcedureService,
    getAllWarrantyProcedureService,
    updateWarrantyProcedureService,
    deleteWarrantyProcedureService
} from "../../services/warranties/warrantyProcedure.service";
import { handleHttp } from "../../utils/error.handle";

/**
 * 
 * @param param0 warrantyProcedureFile {name: string,
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
export const createWarrantyProcedure= async ({files}:Request,res:Response)=>{
  try{
    const {...filesWProcedure} = files;
    const {...file} = Object.values(filesWProcedure)[0];
    
    if(file){
      const response = await createWarrantyProcedureService(file);
        if(response==="File added correctly"){
          res.status(200).send({msg:response});
        }if(response === 'FILE NOT CREATED'){
          res.status(400).send({msg:"Something went wrong"});
        }
    }
  }catch(error){
    console.log(`ERROR ADDED WARRANTY DOCUMENT=${error}`);
    handleHttp(res, `ERROR ADDED WARRANTY DOCUMENT=${error}`);
  }
};

/**
 * 
 * @param param0 name
 * @param res warrantyProcedureFile {name: string,
  data: Buffer,
  size: number,
  mimetype: string}
 */
export const getOneWarrantyProcedure = async ({body}:Request,res:Response)=>{
  try{
    const {name} = body;
    const response = await getOneWarrantyProcedureService(name);
    // res.set('Content-Type','application/json');
    response
    ? res.status(200).send(response?.data)
    : res.status(401).send('not found');
  }catch(error){
    console.log(`ERROR GETTING WARRANTY PROCEDURE FILE: ${error}`);
    handleHttp(res, `ERROR GETTING WARRANTY PROCEDURE FILE: ${error}`);
  }
};

/**
 * send all warrantyProcedureFiles
 * @param req 
 * @param res warrantyProcedureFile {name: string,
  data: Buffer,
  size: number,
  mimetype: string}
 */
export const getAllWarrantyProcedure = async (req:Request,res:Response)=>{
  try{
    const response = await getAllWarrantyProcedureService();
    response
    ? res.status(200).send({msg:response})
    : res.status(401).send({msg:'empty'});
  }catch(error){
    console.log(`ERROR GETTING ALL WARRANTY PROCEDURE FILE: ${error}`);
    handleHttp(res, `ERROR GETTING ALL WARRANTY PROCEDURE FILE: ${error}`);
  }
};

/**
 * 
 * @param req warrantyProcedureFile {name: string,
  data: Buffer,
  size: number,
  mimetype: string}
 * @param res A message if the procedure file was updated correctly or not
 */
export const updateWarrantyProcedure = async (req:Request,res:Response) => {
  try{
    const {...filesWProcedure} = req.files;
    const file = Object.values(filesWProcedure)[0];
    const response = await updateWarrantyProcedureService(file);
    response === "Module warrantyProcedure updated correctly"
    ? res.status(200).send({msg:response}) 
    : res.status(401).send({msg:response});
  }catch(error){
    console.log(`ERROR UPDATING WARRANTY PROCEDURE FILE=${error}`);
    handleHttp(res, `ERROR UPTADING WARRANTY PROCEDURE FILE=${error}`);
  }
};

/**
 * 
 * @param param0 name
 * @param res A message if the document was deleted correctly or not
 */
export const deleteWarrantyProcedure = async ({ body }:Request, res:Response)=>{
  try{
    const { name } = body;
    const response = await deleteWarrantyProcedureService(name);
    response === "WarrantyProcedure deleted correctly"
    ? res.status(200).send({msg:response})
    : res.status(401).send({msg:response});

  } catch(error)  {
    console.log(`ERROR DELETING WARRANTY PROCEDURE FILE: ${error}`);
    handleHttp(res, `ERROR DELETING WARRANTY PROCEDURE FILE: ${error}`);
  }
};