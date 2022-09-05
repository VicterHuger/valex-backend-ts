import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import Cryptr from 'cryptr';
import * as cardAuxiliarServices from './cardAuxiliarServices'

import { generateThrowErrorMessages } from '../middlewares/errorHandlerMiddleware';
import * as cardRepository from '../repositories/cardRepository';

export async function activateCard(securityCode:string, password:string, id:number){
    const card:cardRepository.Card = await cardAuxiliarServices.verifyReturnExistingItem(id,cardRepository.findById,"NotFound", `There is no card with id ${id}`);
    if(cardAuxiliarServices.isCardExpired(card.expirationDate)) generateThrowErrorMessages("BadRequest", "This card is expired and can't be activated!");
    if(!!card.password) generateThrowErrorMessages("BadRequest","This card can't be activated because a password has been already signup");
    if(!isCVCCorrect(securityCode,card.securityCode)) generateThrowErrorMessages("Unauthorized", "The CVC is uncorrect!");
    if(!isPasswordLenghtCorrect(password)) generateThrowErrorMessages("UnprocessableEntity", "Password must contains four numbers!");
    const updatedCardProperties:cardRepository.CardUpdateData = {
        password: encryptPassword(password)
    };
    const rowCount:number = await cardRepository.update(id,updatedCardProperties);
    if(rowCount===0) generateThrowErrorMessages("InternalServerError","Something went wrong and the card was not activated");
    return; 
}

function isCVCCorrect(CVC:string, encryptedCVC:string ){
    const cryptr:Cryptr = new Cryptr(process.env.CRYPTR_KEY);
    const descryptrCVC:string = cryptr.decrypt(encryptedCVC);
    return CVC === descryptrCVC;
}

function isPasswordLenghtCorrect(password:string):boolean{
    const regexExpression:RegExp =  /^\d{4}$/;
    return regexExpression.test(password); 
}

function encryptPassword(password:string){
    const encryptedPassword:string = bcrypt.hashSync(password,10);
    return encryptedPassword;
}