import { Request, Response } from "express";
import * as cardBlockService from '../services/cardBlockService';

export async function unblockCard(_req:Request, res:Response) {
    const id: number = res.locals.id;
    const password: string = res.locals.body.password;
    await cardBlockService.unblockCard(id, password);

    res.status(200).send("Card is unblocked!");
}

export async function blockCard(_req:Request, res:Response){
    const id: number = res.locals.id;
    const password: string = res.locals.body.password;

    await cardBlockService.blockCard(id, password);

    res.status(200).send("Card is blocked!")
}