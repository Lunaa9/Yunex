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
}
