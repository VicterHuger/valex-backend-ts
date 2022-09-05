import { Request, Response } from "express";
import * as cardActivationService from '../services/cardActivationService'

export async function activateCard(_req: Request, res: Response) {
    const id: number = res.locals.id;
    const securityCode: string = res.locals.body.securityCode;
    const password: string = res.locals.body.password;

    await cardActivationService.activateCard(securityCode, password, id);

    return res.status(200).send("Card activated!");

}