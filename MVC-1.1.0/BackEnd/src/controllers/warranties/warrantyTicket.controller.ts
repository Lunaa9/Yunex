import {
    createWarrantyTicketService,
    getTicketByContractService,
    getOneWarrantyTicketService,
    getAllWarrantyTicketService,
    updateWarrantyTicketService,
    deleteWarrantyTicketService,
    getTicketsByModuleService,
    newModuleService
} from "../../services/warranties/warrantyTicket.service";
import { Response, Request, request } from "express";
import { handleHttp } from "../../utils/error.handle";


/**
 * 
 * @param param0 Receives a warrantyTicket {
    ticket: String,
    module: Object,
    historical: Array<String>,
    newModulePrice: Number,
    documents: Array<any>,
    startRequestDate: String,
    startAttentionDate: String,
    estimatedEndDate: String,
    realEndDate: String,
    endDateCompliance: Boolean,
    quality: Boolean
    status: String}
 * @param res A message if the warrantyTicket was created correctly or not
 */
export const createWarrantyTicket = async ({body}:Request, res: Response)=>{
 try{
    const {ticketModule, files}=body;
    const response = await createWarrantyTicketService(ticketModule,files);
    if(response === "Warranty ticket created correctly"){
      res.status(200).send({ msg: response});
    }else{
      res.status(400).send({msg: "Invalid warranty ticket object"});
    }
}catch (error){
  console.log(`ERROR CREATING WARRANTY TICKET=${error}`);
  handleHttp(res, `ERROR CREATING WARRANTY TICKET=${error}`);
 }
};

/**
 * 
 * @param param0 Receives a contractNum
 * @param res A warrantyTicket {
    ticket: String,
    module: Object,
    historical: Array<String>,
    newModulePrice: Number,
    documents: Array<any>,
    startRequestDate: String,
    startAttentionDate: String,
    estimatedEndDate: String,
    realEndDate: String,
    endDateCompliance: Boolean,
    quality: Boolean
    status: String}
 */
export const getTicketByContract = async ({ body }: Request, res: Response) => {
    try {
      const { contractNum } = body;
      const response = await getTicketByContractService(contractNum);
      response
        ? res.status(200).send({ msg: response })
        : res.status(401).send({ msg: "Not found" });
    } catch (e) {
      console.log(`ERROR GETTING WARRANTY TICKET=${e}`);
      handleHttp(res, `ERROR GETTING WARRANTY TICKET=${e}`);
    }
};

/**
 * 
 * @param param0 Receives a serial
 * @param res A warrantyTicket {
    ticket: String,
    module: Object,
    historical: Array<String>,
    newModulePrice: Number,
    documents: Array<any>,
    startRequestDate: String,
    startAttentionDate: String,
    estimatedEndDate: String,
    realEndDate: String,
    endDateCompliance: Boolean,
    quality: Boolean
    status: String}
 */
    export const getTicketByModule = async ({ body }: Request, res: Response) => {
      try {
        const { serial } = body;
        const response = await getTicketsByModuleService(serial);
        response
          ? res.status(200).send({ msg: response })
          : res.status(401).send({ msg: "Not found" });
      } catch (e) {
        console.log(`ERROR GETTING WARRANTY TICKETS=${e}`);
        handleHttp(res, `ERROR GETTING WARRANTY TICKETS=${e}`);
      }
  };

/**
 * 
 * @param param0 Receives a ticket
 * @param res A warrantyTicket {
    ticket: String,
    module: Object,
    historical: Array<String>,
    newModulePrice: Number,
    documents: Array<any>,
    startRequestDate: String,
    startAttentionDate: String,
    estimatedEndDate: String,
    realEndDate: String,
    endDateCompliance: Boolean,
    quality: Boolean
    status: String}
 */
export const getOneWarrantyTicket = async ({ body }:Request, res: Response) => {
  try {
    const { ticket } = body;
    const response = await getOneWarrantyTicketService(ticket);
    response
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: "Not found" });
  } catch (e) {
    console.log(`ERROR GETTING WARRANTY TICKET=${e}`);
    handleHttp(res, `ERROR GETTING WARRANTY TICKET=${e}`);
  }
}

/**
 * 
 * @param res a warrantyTicket array {
    ticket: String,
    module: Object,
    historical: Array<String>,
    newModulePrice: Number,
    documents: Array<any>,
    startRequestDate: String,
    startAttentionDate: String,
    estimatedEndDate: String,
    realEndDate: String,
    endDateCompliance: Boolean,
    quality: Boolean
    status: String}
 */
export const getAllWarrantyTicket = async (req: Request, res: Response) => {
    try {
      const response = await getAllWarrantyTicketService();
      response
        ? res.status(200).send({ msg: response })
        : res.status(401).send({ msg: "Empty" });
    } catch (e) {
      console.log(`ERROR GETTING ALL WARRANTY TICKET=${e}`);
      handleHttp(res, `ERROR GETTING ALL WARRANTY TICKET=${e}`);
    }
};

/**
 * 
 * @param param0 Receives a warrantyTicket {
    ticket: String,
    module: Object,
    historical: Array<String>,
    newModulePrice: Number,
    documents: Array<any>,
    startRequestDate: String,
    startAttentionDate: String,
    estimatedEndDate: String,
    realEndDate: String,
    endDateCompliance: Boolean,
    quality: Boolean
    status: String}
 * @param res A message if the warrantyTicket was update correctly or not
 */
export const updateWarrantyTicket = async ({ body }: Request, res: Response) => {
    try {
      const { files, updateObj } = body;
      const response = await updateWarrantyTicketService(files,updateObj);
      response === "WarrantyTicket updated correctly"
        ? res.status(200).send({ msg: "WarrantyTicket updated correctly" })
        : res.status(401).send({ msg: "Not WarrantyTicket" });
    } catch (e) {
      console.log(`ERROR UPDATING WARRANTY TICKET=${e}`);
      handleHttp(res, `ERROR UPDATING WARRANTY TICKET=${e}`);
    }
};

/**
 * 
 * @param body
 * @returns return if the waterFall update was success
 */
export const newModule = async ({body}:Request, res:Response)=>{
  try{
    const { ticket,newModule,newSerial,newPrice } = body;
    const response = await newModuleService(ticket,newModule,newSerial,newPrice);
    response === "Waterfall update was successful"
      ? res.status(200).send({msg:response})
      : res.status(400).send({msg:`Something went wrong ${response}`});
  }catch(error){
    console.log(`ERROR UPDATING WARRANTY TICKET=${error}`);
    handleHttp(res, `ERROR UPDATING WARRANTY TICKET=${error}`);
  }
}

/**
 * 
 * @param param0 Receives
 * @param res With a message if the warrantyTicket was delete correctly or not
 */
export const deleteWarrantyTicket = async ({ body }: Request, res: Response) => {
    try {
      const { ticket } = body;
  
      const response = await deleteWarrantyTicketService(ticket);
      response === "WarrantyTicket deleted correctly"
        ? res.status(200).send(response)
        : res.status(401).send(response);
    } catch (error) {
      console.log(`ERROR DELETING WARRANTY TICKET=${error}`);
      handleHttp(res, `ERROR DELETING WARRANTY TICKET=${error}`);
    }
  };