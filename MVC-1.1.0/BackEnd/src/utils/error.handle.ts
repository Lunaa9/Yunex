import { Response } from "express";

/**
 * This function responds if theres an error on some endpoint
 * @param res the response sended
 * @param error the error that's gonna be responsed
 * @param errorRaw the raw error
 */
export const handleHttp = (res: Response, error: string, errorRaw?: any) => {
  console.log(errorRaw);
  res.status(500);
  res.send({ error });
};
