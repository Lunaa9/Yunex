
// Imports
import {
  createLabModelservice,
  getAllLabModelService,
  getOneLabModelService,
  updateLabModelService, 
  deleteLabModelService,
  outeupdateLabModelService,
  getFilteredDataService
} from "../../services/lab/Lab.service"
import { Response, Request } from "express";
import { handleHttp } from "../../utils/error.handle";


/**
 * create new LabModel
 * @param param0 Recive an labModule { ticket: string,
    admissionDate: string,
    module: string,
    equipment: string,
    serial: string,
    status: string,
    city: string,
    comments: string,
    contractNumber: string,
    client: string,
    sender: string,
    warranty: string,
    expectedOutDate: string,
    repairCenterResponsable: string,
    servicesResponsable: string,
    realOutDate: string,
    outDateCompliance: boolean,
    estimatedRepairTime: number,
    realRepairTime: number,
    repairTimeCompliance: boolean,
    year: number,
    failure: string,
    repairProcedure: string,
    repairTechnician: string,} 
 * @param res  With a message if the labModel was created correctly or not
 */
export const createLabModel = async ({body}: Request, res: Response) => {
  try {
    const { ...labModule } = body;
    if(labModule && labModule.ticket){
    const response = await createLabModelservice(labModule)
      if(response === "repair sheet created correctly"){
          res.status(200).send({ msg: "repair sheet created correctly" })
        } else if (response === "Alredy repair sheet"){
          res.status(401).send({ msg: "Already repair sheet" })
        } 
    } else {
      res.status(400).send({msg: "invalid labModule object"})
    }
  } catch (e) {
    console.log(`ERROR CREATING LABMODEL=${e}`);
    handleHttp(res, `ERROR CREATING LABMODEL=${e}`);
  };
} ;


/**
 * get one LabModel
 * @param param0 Recive an ticket
 * @param res whit an LabModel { ticket: string,
    admissionDate: string,
    module: string,
    equipment: string,
    serial: string,
    status: string,
    city: string,
    comments: string,
    contractNumber: string,
    client: string,
    sender: string,
    warranty: string,
    expectedOutDate: string,
    repairCenterResponsable: string,
    servicesResponsable: string,
    realOutDate: string,
    outDateCompliance: boolean,
    estimatedRepairTime: number,
    realRepairTime: number,
    repairTimeCompliance: boolean,
    year: number,
    failure: string,
    repairProcedure: string,
    repairTechnician: string,} 
 */

export const getOneLabModel = async ({ body }: Request, res: Response) => {
  try {
    const { ...ticket } = body;
    const response = await getOneLabModelService(ticket);
    response
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: "Not found" });
  } catch (e) {
    console.log(`ERROR GETTING LABMODEL=${e}`);
    handleHttp(res, `ERROR GETTING LABMODEL=${e}`);
  }
};

// get all LabModels
/**
 * 
 * @param res whit an LabModels array { ticket: string,
    admissionDate: string,
    module: string,
    equipment: string,
    serial: string,
    status: string,
    city: string,
    comments: string,
    contractNumber: string,
    client: string,
    sender: string,
    warranty: string,
    expectedOutDate: string,
    repairCenterResponsable: string,
    servicesResponsable: string,
    realOutDate: string,
    outDateCompliance: boolean,
    estimatedRepairTime: number,
    realRepairTime: number,
    repairTimeCompliance: boolean,
    year: number,
    failure: string,
    repairProcedure: string,
    repairTechnician: string,} 
 */

export const getAllLabModel = async (req: Request, res: Response) => {
  try {
    const response = await getAllLabModelService();
    response
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: "Empty" });
  } catch (e) {
    console.log(`ERROR GETTING ALL LABMODEL=${e}`);
    handleHttp(res, `ERROR GETTING ALL LABMODEL=${e}`);
  }
};

