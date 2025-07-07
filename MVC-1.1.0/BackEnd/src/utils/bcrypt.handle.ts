import { hash, compare } from "bcryptjs";

/**
 * This function encrypts the user password
 * @param pass the user password
 * @returns An string with the password encrypted
 */
export const encrypt = async (pass: string) => {
  const passHash = await hash(pass, 8);
  return passHash;
};

/**
 * This function compare the password introduced by the user with the encrypted password stored on the db
 * @param pass The password introduced by the user
 * @param passHash The password encrypted stored on the data base
 * @returns boolean
 */
export const verified = async (pass: string, passHash: string) => {
  const isCorrect = await compare(pass, passHash);
  return isCorrect;
};
