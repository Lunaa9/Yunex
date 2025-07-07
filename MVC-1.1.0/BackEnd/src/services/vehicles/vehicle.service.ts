import Vehicle from '../../models/vehicles/vehicle.model';

/**
 * Service to create a vehicle
 * @param vehicleData
 * @returns
 */
export const createVehicleService = async (vehicleData: any) => {
  try {
    const newVehicle = new Vehicle(vehicleData);
    await newVehicle.save();
    return "Vehicle created correctly";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating vehicle: ${error.message}`);
    } else {
      throw new Error("Error creating vehicle: Unknown error");
    }
  }
}

/**
 * Service to update a vehicle
 * @param vehicleData
 * @returns
 */
export const updateVehicleService = async (vehicleData: any) => {
  try {
    const { licensePlate, ...updateData } = vehicleData; 
    const updatedVehicle = await Vehicle.findOneAndUpdate({ licensePlate: licensePlate }, updateData, { new: true });
    if (!updatedVehicle) {
      console.error(`Vehicle not found for licensePlate: ${licensePlate}`);
      throw new Error("Vehicle not found");
    }
    return "Vehicle updated correctly";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating vehicle: ${error.message}`);
    } else {
      throw new Error("Error updating vehicle: Unknown error");
    }
  }
}


/**
 * Service to delete a vehicle
 * @param licensePlate
 * @returns
 */
export const deleteVehicleService = async (licensePlate: string): Promise<string> => {
  try {
    const vehicle = await Vehicle.findOneAndDelete({ licensePlate });

    if (!vehicle) {
      return "Vehicle not found";
    }

    return "Vehicle deleted correctly";
  } catch (error) {
    console.error(`Error deleting vehicle: ${error}`);
    throw new Error("Error deleting vehicle");
  }
};

/**
 * Service to get all vehicles
 * @returns
 */
export const getAllVehiclesService = async () => {
  try {
    const vehicles = await Vehicle.find();
    if (vehicles.length === 0) return "Empty";
    return vehicles;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error getting all vehicles: ${error.message}`);
    } else {
      throw new Error("Error getting all vehicles: Unknown error");
    }
  }
}