import UserModel from "../../models/users/userModel";
import { tranporter } from "../../config/mailer";
import { encrypt, verified } from "../../utils/bcrypt.handle";
import { generateToken, generateTokenForgPass } from "../../utils/jwt.handle";

/**
 * To login users
 * @param email user email
 * @param password user password
 * @returns string, can be the token or an error message
 */
const loginUserService = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email: email });
  if (user) {
    const passOk = await verified(password, user.password);
    return passOk ? generateToken(user.email, user.rol) : "Incorrect password";
  } else {
    return "Not user";
  }
};

/**
 * this function evals if the user email exist and send a link to recover the password
 * @param email user email
 * @param link A link when the user can put it's new password
 * @returns boolean true if the email was sended correctly o false if not
 */
const forgotPasswordService = async (email: string, link: string) => {
  const user = await UserModel.findOne({ email: email });
  let emailSended = true;
  if (user) {
    link += await generateTokenForgPass(email);
    tranporter.sendMail({
      from: '"Forgot password" <yunex@correo.com>',
      to: email,
      subject: "Forgot password",
      html: `
              <b>Haz click en el siguiente link para recuperar tu contraseña de tecnoimportaciones:<b>
              <br>
              <a href="${link}">${link}</a>`,
    });
  } else emailSended = false;
  return emailSended;
};

/**
 * Uptates the user password
 * @param email user email
 * @param password user password
 * @returns string if the password was updated correctly or not
 */
const updatePasswordService = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email: email });
  if (user) {
    user.password = await encrypt(password);
    await UserModel.findOneAndUpdate({ email: email }, user);
    return "Password updated correctly";
  } else return "Not user";
};

export { loginUserService, forgotPasswordService, updatePasswordService };
