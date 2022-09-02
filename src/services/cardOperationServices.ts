import * as cardRepository from '../repositories/cardRepository'
import * as companyRepository from '../repositories/companyRepository'
import * as employeeRepository from '../repositories/employeeRepository';
import { Card } from '../repositories/cardRepository';
import { generateThrowErrorMessages } from '../middlewares/errorHandlerMiddleware';

export async function createCard(body:Card,headers:string){
    // const company:companyRepository.Company |undefined = await companyRepository.findByApiKey(headers);
    
    await verifyReturnExistingItem(headers, companyRepository.findByApiKey, "Unauthorized", "There is no company with this API-key");
    
    const employee = await verifyReturnExistingItem(body.employeeId, employeeRepository.findById, "NotFound", "There is no employee with this id");

    const cardEmployee:cardRepository.Card | undefined = await cardRepository.findByTypeAndEmployeeId(body.type,body.employeeId);

    if(cardEmployee){
        generateThrowErrorMessages("Conflict", "This employee has already an card of this type!")
    }
    
    
    // if(company===undefined){
    //     const errorApi:errorObject= {
    //         code: "Unauthorized",
    //         message: "There is no company with this API-key"
    //     } 
    //     throw(errorApi);
    // } 

    // const employee: employeeRepository.Employee | undefined = await employeeRepository.findById(body.employeeId);

    // console.log(employee);

    // if(employee===undefined){
    //     const errorEmployeeId = {
    //         code: "NotFound",
    //         message: `There is no employee with this id`
    //     }
    //     throw(errorEmployeeId);
    // }

}

async function verifyReturnExistingItem(item:string|number, callback:any, code:string, message:string){
    const itemSearched = await callback(item);
    if(itemSearched===undefined){
        generateThrowErrorMessages(code,message);
    }
    return itemSearched;
}