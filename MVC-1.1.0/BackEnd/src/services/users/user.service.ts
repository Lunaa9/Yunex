// Imports
import { User } from "../../interfaces/users/user.interface";
import { encrypt } from "../../utils/bcrypt.handle";
import UserModel from "../../models/users/userModel";

/**
 * Generate a new user
 * @param User {email:string, password:string, rol:string, reports:Array}
 * @returns string
 */
const createUserService = async (user: User) => {
  user.password = await encrypt(user.password); //Encripting the user password
  let userExist = await UserModel.findOne({ email: user.email });
  if (userExist) {
    return "Already user";
  } else {
    await UserModel.create(user);
    return "User created correctly";
  }
};

/**
 * Update an existing user
 * @param User {email:string, password:string, rol:string, reports:Array}
 * @returns string
 */
const updateUserService = async (user: User) => {
  user.password = await encrypt(user.password);
  const response = await UserModel.findOneAndUpdate(
    { email: user.email },
    user
  );
  if (response) {
    return "User updated correctly";
  } else return "Not user";
};

/**
 * Delete an existing user
 * @param email:string
 * @returns string
 */
const deleteUserService = async (email: string) => {
  const response = await UserModel.deleteOne({ email: email });
  if (response) {
    return "User deleted correctly";
  } else return "Not user";
};

/**
 * Get one user finded by it`s email
 * @param email:string
 * @returns User {email:string, password:string, rol:string, reports:Array}
 */
const getUserService = async (email: string) => {
  const response = await UserModel.findOne({ email: email });
  return response;
};

/**
 * Get all users of the collection
 * @returns Array of User {email:string, password:string, rol:string, reports:Array}
 */
const getAllUsersService = async () => {
  const response = await UserModel.find({});
  return response;
};

export {
  createUserService,
  updateUserService,
  deleteUserService,
  getUserService,
  getAllUsersService,
};
