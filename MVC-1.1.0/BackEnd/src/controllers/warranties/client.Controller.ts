import { Response, Request } from "express";
import { handleHttp } from "../../utils/error.handle";

import { 
    createClientService, 
    deleteClientService, 
    getAllclientsService, 
    getClientService, 
    updateClientService,
    excelToJsonService
} from "../../services/warranties/client.service";

/**
 * Controller to create a client
 * @param param0 Client{name: string, NIT: number, personInCharge: string, direction: string, email: string, phone:number, contract: string} to be created
 * @param res server response how creating went
 */
export const createClient = async ({ body }: Request, res: Response) => {
    try{
      const { client } = body;
      const response = await createClientService(client);
      response === "client create correctly"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR CREATING CLIENT=${e}`);
    handleHttp(res, `ERROR CREATING CLIENT=${e}`);
  }
}


/**
 * Controller to update a client
 * @param param0 {name: string} 
 * @param res server response how updating went
 */
export const updateClient = async ({body}: Request, res: Response ) => {
  try{
    const {...client} = body 
    const response = await updateClientService(client);
    response === "client updated ok"
      ? res.status(200).send({msg: response})
      : res.status(401).send({msg: response})
  }catch (e) {
    console.log(`ERROR UPDATING CLIENT=${e}`);
    handleHttp(res, `ERROR UPDATING CLIENT=${e}`);
  }
}


/**
 * Controller to deleting a client
 * @param param0 {name: string} 
 * @param res server response how deleting went
 */
export const deleteClient = async ({body}: Request, res: Response ) => {
  try {
    const {name} = body
    const response = await deleteClientService(name);
    response === "clent deleted correctly"
      ? res.status(200).send({msg: response})
      : res.status(401).send({msg: response})
  } catch (e) {
    console.log(`ERROR DELETETING CLIENT=${e}`)
    handleHttp(res, `ERROR DELETING CLIENT=${e}`)
  }
}


/**
 * Controller to get a all clients
 * @param req nothing
 * @param res server response how getting all clients went
 */
export const getAllClients = async (req: Request, res: Response) => {
  try{
    const response = await getAllclientsService()
    response !== "Empty"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR GETTING ALL CLIENTS=${e}`);
    handleHttp(res, `ERROR GETTING ALL CLIENTS=${e}`);
  }
}


/**
 * Controller to get a client by name
 * @param param0 { name: string }
 * @param res server response how getting a client went
 */
export const getClient = async ({body}: Request, res: Response) => {
  try{
    const {name} = body
    const response = await getClientService(name)
    response !== "Empty"
    ? res.status(200).send({msg: response})
    : res.status(401).send({msg: response})
  }catch (e) {
    console.log(`ERROR GETTING CLIENT=${e}`);
    handleHttp(res, `ERROR GETTING CLIENT=${e}`);
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