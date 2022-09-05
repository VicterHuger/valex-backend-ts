import * as cardAuxiliarServices from "./cardAuxiliarServices";
import * as cardRepository from '../repositories/cardRepository';
import { generateThrowErrorMessages } from "../middlewares/errorHandlerMiddleware";
import * as rechargeRepository from '../repositories/rechargeRepository'

export async function rechargeCard(cardId:number, amount:number){
    const card = await cardAuxiliarServices.verifyReturnExistingItem(cardId, cardRepository.findById, "NotFound", `There is no card with id ${cardId}`);
    cardAuxiliarServices.verifyCardActivated(card.password);
    if(cardAuxiliarServices.isCardExpired(card.expirationDate)) generateThrowErrorMessages("BadRequest", "This card is expired and can't be recharged");
    const cardRecharge:rechargeRepository.RechargeInsertData = {
        cardId,
        amount
    }
    const rowCount = await rechargeRepository.insert(cardRecharge);
    if(rowCount===0) generateThrowErrorMessages("InternalServerError", "Something went wrong and it was not possible to insert a new recharge");
    return;
}