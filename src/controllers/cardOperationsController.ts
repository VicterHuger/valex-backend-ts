import { Request, Response} from "express";
import * as cardOperationsService from "../services/cardOperationServices"

export async function createCard(req:Request, res:Response){
    const body:object= res.locals.body;
    const apiKey:string = res.locals.apiKey;

    await cardOperationsService.createCard(body,apiKey);

    return res.sendStatus(201);
}