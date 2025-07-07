import { Schema, model } from "mongoose";

const activeSecuritySchema = new Schema({

    licensePlate: {
        type: String,
        required: true,
        unique: true
    },
    seatBelts: {
        type: String,
        required: true
    },
    airBags:{
        type: String,
        required: true
    },
    chassisAndBody:{
        type: String,
        required: true
    },
    windshieldGlass:{
        type: String,
        required: true
    },
    headrest:{
        type: String,
        required: true
    },
    roadKit:{
        type: String,
        required: true
    }
 })

 const activeSecurityModel = model('activeSecurity', activeSecuritySchema);
export default activeSecurityModel;