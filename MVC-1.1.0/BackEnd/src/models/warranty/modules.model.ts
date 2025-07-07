import { Schema,model } from "mongoose";

const warrantyModuleSchema = new Schema({
    serial:{//The module serial number
        type:String,
        required:true,
        unique:true
    },
    name:{//The module description
        type:String,
        required:true
    },
    contractNum:{//The module's contractNum
        type:String,
        required:true
    },
    clientName:{//The module's clientName
        type:String,
        required:true
    },
    type:{//The module type
        type:String,
        required:true
    },
    category:{//The module category
        type:String,
        required:true
    },
    ubication:{//The module ubication
        type:String,
        required:true
    },
    functionalUnit:{//The fuctionat unit
        type:String,
        required:true
    },
    purchaseOrder:{//The purchase order file
        type:Object,
        default:{},
        required:false
    },
    startDate:{//The date when the client warranty started
        type:String,
        required:true
    },
    warrantyTime:{//The warranty duration in months
        type:String,
        required:true
    },
    endDate:{//The date when the client warranty client end
        type:String,
        required:true
    },
    startDateSupp:{//The date when the supplier warranty started
        type:String,
        required:true
    },
    endDateSupp:{//The date when the supplier warranty client end
        type:String,
        required:true
    },
    status:{//The module status
        type:String,
        required:true,
        default:'active',
        enum:['active','inProcess','inactive']
    }
});

const modulesModel = model('warrantyModules',warrantyModuleSchema);
export default modulesModel;