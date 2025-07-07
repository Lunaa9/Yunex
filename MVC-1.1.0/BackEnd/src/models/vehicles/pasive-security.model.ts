import { Schema, model } from "mongoose";

const pasiveSecuritySchema = new Schema({

    licensePlate: {
        type: String,
        required: true,
        unique: true
    },
    brakingSystem: {
        type: String,
        required: true
    },
    steeringSystem: {
        type: String,
        required: true
    },
    suspensionSystem:{
        type: String,
        required: true
    },
    tires:{
        type: String,
        required: true  
    },
    lightning:{
        type: String,
        required: true
    },
    electricSystem:{
        type: String,
        required: true
    },
    airConditioning:{
        type: String,
        required: true
    },
    mirrors:{
        type: String,
        required: true
    },
    stabilityControlSystem:{
        type: String,
        required: true
    }
});

const pasiveSecurityModel = model('pasiveSecurity', pasiveSecuritySchema);
export default pasiveSecurityModel;