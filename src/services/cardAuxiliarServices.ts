import { generateThrowErrorMessages } from '../middlewares/errorHandlerMiddleware';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import * as cardRepository from '../repositories/cardRepository'

export async function verifyReturnExistingItem(item: string | number, callback: any, code: string, message: string) {
    
    const itemSearched = await callback(item);
    
    if (itemSearched === undefined) {
        generateThrowErrorMessages(code, message);
    }
    return itemSearched;
}

export function isCardExpired(date:string):boolean{
    const arrayMonthYear:string[] = date.split("/");
    const newDate:dayjs.Dayjs = dayjs().month(Number(arrayMonthYear[0])-1).year(Number(arrayMonthYear[1])+2000).day(1);
    return dayjs().diff(newDate, 'M') > 0
}

export async function updateIsBlockByPassword(id:number, cardPassword:string, password:string, isBlocked:boolean){
    if(cardPassword && bcrypt.compareSync(password,cardPassword)){
        const updatedCardProperties:cardRepository.CardUpdateData = {
            isBlocked
        };
        const rowCount:number = await cardRepository.update(id,updatedCardProperties);
        if(rowCount===0) generateThrowErrorMessages("InternalServerError","Something went wrong and the card was not updated");
        return;
    }
    return generateThrowErrorMessages("Unauthorized", "The password is incorrect!");
}