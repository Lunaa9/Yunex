import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    default: 'Employee',
  },
  reports: {
    type: Array,
    default: []
  },
  token: {
    type: String,
    default: ''
  }

});

const UserModel = model('users', userSchema);
export default UserModel;