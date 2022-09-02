import { Request, Response} from "express";
import { Card } from "../repositories/cardRepository";

import * as cardOperationsService from "../services/cardOperationServices"

export async function createCard(req:Request, res:Response){
    const body:Card= res.locals.body;
    const apiKey:string = res.locals.apiKey;

    await cardOperationsService.createCard(body,apiKey);

    return res.sendStatus(201);
}