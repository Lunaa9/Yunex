import { Schema,model } from "mongoose";

const assemblySchema = new Schema({
    consecutive:{//The assembly identifier
        type:Number,
        required:true,
        unique:true
    },
    startDate:{//The date when the assembly was created
        type:String,
        required:true
    },
    year:{//The business year
        type:Number,
        required:true
    },
    graph:{//The assembly graph
        type:String,
        required:true
    },
    assemblyType:{//The assembly type
        type:String,
        required:true,
        default:'',
        enum:['Semaforos',
        'Bandejas',
        'SX Protector',
        'Controlador C800',
        'Contolador C900',
        'Controlador ST950',
        'Controlador SX']
    },
    amount:{//The amount
        type:Number,
        required:true
    },
    status:{//The assembly status
        type:String,
        required:true,
        default:'started',
        enum:['started','inProcess','finished']
    },
    contract:{//The assembly contract
        type:String,
        required:true
    },
    client:{//The client contract
        type:String,
        required:true
    },
    senderName:{//The sender name
        type:String,
        required:true
    },
    expectedOutDate:{//The expect date to end the service
        type:String,
        required:false
    },
    realEndDate:{//The date when the service finished
        type:String,
        required:false
    },
    complianceDate:{//The validation to the date compliance
        type:Boolean,
        required:true
    },
    received:{//Received?
        type:String,
        required:false,
        default:'',
        enum:['','to Satisfaction','observations','reprocessing']
    },
    assemblyRes:{//The name of responsible for assembly
        type:String,
        required:true
    },
    serviceRes:{//The name of responsible for service
        type:String,
        required:true
    }
});

const assemblyModel = model('assembly',assemblySchema);
export default assemblyModel;