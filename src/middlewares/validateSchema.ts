import { Request, Response, NextFunction } from "express";
import {stripHtml} from "string-strip-html";
import joi from 'joi';


export default function validateSchema(schema:joi.ObjectSchema){
    return (req:Request,res:Response, next:NextFunction):Response|void=>{
        console.log("aqui");
        const body:object = req.body;

        for(const key of Object.keys(body)){
            typeof(body[key])==="string" ? body[key]=stripHtml(body[key])?.result.trim() : body[key];
        }

        const error:joi.ValidationError = schema.validate(body, {abortEarly:false}).error;

        if(error){
            const errorMessages:string[] = error.details.map(item=>item.message);
            const finalError=errorMessages.reduce((prev:string, curr:string)=>{
                return`${prev} \n ${curr}`;
            },"");
            return res.status(422).send(finalError);
        }else{
            res.locals.body= body;
            next();
        }
        
    }
}