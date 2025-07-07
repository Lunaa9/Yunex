import {
  forgotPasswordService,
  loginUserService,
  updatePasswordService,
} from "../../services/users/auth.service";
import {
  createUserService,
  updateUserService,
  deleteUserService,
  getUserService,
  getAllUsersService,
} from "../../services/users/user.service";
import { handleHttp } from "../../utils/error.handle";
import { Response, Request } from "express";

/**
 *
 * @param param0 Recive an User {email:string, password:string, rol:string, reports:Array}
 * @param res With a message if the user was created correctly or not
 */
export const createUser = async ({ body }: Request, res: Response) => {
  try {
    const { ...user } = body;
    const response = await createUserService(user);
    response === "User created correctly"
      ? res.status(200).send({ msg: "User created correctly" })
      : res.status(401).send({ msg: "Already user" });
  } catch (e) {
    console.log(`ERROR CREATING USER=${e}`);
    handleHttp(res, `ERROR CREATING USER=${e}`);
  }
};

/**
 *
 * @param param0 Recive an User {email:string, password:string, rol:string, reports:Array}
 * @param res With a message if the user was updated correctly or not
 */
export const updateUser = async ({ body }: Request, res: Response) => {
  try {
    const { ...user } = body;
    const response = await updateUserService(user);
    response === "User updated correctly"
      ? res.status(200).send({ msg: "User updated correctly" })
      : res.status(401).send({ msg: "Not user" });
  } catch (e) {
    console.log(`ERROR UPDATING USER=${e}`);
    handleHttp(res, `ERROR UPDATING USER=${e}`);
  }
};

/**
 *
 * @param param0 Recive an user email
 * @param res With a message if the user was deleted correctly or not
 */
export const deleteUser = async ({ body }: Request, res: Response) => {
  try {
    const { email } = body;
    const response = await deleteUserService(email);
    response === "User deleted correctly"
      ? res.status(200).send({ msg: "User deleted correctly" })
      : res.status(401).send({ msg: "Not user" });
  } catch (e) {
    console.log(`ERROR DELETING USER=${e}`);
    handleHttp(res, `ERROR DELETING USER=${e}`);
  }
};

/**
 *
 * @param param0 Recive an user email
 * @param res With an User{email:string, password:string, rol:string, reports:Array} if was founded or with a message if not
 */
export const getUser = async ({ body }: Request, res: Response) => {
  try {
    const { email } = body;
    const response = await getUserService(email);
    response
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: "Not found" });
  } catch (e) {
    console.log(`ERROR GETTING USER=${e}`);
    handleHttp(res, `ERROR GETTING USER=${e}`);
  }
};

/**
 *
 * @param res With an Users Array{email:string, password:string, rol:string, reports:Array} if was founded or with a message if the collection is empty
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await getAllUsersService();
    response
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: "Empty" });
  } catch (e) {
    console.log(`ERROR GETTING ALL USER=${e}`);
    handleHttp(res, `ERROR GETTING ALL USER=${e}`);
  }
};

export const loginUser = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body;
    const response = await loginUserService(email, password);
    response !== "Not user"
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: "Not user" });
  } catch (e) {
    console.log(`ERROR LOGIN USER=${e}`);
    handleHttp(res, `ERROR LOGIN USER=${e}`);
  }
};

export const forgotPassword = async ({ body }: Request, res: Response) => {
  try {
    const { email, link } = body;
    const response = await forgotPasswordService(email, link);
    response
      ? res.status(200).send({ msg: response })
      : res.status(401).send({ msg: "Not user" });
  } catch (e) {
    console.log(`ERROR SENDING USER=${e}`);
    handleHttp(res, `ERROR SENDING USER=${e}`);
  }
};

export const updatePassword = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body;
    const response = await updatePasswordService(email, password);
    response === "Password updated correctly"
      ? res.status(200).send({ msg: "Password updated correctly" })
      : res.status(401).send({ msg: "Not user" });
  } catch (e) {
    console.log(`ERROR SENDING USER=${e}`);
    handleHttp(res, `ERROR SENDING USER=${e}`);
  }
};
