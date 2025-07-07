import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = process.env.SECRET_JWT_SEED || "token.01010101";

/**
 * This function creates the token with the user email and rol
 * @param email user email
 * @param rol user rol
 * @returns an string json web token
 */
export const generateToken = async (email: string, rol: string) => {
  const jwt = sign({ email, rol }, JWT_SECRET, {
    expiresIn: "2h",
  });
  return jwt;
};


/**
 * This function creates an special tocken to recovery the user password
 * @param email user email
 * @returns an string json web token
 */
export const generateTokenForgPass = async (email: string) => {
  const jwt = sign({ email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return jwt;
};

/**
 * This function verify the token
 * @param jwt an string json web token
 * @returns boolean
 */
export const verifyToken = async (jwt: string) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
};


/**
 * This function creates the token with the user email and rol
 * @param email user email
 * @param rol user rol
 * @returns an string json web token
 */
export const generateTokenfile = async (fileview: string, name: string) => {
  const jwt = sign({ fileview, name }, JWT_SECRET, {
    expiresIn: "10h",
  });
  return jwt;
};