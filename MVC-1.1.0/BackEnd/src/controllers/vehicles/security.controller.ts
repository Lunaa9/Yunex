import { Request, Response } from 'express';
import { saveActiveSecurity, savePasiveSecurity } from '../../services/vehicles/security.service';

export const saveSecurityData = async (req: Request, res: Response) => {
  const { licensePlate, selectedSecurity, formData } = req.body;

  try {
    let responseMessage = '';

    if (selectedSecurity === 'security1') {
      // Seguridad activa
      responseMessage = await saveActiveSecurity(licensePlate, formData);
    } else if (selectedSecurity === 'security2') {
      // Seguridad pasiva
      responseMessage = await savePasiveSecurity(licensePlate, formData);
    }

    return res.status(200).json({ message: responseMessage });
  } catch (error) {
    return res.status(500).json({ message: 'Error saving security data' });
  }
};