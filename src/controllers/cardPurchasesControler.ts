import {Request, Response} from 'express';
import * as paymentRepository from '../repositories/paymentRepository';
import * as cardPurchasesService from '../services/cardPurchasesService';

type BodyPurchase = Omit<paymentRepository.PaymentInsertData, "cardId" > & {password:string};

export async function createPurchase(_req:Request, res:Response){
    const cardId:number = res.locals.id;
    const {businessId, amount, password}:BodyPurchase =res.locals.body;
    const body = res.locals.body;
    await cardPurchasesService.createPurchase(cardId, businessId, amount, password);
    return res.sendStatus(201);
}
