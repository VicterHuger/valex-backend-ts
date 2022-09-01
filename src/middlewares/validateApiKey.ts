import { Request, Response, NextFunction} from "express";

export function validateApiKey(req:Request, res: Response, next: NextFunction){
    const apiKey:string|string[] = req.headers["x-api-key"];

    if(!apiKey || apiKey.length===0){
        return res.status(400).send("The header x-api-key is missing or it is wrong formated");
    }
    
    next();
}