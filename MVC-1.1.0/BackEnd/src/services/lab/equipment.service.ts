import { Module } from "../../interfaces/lab/module.interface";
import { Equipment } from "../../interfaces/lab/equipment.interface";
import EquipmentModel from "../../models/lab/equipment.model";

/**
 * Function to create a new equipment
 * @param equipment Equipment { name: string, module: Module[] } to be created
 * @returns Message of how the creation went
 */
const createEquipmentService = async (equipment: Equipment) => {
  equipment.name = equipment.name.toUpperCase();
  const equipmentExist = await EquipmentModel.findOne({ name: equipment.name });
  if (equipmentExist) {
    return "Existing equipment";
  } else {
    let res = "";
    const newequipment = await EquipmentModel.create(equipment);
    newequipment
      ? (res = "Equipment created ok")
      : (res = "Error creating equipment");
    return res;
  }
};

/**
 * Function to update an existing equipment
 * @param equipment Equipment { name: string, module: Module[] } to be updated
 * @returns Message of how the update went
 */
const updateEquipmentService = async (equipment: Equipment) => {
  equipment.name = equipment.name.toUpperCase();
  const equipmentExist = await EquipmentModel.findOne({ name: equipment.name });
  if (equipmentExist) {
    let res = "";
    const updateequipment = await EquipmentModel.findOneAndUpdate(
      { name: equipment.name },
      equipment
    );
    updateequipment
      ? (res = "equipment updated ok")
      : (res = "Error updating equipment");
    return res;
  } else {
    return "Not existing equipment";
  }
};

/**
 * Function to delete an existing equipment
 * @param name The name of the equipment that want to delete
 * @returns Message of how the delete went
 */
const deleteEquipmentService = async (name: string) => {
  name = name.toUpperCase();
  const equipmentExist = await EquipmentModel.findOne({ name: name });
  if (equipmentExist) {
    let res = "";
    const updateequipment = await EquipmentModel.findOneAndDelete({
      name: name,
    });
    updateequipment
      ? (res = "equipment deleted ok")
      : (res = "Error deleting equipment");
    return res;
  } else {
    return "Not existing equipment";
  }
};

/**
 * Function to find a equipment by it's name
 * @param name The name of the equipment that want to find
 * @returns The equipment founded or a message not existing equipment
 */
const getEquipmentService = async (name: string) => {
  name = name.toUpperCase();
  const equipmentExist = await EquipmentModel.findOne({ name: name });
  let res: any = "";
  equipmentExist ? (res = equipmentExist) : (res = "Not existing equipment");
  return res;
};

/**
 * Function to get all equipments stored
 * @returns All the stored equipments or a message empty
 */
const getAllEquipmentsService = async () => {
  const equipmentExist = await EquipmentModel.find({});
  let res: any = "";
  equipmentExist ? (res = equipmentExist) : (res = "Empty");
  return res;
};

/**
 * this function add a new module to a specific equimpent
 * @param moduleName name of the module want to be added
 * @param name name of the equipment to which you want to add the module
 * @returns Message of how the module adding went
 */
const addModuleService = async (moduleName: string, name: string) => {
  let response = "";
  const equipmentExist = await EquipmentModel.findOne({ name: name.toUpperCase() });
  if (equipmentExist) {
    if (!equipmentExist.modules.includes(moduleName.toUpperCase())) {
      equipmentExist.modules.push(moduleName.toUpperCase());
      await EquipmentModel.findOneAndUpdate({ name: name.toUpperCase() }, equipmentExist);
      response = "Module added correctly";
    } else {
      response = "Module already added";
    }
  } else {
    response = "Not equipment";
  }
  return response;
};

/**
 * this function remove a module from a specific equimpent
 * @param moduleName name of the module want to be removed
 * @param name name of the equipment to which you want to remove the module
 * @returns Message of how the module removing went
 */
const removeModuleService = async (moduleName: string, name: string) => {
  let response = "";
  const equipmentExist = await EquipmentModel.findOne({ name: name.toUpperCase() });
  if (equipmentExist) {
    if (equipmentExist.modules.includes(moduleName.toUpperCase())) {
      equipmentExist.modules = equipmentExist.modules.filter((modules) => modules !== moduleName.toUpperCase());
      await EquipmentModel.findOneAndUpdate({ name: name.toUpperCase() }, equipmentExist);
      response = "Module removed correctly";
    } else {
      response = "Not module";
    }
  } else {
    response = "Not equipment";
  }
  return response;
};

export {
  createEquipmentService,
  updateEquipmentService,
  deleteEquipmentService,
  getEquipmentService,
  getAllEquipmentsService,
  addModuleService,
  removeModuleService,
};
