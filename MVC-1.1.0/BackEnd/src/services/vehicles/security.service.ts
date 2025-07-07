import activeSecurityModel from '../../models/vehicles/active-security.model';
import pasiveSecurityModel from '../../models/vehicles/pasive-security.model';

/**
 * Servicio para manejar la creación o actualización de la seguridad activa.
 * @param licensePlate - Placa del vehículo
 * @param formData - Datos del formulario de seguridad activa
 * @returns Mensaje de éxito o error
 */
export const saveActiveSecurity = async (licensePlate: string, formData: any): Promise<string> => {
  try {
    // Verificar si ya existe un registro de seguridad activa para la placa
    const existingRecord = await activeSecurityModel.findOne({ licensePlate });

    if (existingRecord) {
      // Si existe, actualizar el registro
      await activeSecurityModel.updateOne({ licensePlate }, formData);
      return 'Active security data updated successfully';
    } else {
      // Si no existe, crear uno nuevo
      await activeSecurityModel.create({ licensePlate, ...formData });
      return 'Active security data saved successfully';
    }
  } catch (error) {
    console.error('Error saving active security data:', error);
    return 'Error saving active security data';
  }
};

/**
 * Servicio para manejar la creación o actualización de la seguridad pasiva.
 * @param licensePlate - Placa del vehículo
 * @param formData - Datos del formulario de seguridad pasiva
 * @returns Mensaje de éxito o error
 */
export const savePasiveSecurity = async (licensePlate: string, formData: any): Promise<string> => {
  try {
    // Verificar si ya existe un registro de seguridad pasiva para la placa
    const existingRecord = await pasiveSecurityModel.findOne({ licensePlate });

    if (existingRecord) {
      // Si existe, actualizar el registr o
      await pasiveSecurityModel.updateOne({ licensePlate }, formData);
      return 'Pasive security data updated successfully';
    } else {
      // Si no existe, crear uno nuevo
      await pasiveSecurityModel.create({ licensePlate, ...formData });
      return 'Pasive security data saved successfully';
    }
  } catch (error) {
    console.error('Error saving pasive security data:', error);
    return 'Error saving pasive security data';
  }
};
