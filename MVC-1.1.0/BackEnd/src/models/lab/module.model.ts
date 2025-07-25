import { Schema, model } from "mongoose";

const moduleSchema = new Schema({
    name:{ // module's name
        type: String,
        required: true,
        unique: false
    },
    serial:{ // module's serial
        type: String, 
        required: true,
        unique: true
    },
    installationDate:{ // Module's instalacion date or to calculate the warranty time
        type: String,
        required: false,
        default: ""
    },
    warrantyTime:{ // Time in months of valid warranty
        type: Number,
        required: false,
        default: 0
    },
    estimatedRepairTime:{  // common repair time
        type: Number,
        required: true,
        default: 0
    },
    estimatedOutTime:{ // common out of reparation time 
        type: Number,
        required: true,
        default: 0
    }
});

const ModuleModel = model("modules", moduleSchema);

export default ModuleModel;