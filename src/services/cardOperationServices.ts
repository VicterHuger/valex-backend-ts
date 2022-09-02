import * as companyRepository from '../repositories/companyRepository'
import { errorObject } from '../utils/interfaces';

export async function createCard(body:object,headers:string){
    const company:companyRepository.Company |undefined = await companyRepository.findByApiKey(headers);
    
    if(company===undefined){
        const errorApi:errorObject= {
            code: "Unauthorized",
            message: "There is no company with this API-key"
        } 
        throw(errorApi);
    } 

    

}