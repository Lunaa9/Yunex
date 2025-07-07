import { Schema, model } from 'mongoose';
const FileSchema = new Schema({
  fileName: { type: String, required: true },
  fileData: { type: Buffer, required: true },
  uploadDate: { type: Date, default: Date.now },
});

const VehicleSchema = new Schema({
    licensePlate: {
      type: String,
      required: true,
      unique: true
    },
    owner: {
      type: String,
      required: true,
    },
    transitLicense: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    modelLine: {
      type: String,
      required: true,
    },
    vehicleClass: {
      type: String,
      required: true,
    },
    yearModel: {
      type: String,
      required: true,
    },
    vinNumber: {
      type: String,
      required: true,
    },
    engineNumber: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    transitAuthority: {
      type: String,
      required: true,
    },
    mandatoryInsurance: {
      number: { type: String, required: true },
      issuanceDate: { type: Date, required: true },
      expirationDate: { type: Date, required: true },
    },
    comprehensiveInsurance: {
      number: { type: String, required: true },
      issuanceDate: { type: Date, required: true },
      expirationDate: { type: Date, required: true },
    },
    mechanicalReview: {
      number: { type: String, required: true },
      issuanceDate: { type: Date, required: true },
      expirationDate: { type: Date, required: true },
    },
    articulatedBoomReview: {
      number: { type: String, required: true },
      issuanceDate: { type: Date, required: true },
      expirationDate: { type: Date, required: true },
    },
    files: {
      lifeSheet: { type: [FileSchema], default: undefined },
      photographicRecord: { type: [FileSchema], default: undefined },
      transitLicense: { type: [FileSchema], default: undefined },
      soat: { type: [FileSchema], default: undefined },
      automobileInsurance: { type: [FileSchema], default: undefined },
      vehicleTax: { type: [FileSchema], default: undefined },
      technomechanicalCertificate: { type: [FileSchema], default: undefined },
      technicalManualFiles: { type: [FileSchema], default: undefined },
    },
  });

  const vehicleModel = model('vehicle', VehicleSchema);
  export default vehicleModel;

  