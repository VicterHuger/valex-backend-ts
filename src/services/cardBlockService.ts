import * as cardAuxiliarServices from './cardAuxiliarServices';
import * as cardRepository from '../repositories/cardRepository';
import { generateThrowErrorMessages } from '../middlewares/errorHandlerMiddleware';

export async function unblockCard(id:number, password:string) {
    const card:cardRepository.Card = await cardAuxiliarServices.verifyReturnExistingItem(id, cardRepository.findById,"NotFound", `There is no card with id ${id}`);
    if(cardAuxiliarServices.isCardExpired(card.expirationDate)) generateThrowErrorMessages("BadRequest", "This card is expired and can't be unblocked");
    if(!card.isBlocked) generateThrowErrorMessages("BadRequest", "This card is already unblocked!");
    return await cardAuxiliarServices.updateIsBlockByPassword(id, card.password, password, false);
}

export async function blockCard(id:number, password:string){
    const card:cardRepository.Card = await cardAuxiliarServices.verifyReturnExistingItem(id, cardRepository.findById,"NotFound", `There is no card with id ${id}`);
    if(cardAuxiliarServices.isCardExpired(card.expirationDate)) generateThrowErrorMessages("BadRequest", "This card is expired and can't be blocked");
    if(card.isBlocked) generateThrowErrorMessages("BadRequest", "This card is already blocked!");
    return await cardAuxiliarServices.updateIsBlockByPassword(id, card.password, password, true);

}