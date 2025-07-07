import vehicleFileModel from "../../models/vehicles/vehicle-files.model";
import { Request, Response } from 'express';
/**
 * Agrega un archivo a un vehículo.
 * @param licensePlate Placa del vehículo.
 * @param fileData Datos del archivo.
 * @param fileType Tipo de archivo.
 * @returns string Mensaje de éxito o error.
 */
/**
 * Servicio para agregar un archivo a un vehículo
 * @param licensePlate - Placa del vehículo
 * @param fileData - Datos del archivo
 * @param fileType - Tipo de archivo
 * @returns Mensaje de éxito o error
 */
const addFileToVehicleService = async (licensePlate: string, fileData: any, fileType: string): Promise<string> => {
    try {
      // Verificar los datos recibidos del archivo
      console.log('File Data Received:', fileData);
      
      const file = await generateVehicleFileData(licensePlate, fileData, fileType);
      await vehicleFileModel.create(file);
      return "File added to vehicle correctly";
    } catch (error) {
      console.error(`ERROR ADDING FILE: ${error}`);
      return "FILE NOT CREATED";
    }
  };
  
  
  /**
   * Genera los datos del archivo para un vehículo
   * @param licensePlate - Placa del vehículo
   * @param fileData - Datos del archivo (incluye buffer y metadatos)
   * @param fileType - Tipo de archivo
   * @returns Objeto con los datos del archivo
   */
  const generateVehicleFileData = async (licensePlate: string, fileData: any, fileType: string) => {
    // Obtener la fecha actual en formato YYYYMMDD_HHMMSS
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
  
    // Verifica si el tipo de archivo es alguno de los definidos, y genera el nombre del archivo en función del tipo
    const fileName = fileType 
      ? `${fileType}_${timestamp}` // Usa el tipo de archivo como parte del nombre
      : `${fileData.originalname}_${timestamp}`; // Usa el nombre original si no hay tipo definido
    
    if (!fileData || !fileData.data) {
      throw new Error("File data is missing or not in the correct format.");
    }
  
    return {
      licensePlate,
      fileName, // Nombre del archivo con el timestamp para evitar duplicados
      fileType,
      fileData: fileData.data, // Datos binarios del archivo
      fileSize: Math.round(fileData.size / 1000), // Tamaño del archivo en KB
      mimeType: fileData.mimetype, // Mimetype del archivo
      uploadDate: new Date(), // Fecha de subida
    };
  };
  

/**
 * Obtiene un archivo de un vehículo por su nombre.
 * @param licensePlate Placa del vehículo.
 * @param fileName Nombre del archivo.
 * @returns Objeto del archivo encontrado o null.
 */
const getFileFromVehicleService = async (licensePlate: string, fileName: string) => {
    try {
        return await vehicleFileModel.findOne({ licensePlate, fileName });
    } catch (error) {
        console.error(`ERROR GETTING FILE: ${error}`);
        return null;
    }
};

const getAllFilesFromVehicleService = async (licensePlate: string) => {
    try {
        return await vehicleFileModel.find({ licensePlate });
    } catch (error) {
        console.error(`ERROR GETTING ALL FILES: ${error}`);
        return [];
    }
};
/**
 * Actualiza un archivo de un vehículo.
 * @param licensePlate Placa del vehículo.
 * @param fileName Nombre del archivo.
 * @param updatedFileData Nuevos datos del archivo.
 * @returns string Mensaje de éxito o error.
 */
const updateVehicleFileService = async (licensePlate: string, fileName: string, updatedFileData: any) => {
    try {
        const response = await vehicleFileModel.findOneAndUpdate({ fileName }, updatedFileData, { new: true });
        if (response) {
            return "Vehicle file updated correctly";
        } else {
            return "VEHICLE FILE NOT UPDATED";
        }
    } catch (error) {
        console.error(`ERROR UPDATING FILE: ${error}`);
        return "FILE NOT UPDATED";
    }
};

/**
 * Elimina un archivo de un vehículo por su nombre.
 * @param licensePlate Placa del vehículo.
 * @param fileName Nombre del archivo.
 * @returns string Mensaje de éxito o error.
 */
const deleteVehicleFileService = async (licensePlate: string, fileName: string) => {
    try {
        const response = await vehicleFileModel.deleteOne({ licensePlate, fileName });
        if (response.deletedCount > 0) {
            return "Vehicle file deleted correctly";
        } else {
            return "VEHICLE FILE NOT DELETED";
        }
    } catch (error) {
        console.error(`ERROR DELETING FILE: ${error}`);
        return "FILE NOT DELETED";
    }
};

export {
    addFileToVehicleService,
    getFileFromVehicleService,
    getAllFilesFromVehicleService,
    updateVehicleFileService,
    deleteVehicleFileService
};