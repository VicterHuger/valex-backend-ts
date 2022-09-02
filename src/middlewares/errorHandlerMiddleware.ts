import { Request, Response, NextFunction } from "express";

export default function errorHandler(error:any, req:Request, res:Response, next:NextFunction){
    console.log(error);
    const errorStatus={
        "Unauthorized":401,
        "NotFound":404,
        "InternalServerError":500
    }
    if(errorStatus[error.code]===undefined) return res.sendStatus(500);
    return res.status(errorStatus[error.code]).send(error.message);
}