import bcrypt from 'bcrypt';
import * as cardAuxiliarServices from './cardAuxiliarServices';
import * as cardRepository from '../repositories/cardRepository';
import { generateThrowErrorMessages } from '../middlewares/errorHandlerMiddleware';

export async function unblockCard(id:number, password:string) {
    const card:cardRepository.Card = await cardAuxiliarServices.verifyReturnExistingItem(id, cardRepository.findById,"NotFound", `There is no card with id ${id}`);
    if(cardAuxiliarServices.isCardExpired(card.expirationDate)) generateThrowErrorMessages("BadRequest", "This card is expired and can't be blocked");
    if(!card.isBlocked) generateThrowErrorMessages("BadRequest", "This card is already unblocked!");
    if(card.password && bcrypt.compareSync(password,card.password)){
        const updatedCardProperties:cardRepository.CardUpdateData = {
            isBlocked:false
        };
        const rowCount:number = await cardRepository.update(id,updatedCardProperties);
        if(rowCount===0) generateThrowErrorMessages("InternalServerError","Something went wrong and the card was not unblocked");
        return;
    }
    return generateThrowErrorMessages("Unauthorized", "The password is incorrect!");
}