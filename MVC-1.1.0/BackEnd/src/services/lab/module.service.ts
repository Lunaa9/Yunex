import { Module } from "../../interfaces/lab/module.interface";
import ModuleModel from "../../models/lab/module.model";

/**
 * Function to create a new module
 * @param module module {
 *  name: string,
 *  serial: string
 *  instalationDate: string,
 *  warrantyTime:number,
 *  estimatedRepairTime:number,
 *  estimatedOutTime:number,
 *  } to be created
 * @returns Message of how the creation went
 */
const createModuleService = async (module: Module) => {
  const moduleExist = await ModuleModel.findOne({ name: module.name });
  if (moduleExist) {
    return "Existing module";
  } else {
    let res = "";
    const newModule = await ModuleModel.create(module);
    newModule ? (res = "Module created ok") : (res = "Error creating module");
    return res;
  }
};

/**
 * Function to update an existing module
 * @param module module {
 *  name: string,
 *  serial: string
 *  instalationDate: string,
 *  warrantyTime:number,
 *  estimatedRepairTime:number,
 *  estimatedOutTime:number,
 *  } to be updated
 * @returns Message of how the update went
 */
const updateModuleService = async (module: Module) => {
  module.name = module.name.toUpperCase();
  const moduleExist = await ModuleModel.findOne({ name: module.name });
  if (moduleExist) {
    let res = "";
    const updateModule = await ModuleModel.findOneAndUpdate(
      { name: module.name },
      module
    );
    updateModule
      ? (res = "Module updated ok")
      : (res = "Error updating module");
    return res;
  } else {
    return "Not existing module";
  }
};

/**
 * Function to delete an existing module
 * @param name The name of the module that want to delete
 * @returns Message of how the delete went
 */
const deleteModuleService = async (name: string) => {
  name = name.toUpperCase();
  const moduleExist = await ModuleModel.findOne({ name: name });
  if (moduleExist) {
    let res = "";
    const updateModule = await ModuleModel.findOneAndDelete({ name: name });
    updateModule
      ? (res = "Module deleted ok")
      : (res = "Error deleting module");
    return res;
  } else {
    return "Not existing module";
  }
};

/**
 * Function to find a module by it's name
 * @param name The name of the module that want to find
 * @returns The module founded or a message not existing module
 */
const getModuleService = async (serial: string) => {
  const moduleExist = await ModuleModel.findOne({ serial: serial });
  let res: any = "";
  moduleExist ? (res = moduleExist) : (res = "Not existing module");
  return res;
};

/**
 * Function to get all modules stored
 * @returns All the stored modules or a message empty
 */
const getAllModulesService = async () => {
  const moduleExist = await ModuleModel.find({});
  let res: any = "";
  moduleExist ? (res = moduleExist) : (res = "Empty");
  return res;
};

export {
  createModuleService,
  updateModuleService,
  deleteModuleService,
  getModuleService,
  getAllModulesService,
};
