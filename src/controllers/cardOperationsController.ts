import { Request, Response} from "express";
import { TransactionTypes } from "../repositories/cardRepository";

import * as cardOperationsService from "../services/cardOperationServices"

export async function createCard(req:Request, res:Response){
    const employeeId:number = res.locals.id;
    const body:{type:TransactionTypes}= res.locals.body;
    const apiKey:string = res.locals.apiKey;

    await cardOperationsService.createCard(body,employeeId,apiKey);

    return res.sendStatus(201);
}