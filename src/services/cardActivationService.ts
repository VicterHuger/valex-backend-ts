import { generateThrowErrorMessages } from '../middlewares/errorHandlerMiddleware';
import * as cardRepository from '../repositories/cardRepository';

export async function activateCard(securityCode:string, password:string, id:number){
    const card:cardRepository.Card = await cardRepository.findById(id);
    if(card===undefined) generateThrowErrorMessages("NotFound", `There is no card with id ${id}`);
    
}