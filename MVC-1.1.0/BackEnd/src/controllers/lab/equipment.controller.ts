import { Response, Request } from "express";
import { handleHttp } from "../../utils/error.handle";
import {
  addModuleService,
  createEquipmentService,
  deleteEquipmentService,
  getAllEquipmentsService,
  getEquipmentService,
  removeModuleService,
  updateEquipmentService,
} from "../../services/lab/equipment.service";

/**
 * Controller to create an equipment
 * @param param0 { equipment: { name: string, module: [] } }
 * @param res server response how creating went
 */
export const createEquipment = async ({ body }: Request, res: Response) => {
  try {
    const { equipment } = body;
    const response = await createEquipmentService(equipment);
    response === "Equipment created ok"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR CREATING EQUIPMENT=${e}`);
    handleHttp(res, `ERROR CREATING EQUIPMENT=${e}`);
  }
};

/**
 * Controller to update an equipment
 * @param param0 { equipment: { name: string, module: [] } }
 * @param res server response how updating went
 */
export const updateEquipment = async ({ body }: Request, res: Response) => {
  try {
    const { equipment } = body;
    const response = await updateEquipmentService(equipment);
    response === "Equipment updated ok"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR UPDATING EQUIPMENT=${e}`);
    handleHttp(res, `ERROR UPDATING EQUIPMENT=${e}`);
  }
};

/**
 * Controller to deleting a equipment
 * @param param0 { name: string }
 * @param res server response how deleting went
 */
export const deleteEquipment = async ({ body }: Request, res: Response) => {
  try {
    const { name } = body;
    const response = await deleteEquipmentService(name);
    response === "Equipment deleted ok"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR DELETING EQUIPMENT=${e}`);
    handleHttp(res, `ERROR DELETING EQUIPMENT=${e}`);
  }
};

/**
 * Controller to get a equipment by name
 * @param param0 { name: string }
 * @param res server response how getting a rol went
 */
export const getEquipment = async ({ body }: Request, res: Response) => {
  try {
    const { name } = body;
    const response = await getEquipmentService(name);
    response !== "Not existing equipment"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR GETTING EQUIPMENT=${e}`);
    handleHttp(res, `ERROR GETTING EQUIPMENT=${e}`);
  }
};

/**
 * Controller to get a all equipments
 * @param req nothing
 * @param res server response how getting all roles went
 */
export const getAllEquipments = async (req: Request, res: Response) => {
  try {
    const response = await getAllEquipmentsService();
    response !== "Empty"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR GETTING ALL EQUIPMENT=${e}`);
    handleHttp(res, `ERROR GETTING ALL EQUIPMENT=${e}`);
  }
};

/**
 * Controller to add a module to an equipment
 * @param param0 { moduleName: string, name: string }
 * @param res server response how getting all roles went
 */
export const addModule = async ({ body }: Request, res: Response) => {
  try {
    const { moduleName, name } = body;
    const response = await addModuleService(moduleName, name);
    response === "Module added correctly"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR ADDING A MODULE=${e}`);
    handleHttp(res, `ERROR ADDING A MODULE=${e}`);
  }
};

/**
 * Controller to remove a module to an equipment
 * @param param0 { moduleName: string, name: string }
 * @param res server response how getting all roles went
 */
export const removeModule = async ({ body }: Request, res: Response) => {
  try {
    const { moduleName, name } = body;
    const response = await removeModuleService(moduleName, name);
    response === "Module removed correctly"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR CREATING EQUIPMENT=${e}`);
    handleHttp(res, `ERROR CREATING EQUIPMENT=${e}`);
  }
};