// get filtered table
/**
 * 
 * @param res whit an LabModels array { ticket: string,
    admissionDate: string,
    module: string,
    equipment: string,
    serial: string,
    status: string,
    city: string,
    comments: string,
    contractNumber: string,
    client: string,
    sender: string,
    warranty: string,
    expectedOutDate: string,
    repairCenterResponsable: string,
    servicesResponsable: string,
    realOutDate: string,
    outDateCompliance: boolean,
    estimatedRepairTime: number,
    realRepairTime: number,
    repairTimeCompliance: boolean,
    year: number,
    failure: string,
    repairProcedure: string,
    repairTechnician: string,} 
 */

export const getFilteredData = async (req: Request, res: Response) => {
  try {
    const response = await getFilteredDataService();
    response
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: "Empty" });
  } catch (e) {
    console.log(`ERROR GETTING DIAGNOSTIC TABLE=${e}`);
    handleHttp(res, `ERROR GETTING DIAGNOSTIC TABLE=${e}`);
  }
};

// update LabModel
/**
 * 
 * @param param0 Recive an labModule { ticket: string,
    admissionDate: string,
    module: string,
    equipment: string,
    serial: string,
    status: string,
    city: string,
    comments: string,
    contractNumber: string,
    client: string,
    sender: string,
    warranty: string,
    expectedOutDate: string,
    repairCenterResponsable: string,
    servicesResponsable: string,
    realOutDate: string,
    outDateCompliance: boolean,
    estimatedRepairTime: number,
    realRepairTime: number,
    repairTimeCompliance: boolean,
    year: number,
    failure: string,
    repairProcedure: string,
    repairTechnician: string,} 
 * @param res  With a message if the labModel was update correctly or not
 */

export const updateLabModel = async ({ body }: Request, res: Response) => {
  try {
    const { ...labModule } = body;
    
    const response = await updateLabModelService(labModule);
    response === "LabModule updated correctly"
      ? res.status(200).send({ msg: "LabModel updated correctly" })
      : res.status(401).send({ msg: "Not LabModel" });
  } catch (e) {
    console.log(`ERROR UPDATING LABMODEL=${e}`);
    handleHttp(res, `ERROR UPDATING LABMODEL=${e}`);
  }
};

// out update LabModel
/**
 * 
 * @param param0 Recive an labModule { ticket: string,
    admissionDate: string,
    module: string,
    equipment: string,
    serial: string,
    status: string,
    city: string,
    comments: string,
    contractNumber: string,
    client: string,
    sender: string,
    warranty: string,
    expectedOutDate: string,
    repairCenterResponsable: string,
    servicesResponsable: string,
    realOutDate: string,
    outDateCompliance: boolean,
    estimatedRepairTime: number,
    realRepairTime: number,
    repairTimeCompliance: boolean,
    year: number,
    failure: string,
    repairProcedure: string,
    repairTechnician: string,} 
 * @param res  With a message if the labModel was update correctly or not
 */

    export const outupdateLabModel = async ({ body }: Request, res: Response) => {
      try {
        const { ...labModule } = body;
        const response = await outeupdateLabModelService(labModule);
        response === "LabModule updated correctly"
          ? res.status(200).send({ msg: "LabModel updated correctly" })
          : res.status(401).send({ msg: "Not LabModel" });
      } catch (e) {
        console.log(`ERROR UPDATING LABMODEL=${e}`);
        handleHttp(res, `ERROR UPDATING LABMODEL=${e}`);
      }
    };

/**
 * delete one LabModel 
 * @param param0 Recive an ticket
 * @param res With a message if the labModel was delete correctly or not
 */

export const deleteLabModel = async ({ body }: Request, res: Response) => {
  try {
    const { ticket } = body;
    const response = await deleteLabModelService(ticket);
    response === "LabModel deleted correctly"
      ? res.status(200).send({ msg: "LabModel deleted correctly" })
      : res.status(401).send({ msg: "Not LabModel" });
  } catch (e) {
    console.log(`ERROR DELETING LABMODEL=${e}`);
    handleHttp(res, `ERROR DELETING LABMODEL=${e}`);
  }
};
