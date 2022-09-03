import { Request, Response} from "express";
import { Card, TransactionTypes } from "../repositories/cardRepository";

import * as cardOperationsService from "../services/cardOperationService"

export async function createCard(req:Request, res:Response){
    const employeeId:number = res.locals.id;
    const body:{type:TransactionTypes}= res.locals.body;
    const apiKey:string = res.locals.apiKey;

    const newCard:Card = await cardOperationsService.createCard(body,employeeId,apiKey);

    return res.status(201).send(newCard);
}