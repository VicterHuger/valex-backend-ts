import { Request, Response, NextFunction} from "express";

export function validateApiKey(req:Request, res: Response, next: NextFunction){
    const apiKey = <string>req.headers['x-api-key'];
    console.log(req.headers["x-api-key"]);

    if(!apiKey){
        return res.status(400).send("The header x-api-key is missing or it is wrong formated");
    }
    
    res.locals.apiKey= apiKey;
    next();
}