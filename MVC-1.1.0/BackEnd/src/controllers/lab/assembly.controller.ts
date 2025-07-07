import { createAssemblyService,
    getAllAssembliesService,
    getOneAssemblyService,
    updateAssemblyService,
    deleteAssemblyService,
    uploadExcelService } from "../../services/lab/assembly.service";
import { Response, Request } from "express";
import { handleHttp } from "../../utils/error.handle";

/**
 * A message according if the assembly was created correctly or it's already exists
 * @param param0 
 * @param res string
 */
export const createAssembly = async({body}:Request,res:Response) => {
    try{
        const {...assembly} = body;
        const response = await createAssemblyService(assembly);
        response==="Assembly created correctly"
        ? res.status(200).send({msg:response})
        : res.status(401).send({msg:response});
    }catch(error){
        console.log(`CAN'T CREATE NEW ASSEMBLY: ${error}`);
        handleHttp(res, `ERROR CREATING NEW ASSEMBLY=${error}`);
    }
}

/**
 * 
 * @param req 
 * @param res Get an assembly array [{consecutive:number,
    startDate:string,
    graph:string,
    assemblyType:string,
    amount:number,
    status:string,
    contract:string,
    client:string,
    senderName:string,
    expectedOutDate:string,
    realEndDate:string,
    complianceDate:boolean,
    received:string,
    assemblyRes:string,
    serviceRes:string}]
 */
export const getAllAssemblies = async(req:Request,res:Response) => {
    try{
        const response = await getAllAssembliesService();
        response
        ? res.status(200).send({msg:response})
        : res.status(401).send({msg:"Empty"});
    }catch(error){
        console.log(`ERROR GETTING ALL ASSEMBLIES: ${error}`);
        handleHttp(res, `ERROR CREATING GETTING ASSEMBLIES=${error}`);
    }
}

/**
 * 
 * @param param0 
 * @param res Get one assembly object {consecutive:number,
    startDate:string,
    graph:string,
    assemblyType:string,
    amount:number,
    status:string,
    contract:string,
    client:string,
    senderName:string,
    expectedOutDate:string,
    realEndDate:string,
    complianceDate:boolean,
    received:string,
    assemblyRes:string,
    serviceRes:string}
 */
export const getOneAssembly = async({body}:Request,res:Response) => {
    try{
        const {consecutive} = body;
        const response = await getOneAssemblyService(consecutive);
        response
        ? res.status(200).send({msg:response})
        : res.status(401).send({msg:"Empty"});
    }catch(error){
        console.log(`ERROR GETTING THE ASSEMBLY: ${error}`);
        handleHttp(res, `ERROR GETTING THE ASSEMBLY=${error}`);
    }
} 

/**
 * update an Assembly
 * @param param0 
 * @param res A message if the assembly was updated correctly
 */
export const updateAssembly = async({body}:Request,res:Response) => {
    try{
        const {...assembly} = body;
        const response = await updateAssemblyService(assembly);
        response==="Assembly updated correctly"
        ? res.status(200).send({msg:response})
        : res.status(401).send({msg:response});
    }catch(error){
        console.log(`ERROR UPDATING THE ASSEMBLY: ${error}`);
        handleHttp(res, `ERROR UPDATING ASSEMBLY=${error}`);
    }
}

/**
 * 
 * @param param0 
 * @param res A message if the assembly was deleted correctly
 */
export const deleteAssembly = async({body}:Request,res:Response) => {
    try{
        const {consecutive} = body;
        const response = await deleteAssemblyService(consecutive);
        response==="Assembly deleted correctly"
        ? res.status(200).send({msg:response})
        : res.status(401).send({msg:response});
    }catch(error){
        console.log(`ERROR DELETING THE ASSEMBLY: ${error}`);
        handleHttp(res, `ERROR DELETING ASSEMBLY=${error}`);
    }
}

/**
 * 
 * @param param0 
 * @param res If the data was upload correctly
 */
export const uploadExcel = async ({files}:Request,res:Response) => {
    try{
      const {...excel} = files;
      const {...file} = Object.values(excel)[0];
      const response = await uploadExcelService(file);
      response
      ? res.status(200).send({ msg: "data upload correctly" })
      : res.status(401).send({ msg: "Something went wrong" });
    }catch(error){
      console.log(`ERROR GETTING EXCEL=${error}`);
      handleHttp(res, `ERROR GETTING EXCEL=${error}`);
    }
  }