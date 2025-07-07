import { Response, Request } from "express";
import { handleHttp } from "../../utils/error.handle";
import {
  createRolService,
  deleteRolService,
  getAllRolesService,
  getRolService,
  updateRolService,
} from "../../services/users/rol.service";

/**
 * Controller to create a rol
 * @param param0 { rol: { name: string, description: string } }
 * @param res server response how creating went
 */
export const createRol = async ({ body }: Request, res: Response) => {
  try {
    const { rol } = body;   
    const response = await createRolService(rol);
    response === "Rol created correctly"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR CREATING ROL=${e}`);
    handleHttp(res, `ERROR CREATING ROL=${e}`);
  }
};

/**
 * Controller to update a rol
 * @param param0 { rol: { name: string, description: string } }
 * @param res server response how updating went
 */
export const updateRol = async ({ body }: Request, res: Response) => {
  try {
    const { rol } = body;
    const response = await updateRolService(rol);
    response === "Rol updated correctly"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR UPDATING ROL=${e}`);
    handleHttp(res, `ERROR UPDATING ROL=${e}`);
  }
};

/**
 * Controller to deleting a rol
 * @param param0 { name: string }
 * @param res server response how deleting went
 */
export const deleteRol = async ({ body }: Request, res: Response) => {
  try {
    const { name } = body;
    const response = await deleteRolService(name);
    response === "Rol deleted correctly"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR DELETING ROL=${e}`);
    handleHttp(res, `ERROR DELETING ROL=${e}`);
  }
};

/**
 * Controller to get a rol by name
 * @param param0 { name: string }
 * @param res server response how getting a rol went
 */
export const getRol = async ({ body }: Request, res: Response) => {
  try {
    const { name } = body;
    const response = await getRolService(name);
    response !== "Not existing rol"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR GETTING ROL=${e}`);
    handleHttp(res, `ERROR GETTING ROL=${e}`);
  }
};

/**
 * Controller to get a all roles
 * @param req nothing
 * @param res server response how getting all roles went
 */
export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const response = await getAllRolesService();
    response !== "Empty"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR GETTING ALL ROLES=${e}`);
    handleHttp(res, `ERROR GETTING ALL ROLES=${e}`);
  }
};
