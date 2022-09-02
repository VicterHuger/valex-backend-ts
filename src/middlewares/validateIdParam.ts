import { Request, Response, NextFunction } from "express";
import { stripHtml } from "string-strip-html";

export function validateIdParam(req:Request, res:Response, next: NextFunction){
    const id:number = Number(stripHtml(req.params.id).result.trim());
    if(!id) return res.status(422).send("Id must be a valid one");
    res.locals.id=id;
    next();
}