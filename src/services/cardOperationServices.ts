import Cryptr from 'cryptr';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import * as cardRepository from '../repositories/cardRepository'
import * as companyRepository from '../repositories/companyRepository'
import * as employeeRepository from '../repositories/employeeRepository';
import { generateThrowErrorMessages } from '../middlewares/errorHandlerMiddleware';



export async function createCard(body: { type: cardRepository.TransactionTypes }, employeeId: number, headers: string) {

    await verifyReturnExistingItem(headers, companyRepository.findByApiKey, "Unauthorized", "There is no company with this API-key");

    const employee:employeeRepository.Employee = await verifyReturnExistingItem(employeeId, employeeRepository.findById, "NotFound", "There is no employee with this id");

    const cardEmployee: cardRepository.Card | undefined = await cardRepository.findByTypeAndEmployeeId(body.type, employeeId);

    if (cardEmployee) {
        generateThrowErrorMessages("Conflict", `The employee ${employee.fullName} has already an card of ${body.type} type!`)
    }

    const newCard = generateNewCard(employeeId, employee.fullName, body.type);
    
    const rowCount:number = await cardRepository.insert(newCard);

    if(rowCount===0) generateThrowErrorMessages("InternalServerError", "It was not possible to insert a new card");
    
    return;

}

async function verifyReturnExistingItem(item: string | number, callback: any, code: string, message: string) {
    
    const itemSearched = await callback(item);
    
    if (itemSearched === undefined) {
        generateThrowErrorMessages(code, message);
    }
    return itemSearched;
}

function createCardName(string: string) {
    const newString: string = string.toUpperCase();
    const names: string[] = newString.split(" ");
    const arrayNewNames = [names[0]];

    for (let i: number = 1; i < names.length - 1; i++) {
        if (names[i].length >= 3) arrayNewNames.push(names[i][0]);
    }

    arrayNewNames.push(names[names.length - 1]);

    return arrayNewNames.join(" ");
}

function createCardNumber(){
    return faker.random.numeric(16, { allowLeadingZeros: true })
}

function createCardExpirationDate(){
    return dayjs().add(5,"y").format("MM/YY");
}

function createEncryptedCVC(){
    const CVC:string = faker.random.numeric(3,{allowLeadingZeros:true});
    const cryptr:Cryptr = new Cryptr(process.env.CRYPTR_KEY);
    return cryptr.encrypt(CVC);  
}

function generateNewCard(employeeId:number, fullName:string, type:cardRepository.TransactionTypes ){
    
    const card:cardRepository.CardInsertData={
        employeeId,
        type,
        number:createCardNumber(),
        cardholderName:createCardName(fullName),
        expirationDate: createCardExpirationDate(),
        securityCode: createEncryptedCVC(),
        password:null,
        isVirtual:false,
        originalCardId:null,
        isBlocked:true
    }
    return card;

}