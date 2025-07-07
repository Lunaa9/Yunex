import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
  name: {//The client name
    type: String,
    required: true,
    unique: true
  },
  NIT: {//The client NIT
    type: Number,
    required: true
  },
  personInCharge:{//The person who is in project charge
    type: String,
    required: true
  },
  direction: {//The client direction
    type: String,
    required: true
  },
  email: {//The client email
    type: String,
    required: true
  },
  phone: {//The client phone number
    type: Number,
    required: true
  }
});

const clientModel = model('clients', clientSchema);
export default clientModel;