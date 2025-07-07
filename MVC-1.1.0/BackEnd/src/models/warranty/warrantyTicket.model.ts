import { Schema, model } from "mongoose";
const warrantyTicketSchema= new Schema({
    ticket:{ //ticket identifier
     type: String,
     required: true,
     unique:true
    },
    module:{ //the ticket's module
     type: Object,
     required: true
    },
    newModulePrice:{ //new module price if purchased
     type: Number,
     required: false
    },
    documents:{ //ticket's documents
     type: Object,
     required: true
    },
    startRequestDate:{ //the start request date
     type: String,
     required: true
    },
    startAttentionDate:{ //the start attention date
     type: String,
     required:false
    },
    estimatedEndDate:{//the estimated end attention date
     type: String,
     required: false
    },
    realEndDate:{ //the real end attention date
     type:String,
     required:false
    },
    endDateCompliance:{ //the end date attention compliance
     type: Boolean,
     required:false
    },
    quality:{ //the quality compliance according previous tickets
     type: Boolean,
     required: true,
     default:false
    },
    status:{ //the currently ticket status
     type: String,
     required:true,
     default:"started",
     enum: ["started","accepted", "waiting", "storage", "sendingSupplier", "supplier", "laboratory", "newModule", "solved", "finished", "approved", "warrantyDenied" ]
    }
});

const warrantyTicketModel = model('warrantyTicket', warrantyTicketSchema);
export default warrantyTicketModel;