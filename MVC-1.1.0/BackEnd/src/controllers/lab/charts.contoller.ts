import { getIdentifiersService,
        getIncidencesService,
        getAssembliesService } from "../../services/lab/charts.service";
import { handleHttp } from "../../utils/error.handle";
import { Request, Response } from "express";

/**
 * 
 * @param param0 
 * @param res an array with the according identifiers
 */
export const getIdentifiers = async ({body}:Request, res:Response) => {
    try{
        const {params} = body;
        const response = await getIdentifiersService(params);
        response.length>0
        ? res.status(200).send({msg:response})
        : res.status(401).send({msg:"Not clients"});
    }catch(error){
        console.log(`CAN'T GET THE IDS: ${error}`);
        handleHttp(res, `ERROR GETTING IDS=${error}`);
    }
}

/**
 * 
 * @param param0 
 * @param res return an object with the quantity of charts values
 */
export const getIncidences = async ({body}:Request, res:Response) => {
    try{
        const {client,contractNumber,year} = body;
        const response = await getIncidencesService(client,contractNumber,year);
        response
        ? res.status(200).send({msg:response})
        : res.status(401).send({msg:"Not Incidences"});
    }catch(error){
        console.log(`NOT INCIDENCES: ${error}`);
        handleHttp(res, `ERROR GETTING INCIDENCES=${error}`);
    }
}

/**
 * 
 * @param param0 
 * @param res return an object with the quantity of charts values
 */
export const getAssemblies = async ({body}:Request, res:Response) => {
    try{
        const {client,contract,year} = body;
        const response = await getAssembliesService(client,contract,year);
        response
        ? res.status(200).send({msg:response})
        : res.status(401).send({msg:"Not assemblies"});
    }catch(error){
        console.log(`NOT ASSEMBLIES: ${error}`);
        handleHttp(res, `ERROR GETTING ASSEMBLIES=${error}`);
    }
}