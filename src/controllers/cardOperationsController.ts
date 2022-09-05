import { Request, Response} from "express";
import { Card, TransactionTypes } from "../repositories/cardRepository";

import * as cardOperationsService from "../services/cardOperationService"

export async function createCard(_req:Request, res:Response){
    const employeeId:number = res.locals.id;
    const body:{type:TransactionTypes}= res.locals.body;
    const apiKey:string = res.locals.apiKey;

    const newCard:Card = await cardOperationsService.createCard(body,employeeId,apiKey);

    return res.status(201).send(newCard);
}

export async function listTransactions(_req:Request, res:Response){
    const id:number = res.locals.id;
    const cardExtract = await cardOperationsService.listTransactions(id);
    return res.status(200).send(cardExtract);
}