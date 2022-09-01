import { Request, Response, NextFunction } from "express";

export interface errorObject {
    code:string,
    message:string
}

export async function errorHandler(error:any|errorObject, req:Request, res:Response, next:NextFunction){
    console.log(error);
    const errorStatus={
        "NotFound":404,
        "InternalServerError":500
    }
    if(errorStatus[error.code]===undefined) return res.sendStatus(500);
    return res.status(errorStatus[error.code]).send(error.message);
}