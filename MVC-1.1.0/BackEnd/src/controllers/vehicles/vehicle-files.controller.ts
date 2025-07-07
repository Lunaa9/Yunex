import { Request, Response } from 'express';
import {
  addFileToVehicleService,
  getFileFromVehicleService,
  getAllFilesFromVehicleService,
  updateVehicleFileService,
  deleteVehicleFileService,
} from '../../services/vehicles/vehicle-files.service';
import fileUpload, { UploadedFile } from 'express-fileupload';

/**
 * Controller to add a file to a vehicle
 * @param req 
 * @param res 
 */
export const addFileToVehicleController = async (req: Request, res: Response) => {
  const { licensePlate } = req.params;
  const { fileType } = req.body;
  
  // Acceder al archivo cargado
  const fileData = req.files?.file as fileUpload.UploadedFile;

  try {
    if (!fileData) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const result = await addFileToVehicleService(licensePlate, fileData, fileType);
    return res.status(201).json({ message: result });
  } catch (error) {
    console.error(`Error in addFileToVehicleController: ${error}`);
    return res.status(500).json({ message: 'Error adding file to vehicle' });
  }
};

/**
 * Controller to get a file from a vehicle
 * @param req 
 * @param res 
 */
export const getFileFromVehicleController = async (req: Request, res: Response) => {
  const { licensePlate, fileName } = req.params;

  try {
    const file = await getFileFromVehicleService(licensePlate, fileName);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Configura el tipo de contenido y el nombre del archivo
    res.set({
      'Content-Type': file.mimeType,
      'Content-Disposition': `attachment; filename="${file.fileName}"`,
    });

    // Envía los datos del archivo
    return res.status(200).send(file.fileData);
  } catch (error) {
    console.error(`Error in getFileFromVehicleController: ${error}`);
    return res.status(500).json({ message: 'Error getting file from vehicle' });
  }
};

/**
 * Controller to get all files from a vehicle
 * @param req 
 * @param res 
 */
export const getAllFilesFromVehicleController = async (req: Request, res: Response) => {
  const { licensePlate } = req.params;

  try {
    const files = await getAllFilesFromVehicleService(licensePlate);
    return res.status(200).json(files);
  } catch (error) {
    console.error(`Error in getAllFilesFromVehicleController: ${error}`);
    return res.status(500).json({ message: 'Error getting all files from vehicle' });
  }
};

/**
 * Controller to update a file in a vehicle
 * @param req 
 * @param res 
 */
export const updateVehicleFileController = async (req: Request, res: Response) => {
    const { licensePlate, fileName } = req.params;
  
    // Acceder al archivo actualizado
    const updatedFileData = req.files?.file as UploadedFile;
  
    try {
      if (!updatedFileData) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const result = await updateVehicleFileService(licensePlate, fileName, updatedFileData);
      return res.status(200).json({ message: result });
    } catch (error) {
      console.error(`Error in updateVehicleFileController: ${error}`);
      return res.status(500).json({ message: 'Error updating file in vehicle' });
    }
  };

/**
 * Controller to delete a file from a vehicle
 * @param req 
 * @param res 
 */
export const deleteVehicleFileController = async (req: Request, res: Response) => {
  const { licensePlate, fileName } = req.params;

  try {
    const result = await deleteVehicleFileService(licensePlate, fileName);
    return res.status(200).json({ message: result });
  } catch (error) {
    console.error(`Error in deleteVehicleFileController: ${error}`);
    return res.status(500).json({ message: 'Error deleting file from vehicle' });
  }

  
};

export const downloadFileFromVehicleController = async (req: Request, res: Response) => {
  const { licensePlate, fileName } = req.params;

  try {
    const file = await getFileFromVehicleService(licensePlate, fileName);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Establecer el encabezado de tipo MIME correcto
    res.setHeader('Content-Type', file.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${file.fileName}"`);

    // Enviar los datos del archivo
    res.send(file.fileData); // Asegúrate de que file.fileData contenga los datos binarios del archivo
  } catch (error) {
    console.error(`Error in downloadFileFromVehicleController: ${error}`);
    return res.status(500).json({ message: 'Error downloading file' });
  }
};
