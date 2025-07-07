import { Schema, model } from 'mongoose';

const rolSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
});

const RolModel = model('roles', rolSchema);
export default RolModel;