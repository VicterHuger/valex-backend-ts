import * as businessRepository from '../repositories/businessRepository';
import * as cardRespository from '../repositories/cardRepository';
import * as cardAuxiliarServices from './cardAuxiliarServices';
import * as paymentRepository from '../repositories/paymentRepository';
import { listTransactions } from './cardOperationService';
import { generateThrowErrorMessages } from '../middlewares/errorHandlerMiddleware';

export async function createPurchase(cardId:number, businessId:number, amount:number, password:string){
    const card: cardRespository.Card = await cardAuxiliarServices.verifyReturnExistingItem(cardId, cardRespository.findById,"NotFound", `There is no card with id ${cardId}`);
    cardAuxiliarServices.verifyCardActivated(password);
    if(cardAuxiliarServices.isCardExpired(card.expirationDate)) generateThrowErrorMessages("BadRequest", "This card is expired and can't proceed the purchase!");
    if(card.isBlocked) generateThrowErrorMessages("BadRequest","This card can't proceed a purchase because it is blocked!");
    if(!cardAuxiliarServices.isPasswordCorrect(card.password, password)) generateThrowErrorMessages("Unauthorized", "The password is incorrect!");
    const business:businessRepository.Business = await businessRepository.findById(businessId);
    if(!business) generateThrowErrorMessages("NotFound", "There is no business signUp with this id");
    if(business.type!==card.type) generateThrowErrorMessages("BadRequest", "The card type doesn't match with the business type");
    const transactions = await listTransactions(cardId);
    if(transactions.balance<amount) generateThrowErrorMessages("Unauthorized","Purchase was not allowed, amount is lower than the card balance");
    const rowCount = await paymentRepository.insert({cardId, businessId, amount});
    if(rowCount===0) generateThrowErrorMessages("InternalServerError", "Something went wrong, it was not possible to register the purchase");
    return;
}

