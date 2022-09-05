import {Request, Response} from 'express';
import * as cardRechargeService from '../services/cardRechargeService'

export async function rechargeCard(_req:Request, res:Response){
    const id: number = res.locals.id;
    const amount: number = res.locals.body.amount;
    await cardRechargeService.rechargeCard(id, amount);
    return res.sendStatus(201);
}