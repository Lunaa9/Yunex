export interface FileData {
  fileName: string;
  fileData: any;
  uploadDate: Date;
}

export interface Insurance {
  number: string;
  issuanceDate: Date;
  expirationDate: Date;
}

export interface Vehicle {
  licensePlate: string;
  owner: string;
  transitLicense: string;
  brand: string;
  modelLine: string;
  vehicleClass: string;
  yearModel: number;
  vinNumber: string;
  engineNumber: string;
  mileage: number;
  fuelType: string;
  transitAuthority: string;
  mandatoryInsurance: Insurance;
  comprehensiveInsurance: Insurance;
  mechanicalReview: Insurance;
  articulatedBoomReview: Insurance;
  files?: {
    lifeSheet?: FileData[];
    photographicRecord?: FileData[];
    transitLicense?: FileData[];
    soat?: FileData[];
    automobileInsurance?: FileData[];
    vehicleTax?: FileData[];
    technomechanicalCertificate?: FileData[];
    technicalManualFiles?: FileData[];
  };
}
