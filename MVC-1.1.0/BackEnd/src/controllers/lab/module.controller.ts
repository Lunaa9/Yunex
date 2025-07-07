import { Response, Request } from "express";
import { handleHttp } from "../../utils/error.handle";
import {
  createModuleService,
  deleteModuleService,
  getAllModulesService,
  getModuleService,
  updateModuleService,
} from "../../services/lab/module.service";

/**
 * Controller to create an module
 * @param param0 { module: {
 *  name: string,
 *  serial: string
 *  instalationDate: string,
 *  warrantyTime:number,
 *  estimatedRepairTime:number,
 *  estimatedOutTime:number,
 *  } }
 * @param res server response how creating went
 */
export const createModule = async ({ body }: Request, res: Response) => {
  try {
    const {... module } = body;
    const response = await createModuleService(module);
    response === "Module created ok"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR CREATING MODULE=${e}`);
    handleHttp(res, `ERROR CREATING MODULE=${e}`);
  }
};

/**
 * Controller to update an module
 * @param param0 { module: {
 *  name: string,
 *  serial: string
 *  instalationDate: string,
 *  warrantyTime:number,
 *  estimatedRepairTime:number,
 *  estimatedOutTime:number,
 *  } }
 * @param res server response how updating went
 */
export const updateModule = async ({ body }: Request, res: Response) => {
  try {
    const { ...module } = body;
    const response = await updateModuleService(module);
    response === "Module updated ok"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR UPDATING MODULE=${e}`);
    handleHttp(res, `ERROR UPDATING MODULE=${e}`);
  }
};

/**
 * Controller to deleting a module
 * @param param0 { name: string }
 * @param res server response how deleting went
 */
export const deleteModule = async ({ body }: Request, res: Response) => {
  try {
    const { ...serial } = body;
    const response = await deleteModuleService(serial);
    response === "Module deleted ok"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR DELETING MODULE=${e}`);
    handleHttp(res, `ERROR DELETING MODULE=${e}`);
  }
};

/**
 * Controller to get a module by name
 * @param param0 { name: string }
 * @param res server response how getting a rol went
 */
export const getModule = async ({ body }: Request, res: Response) => {
  try {
    const {serial } = body;
    const response = await getModuleService(serial);
    response !== "Not existing equipment"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR GETTING MODULE=${e}`);
    handleHttp(res, `ERROR GETTING MODULE=${e}`);
  }
};

/**
 * Controller to get a all equipments
 * @param req nothing
 * @param res server response how getting all roles went
 */
export const getAllModules = async (req: Request, res: Response) => {
  try {
    const response = await getAllModulesService();
    response !== "Empty"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR GETTING ALL MODULE=${e}`);
    handleHttp(res, `ERROR GETTING ALL MODULE=${e}`);
  }
};
