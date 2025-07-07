import { Request, Response } from "express";
import { handleHttp } from "../../utils/error.handle";
import {
  createVehicleService,
  updateVehicleService,
  deleteVehicleService,
  getAllVehiclesService,
} from "../../services/vehicles/vehicle.service";

/**
 * Controller to create a vehicle
 * @param param0 { body: vehicle data } 
 * @param res server response how creating went
 */
export const createVehicle = async ({ body }: Request, res: Response) => {
  try {
    const response = await createVehicleService(body);
    response === "Vehicle created correctly"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR CREATING VEHICLE=${e}`);
    handleHttp(res, `ERROR CREATING VEHICLE=${e}`);
  }
}

/**
 * Controller to update a vehicle
 * @param param0 { body: vehicle data }
 * @param res server response how updating went
 */
export const updateVehicle = async ({ body }: Request, res: Response) => {
  try {
    const response = await updateVehicleService(body);
    response === "Vehicle updated correctly"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR UPDATING VEHICLE=${e}`);
    handleHttp(res, `ERROR UPDATING VEHICLE=${e}`);
  }
}

/**
 * Controller to delete a vehicle
 * @param param0 { params: { id: string } }
 * @param res server response how deleting went
 */
export const deleteVehicle = async ({ body }: Request, res: Response) => {
  try {
    const { licensePlate } = body;
    const response = await deleteVehicleService(licensePlate);
    response === "Vehicle deleted correctly"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR DELETING VEHICLE=${e}`);
    handleHttp(res, `ERROR DELETING VEHICLE=${e}`);
  }
};

/**
 * Controller to get all vehicles
 * @param req request object
 * @param res server response how getting all vehicles went
 */
export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const response = await getAllVehiclesService();
    response !== "Empty"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: response });
  } catch (e) {
    console.log(`ERROR GETTING ALL VEHICLES=${e}`);
    handleHttp(res, `ERROR GETTING ALL VEHICLES=${e}`);
  }
}
