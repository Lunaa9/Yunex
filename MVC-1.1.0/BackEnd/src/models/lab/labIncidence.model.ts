import { Schema, model } from 'mongoose';

const labIncidenceSchema = new Schema({
  ticket:{ //ticket of admission
    type: String,
    required: true,
    unique: true,
  },
  admissionDate:{ 
    type: String,
    required: true
  },
  module:{ //type of module get an object type basicModule
    type: Object,
    required: true
  },
  equipment:{ //type of controller
    type: String,
    required: true
  },
  sticker:{
    type: String,
    required:false,
    default:''
  },
  status:{ //to repair, reparing, irreparable, repaired
    type: String,
    required: true,
    default: "to repair",
    enum: ["to repair", "repairing", "irreparable", "repaired"] 
  },
  approved:{//Is the module approved?
    type:Boolean,
    required:true
  },
  city:{ //City where the module comes from
    type:String,
    required:true
  },
  comments:{ //admission comments
    type:String,
    required:false
  },
  contractNumber:{ //contract where the module comes from
    type: String,
    required: true
  },
  client:{ //name of the contract client
    type: String,
    required: true
  },
  sender:{ //name of the person who sends
    type: String,
    required: true
  },
  warranty:{ //admitted by warranty?
    type: String,
    required: true,
    default:'No',
    enum:['Si','No']
  },
  expectedOutDate:{ // depends on the module and must be calculated according to the date of entry
    type: String,
    required: true
  },
  repairCenterResponsable:{ //person who is responsable of the repair center
    type: String,
    required: true,
  },
  servicesResponsable:{ //person who is responsable of the services area
    type: String,
    required: true
  },
  realOutDate:{ //date when the reparation is over
    type: String,
    required: false
  },
  outDateCompliance:{ //the expected out date is before or the same than the real out date
    type: Boolean,
    required: false
  },
  estimatedRepairTime:{ //estimated repair time on hours
    type: Number,
    required: true
  },
  realRepairTime:{ //real repair time on hours, must be calculated automatically
    type: Number,
    required: false
  },
  repairTimeCompliance:{ //the real repair time y less o equal than the estimated repair time
    type: Boolean,
    required: false
  },
  year:{ //admission year
    type: Number,
    required: true
  },
  failure:{ //failure founded
    type: String,
    required:false
  },
  repairProcedure:{ 
    type:String,
    required: false
  },
  repairTechnician:{ // who repairs
    type: String,
    required: false
  },
  activity:{
    type: String,
    required: true,
    default: "repair",
    enum: ["repair", "diagnostic"] 
  }

});

const labIncidencesModel = model('labIncidences', labIncidenceSchema);
export default labIncidencesModel;