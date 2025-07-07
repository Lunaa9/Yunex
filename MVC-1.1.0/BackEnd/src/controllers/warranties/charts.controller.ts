import { Request, Response } from "express";
import { handleHttp } from "../../utils/error.handle";
import {getAllDataService,
        getClientDataService,
        getContractDataService,
        getModuleDataService, 
        searchAllService } from "../../services/warranties/charts.service";

/**
 * 
 * @param param0 
 * @param res a data Object{
        contracts:Array<contract>,
        modules:Array<module>,
        tickets:Array<tickets>
    };
 */
export const getAllData = async ({body}:Request, res:Response) =>{
  try{
      const {params} = body;
      const response = await getAllDataService(params);
      response
      ? res.status(200).send({msg:response})
      : res.status(400).send({msg:"Something went wrong"});
  }catch(error){
      console.log(`ERROR GETTING ALL DATA=${error}`);
      handleHttp(res, `ERROR GETTING ALL DATA=${error}`);
  }
}

/**
 * 
 * @param body
 * @returns data Object Array{
        contracts:Array<contract>,
        modules:Array<module>,
        tickets:Array<tickets>
    };
 */
export const getClientData = async ({body}:Request, res:Response) =>{
  try{
      const {client}=body;
      const response = await getClientDataService(client);
      response
      ? res.status(200).send({msg:response})
      : res.status(400).send({msg:"Something went wrong"});
  }catch(error){
      console.log(`ERROR GETTING CLIENT DATA=${error}`);
      handleHttp(res, `ERROR GETTING CLIENT DATA=${error}`);
  }
}

/**
 * 
 * @param body 
 * @returns data Object Array{
        contracts:Array<contract>,
        modules:Array<module>,
        tickets:Array<tickets>
    };
 */
export const getContractData = async ({body}:Request, res:Response) =>{
  try{
      const {contract}=body;
      const response = await getContractDataService(contract);
      response
      ? res.status(200).send({msg:response})
      : res.status(400).send({msg:"Something went wrong"});
  }catch(error){
      console.log(`ERROR GETTING CONTRACT DATA=${error}`);
      handleHttp(res, `ERROR GETTING CONTRACT DATA=${error}`);
  }
}

/**
 * 
 * @param body
 * @returns data Object Array{
        contracts:Array<contract>,
        modules:Array<module>,
        tickets:Array<tickets>
    };
 */
export const getModuleData = async ({body}:Request, res:Response) =>{
  try{
      const {module} = body;
      const response = await getModuleDataService(module);
      response
      ? res.status(200).send({msg:response})
      : res.status(400).send({msg:"Something went wrong"});
  }catch(error){
      console.log(`ERROR GETTING MODULE DATA=${error}`);
      handleHttp(res, `ERROR GETTING MODULE DATA=${error}`);
  }
}

/**
 * 
 * @param body
 * @returns Array wih the search result[
 *  Array<client>,
 *  Array<contract>,
 *  Array<module>,
 *  Array<ticket>
 * ]
 */
export const searchAll = async ({body}:Request,res:Response) => {
    try{
      const {text} = body;
      const response = await searchAllService(text);
      response !== "Nothing found"
      ? res.status(200).send({msg: response})
      : res.status(401).send({msg: response})
    }catch(error){
      console.log(`ERROR SEARCHING SOMETHING: ${error}`);
      handleHttp(res, `ERROR SEARCHING SOMETHING: ${error}`);
    }
}