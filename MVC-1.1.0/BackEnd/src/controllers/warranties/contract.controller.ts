import { Response, Request } from "express";
import { handleHttp } from "../../utils/error.handle";
import { 
    createContractService,
    updateContractService,
    deleteContractService,
    getAllContractService,
    getContractByClientService
} from "../../services/warranties/contract.service";

/**
 * Controller to create a contract
 * @param param0 contract{ handover:object,
    seriales:any[],
    initWarranty:string,
    endWarranty:string,
    contractName:string,
    Ceco:number,
    modules:object,
    Tickets:any[]} to be created
 * @param res server response how creating went
 */

export const createContract = async ({ body }: Request, res: Response) => {
    try {
        const { contract } = body;
        const response = await createContractService(contract);
    response === "contract create correctly"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });    
  } catch (e) {
    console.log(`ERROR CREATING CONTRACT=${e}`);
    handleHttp(res, `ERROR CREATING CONTRACT=${e}`);
  }
}


/**
 * Controller to update a contract
 * @param param0 {contractName: string} 
 * @param res server response how updating went
 */
export const updateContract = async ({body}: Request, res: Response ) => {
  try{
    const {contract} = body 
    const response = await updateContractService(contract);
    response === "contract updated ok"
      ? res.status(200).send({msg: response})
      : res.status(401).send({msg: response})
  }catch (e) {
    console.log(`ERROR UPDATING CONTRACT=${e}`);
    handleHttp(res, `ERROR UPDATING CONTRACT=${e}`);
  }
}


/**
 * Controller to deleting a contract
 * @param param0 {contractName: string} 
 * @param res server response how deleting went
 */
export const deleteContract = async ({body}: Request, res: Response ) => {
  try {
    const {contractName} = body
    const response = await deleteContractService(contractName);
    response === "contract deleted correctly"
      ? res.status(200).send({msg: response})
      : res.status(401).send({msg: response})
  } catch (e) {
    console.log(`ERROR DELETETING CONTRACT=${e}`)
    handleHttp(res, `ERROR DELETING CONTRACT=${e}`)
  }
}


/**
 * Controller to get a all contract
 * @param req nothing
 * @param res server response how getting all contract went
 */
export const getAllContract = async (req: Request, res: Response) => {
  try{
    const response = await getAllContractService()
    response !== "Empty"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR GETTING ALL CONTRACT=${e}`);
    handleHttp(res, `ERROR GETTING ALL CONTRACT=${e}`);
  }
}


/**
 * Controller to get a contract by contractName
 * @param param0 { contractName: string }
 * @param res server response how getting a contract went
 */
export const getContractByClient = async ({body}: Request, res: Response) => {
  try{
    const {client} = body;
    const response = await getContractByClientService(client);

    response !== "Empty"
    ? res.status(200).send({msg: response})
    : res.status(401).send({msg: response})
  }catch (e) {
    console.log(`ERROR GETTING CONTRACT=${e}`);
    handleHttp(res, `ERROR GETTING CONTRACT=${e}`);
  }
}
