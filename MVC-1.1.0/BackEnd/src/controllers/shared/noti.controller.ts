import { getLabNotiService,
    getWarrantyNotiService } from "../../services/shared/noti.service";
import { handleHttp } from "../../utils/error.handle";
import { Request, Response } from "express";

/**
 * 
 * @param req 
 * @param res the noifications object
 */
export const getLabNoti = async (req:Request,res:Response) => {
    try{
        const response = await getLabNotiService();
        response
        ? res.status(200).send({msg:response})
        : res.status(400).send({msg:"Something went wrong"});
    }catch(error){
        console.log(`ERROR GETTING LAB NOTIFICATIONS=${error}`);
        handleHttp(res, `ERROR GETTING LAB NOTIFICATIONS=${error}`);
    }
}

/**
 * 
 * @param req 
 * @param res the notifications object
 */
export const getWarrantyNoti = async (req:Request,res:Response) => {
    try{
        const response = await getWarrantyNotiService();
        response
        ? res.status(200).send({msg:response})
        : res.status(400).send({msg:"Something went wrong"});
    }catch(error){
        console.log(`ERROR GETTING WARRANTY NOTIFICATIONS=${error}`);
        handleHttp(res, `ERROR GETTING WARRANTY NOTIFICATIONS=${error}`);
    }
}