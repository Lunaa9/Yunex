import { Rol } from "../../interfaces/users/rol.interface";
import RolModel from "../../models/users/rol.model";

/**
 * Function to create a new rol
 * @param rol Rol {name: string, description:string} to be created
 * @returns Message of how the creation went
 */
const createRolService = async (rol: Rol) => {
  rol.name = rol.name.toUpperCase();
  const rolExist = await RolModel.findOne({ name: rol.name });
  if (rolExist) {
    return "Existing rol";
  } else {
    let res = "";
    const newRol = await RolModel.create(rol);
    newRol ? (res = "Rol created ok") : (res = "Error creating rol");
    return res;
  }
};

/**
 * Function to update an existing rol
 * @param rol Rol {name: string, description:string} to be updated
 * @returns Message of how the update went
 */
const updateRolService = async (rol: Rol) => {
  rol.name = rol.name.toUpperCase();
  const rolExist = await RolModel.findOne({ name: rol.name });
  if (rolExist) {
    let res = "";
    const updateRol = await RolModel.findOneAndUpdate({ name: rol.name }, rol);
    updateRol ? (res = "Rol updated ok") : (res = "Error updating rol");
    return res;
  } else {
    return "Not existing rol";
  }
};

/**
 * Function to delete an existing rol
 * @param name The name of the rol that want to delete
 * @returns Message of how the delete went
 */
const deleteRolService = async (name: string) => {
  name = name.toUpperCase();
  const rolExist = await RolModel.findOne({ name: name });
  if (rolExist) {
    let res = "";
    const updateRol = await RolModel.findOneAndDelete({ name: name });
    updateRol ? (res = "Rol deleted ok") : (res = "Error deleting rol");
    return res;
  } else {
    return "Not existing rol";
  }
};

/**
 * Function to find a rol by it's name
 * @param name The name of the rol that want to find
 * @returns The role founded or a message not existing role
 */
const getRolService = async (name: string) => {
  name = name.toUpperCase();
  const rolExist = await RolModel.findOne({ name: name });
  let res: any = "";
  rolExist ? (res = rolExist) : (res = "Not existing rol");
  return res;
};

/**
 * Function to get all roles stored
 * @returns All the stored roles or a message empty
 */
const getAllRolesService = async () => {
  const rolExist = await RolModel.find({});
  let res: any = "";
  rolExist ? (res = rolExist) : (res = "Empty");
  return res;
};

export {
  createRolService,
  updateRolService,
  deleteRolService,
  getRolService,
  getAllRolesService,
};
