import { Schema, model } from "mongoose";

const basicModuleSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    estimatedRepairTime:{
        type: Number,
        required: true
    },
    estimatedOutTime:{
        type: Number,
        required: true
    }
})