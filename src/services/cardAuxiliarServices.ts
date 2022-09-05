import { generateThrowErrorMessages } from '../middlewares/errorHandlerMiddleware';
import dayjs from 'dayjs';

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
