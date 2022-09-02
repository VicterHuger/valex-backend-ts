import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { generateThrowErrorMessages } from '../middlewares/errorHandlerMiddleware';
import * as cardRepository from '../repositories/cardRepository';


export async function activateCard(securityCode:string, password:string, id:number){
    const card:cardRepository.Card = await cardRepository.findById(id);
    if(card===undefined) generateThrowErrorMessages("NotFound", `There is no card with id ${id}`);
    if(isCardExpired(card.expirationDate)) generateThrowErrorMessages("BadRequest", "This card is expired and can't be activated!");
    if(!!card.password) generateThrowErrorMessages("BadRequest","This card can't be activated because a password has been already signup");    
}

function isCardExpired(date:string):boolean{
    const arrayMonthYear = date.split("/");
    const newDate:dayjs.Dayjs = dayjs().month(Number(arrayMonthYear[0])-1).year(Number(arrayMonthYear[1])+2000).day(1);
    return dayjs().diff(newDate, 'M') > 0
}