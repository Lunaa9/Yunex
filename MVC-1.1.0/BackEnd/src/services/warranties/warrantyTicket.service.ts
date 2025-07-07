import { updateObj, warrantyTicket } from '../../interfaces/warranties/warrantyTicket.interface';
import { warrantyModules } from '../../interfaces/warranties/modules.interface';
import warrantyTicketModel from '../../models/warranty/warrantyTicket.model';
import modulesModel from '../../models/warranty/modules.model';
import { TicketFiles, file } from '../../interfaces/warranties/ticketFiles.interface';

/**
 * 
 * @param warrantyticket receives an warrantyTicket { ticket: string, 
 *  module: Object,
    historical: Array<String>,
    newModulePrice: Number,
    documents: Array<any>,
    startRequestDate: String,
    startAttentionDate: String,
    estimatedEndDate: String,
    realEndDate: String,
    endDateCompliance: Boolean,
    quality: Boolean
    status: String}
 * @returns string
 */
const createWarrantyTicketService = async (ticketModule:warrantyModules,files:TicketFiles) => {
    try {
        const newTicket:warrantyTicket={
            ticket:await generateTicket(),
            module:ticketModule,
            newModulePrice:0,
            documents:files,
            startRequestDate:new Date().toLocaleDateString('sv-SE'),
            startAttentionDate:'',
            estimatedEndDate:'',
            realEndDate:'',
            endDateCompliance:false,
            quality:false,
            status:'started'
        };
        await warrantyTicketModel.create(newTicket);
        return "Warranty ticket created correctly";
    }catch(error){
        console.log(`ERROR CREATING WARRANTY TICKET=${error}`);
        return "Invalid warrantyTicket object";
    }
};
      
/**
* generate automatic ticket number
* @returns string
*/
const generateTicket = async (): Promise<string> => {
    const tickets = await warrantyTicketModel.find({},{ticket:1,_id:0});
    const ticketNumber = tickets.map(ticket => parseInt(ticket.ticket.split('-')[1]));
    try{
        const lastTicket = Math.max(...ticketNumber);
        let nextTicket = 1;
        if (lastTicket>0){
            nextTicket = lastTicket+1;
        }
        const ticket = `G-${nextTicket}`;
        return ticket.toString();
    }catch(error){
        console.log(`ERROR GENERATING THE TICKET NUMBER: ${error}`);
        throw error;
    }
};
      
/**
* 
* @param contractNum 
* @returns warrantyTicket {
    ticket: String,
    module: Object,
    historical: Array<String>,
    newModulePrice: Number,
    documents: Array<any>,
    startRequestDate: String,
    startAttentionDate: String,
    estimatedEndDate: String,
    realEndDate: String,
    endDateCompliance: Boolean,
    quality: Boolean
    status: String}
*/
    const getTicketByContractService = async (contractNum: string) => {
        const response = await warrantyTicketModel.find({ "module.contractNum": contractNum });
        return response;
    };

/**
* 
* @param serial 
* @returns warrantyTicket {
    ticket: String,
    module: Object,
    historical: Array<String>,
    newModulePrice: Number,
    documents: Array<any>,
    startRequestDate: String,
    startAttentionDate: String,
    estimatedEndDate: String,
    realEndDate: String,
    endDateCompliance: Boolean,
    quality: Boolean
    status: String}
*/
const getTicketsByModuleService = async (serial:string) => {  
    const response = await warrantyTicketModel.find({"module.serial":serial},{_id:0,ticket:1});
    return response;
}
      
/**
* Get all warrantyTicket of the collection
* @returns warrantyTicket {
    ticket: String,
    module: Object,
    historical: Array<String>,
    newModulePrice: Number,
    documents: Array<any>,
    startRequestDate: String,
    startAttentionDate: String,
    estimatedEndDate: String,
    realEndDate: String,
    endDateCompliance: Boolean,
    quality: Boolean
    status: String}
*/
const getAllWarrantyTicketService = async () => {
    const response = await warrantyTicketModel.find({});
    return response;
};
      
/**
* 
* @param ticket 
* @returns warrantyTicket {
    ticket: String,
    module: Object,
    historical: Array<String>,
    newModulePrice: Number,
    documents: Array<any>,
    startRequestDate: String,
    startAttentionDate: String,
    estimatedEndDate: String,
    realEndDate: String,
    endDateCompliance: Boolean,
    quality: Boolean
    status: String}
*/
const getOneWarrantyTicketService = async (ticket:string) => {
const response = await warrantyTicketModel.findOne({ticket:ticket});
return response;
}
      
/**
* 
* @param warrantyticket 
* @returns string
*/
const updateWarrantyTicketService = async (files:TicketFiles,updateObj:updateObj) => {
    if(updateObj.status==='storage' || updateObj.status==='finished'){
    const ticketModule = await warrantyTicketModel.findOne({ticket:updateObj.ticket});
    if(ticketModule){
        let newTicket;
        await validationDate(files,ticketModule,updateObj.status).then((data)=>{
            newTicket=data;
            newTicket.quality=updateObj.quality;
        });               
        const response = await warrantyTicketModel.updateOne({ticket:updateObj.ticket},newTicket);
        if (response){
            return "WarrantyTicket updated correctly";
        } else {
                    return "NOT WarrantyTicket";
        }
    }else{
        return "NOT WarrantyTicket";
    }
    }
    const response = await warrantyTicketModel.updateOne({ticket:updateObj.ticket},
    {$set:{documents:files,status:updateObj.status,quality:updateObj.quality}}
    );
    if (response){
    return "WarrantyTicket updated correctly";
    } else {
    return "NOT WarrantyTicket";
    }
};

/**
* 
* @param file 
* @param ticketModule 
* @param status 
* @returns A ticket with its information updated
*/
const validationDate = async (file:TicketFiles, ticketModule:any,status:string) => {
    try{
        const today = new Date();
        today.setHours(0,0,0,0);
        ticketModule.status=status;
        if(status==='storage'){
            const [y,m,d] = ticketModule.module.endDateSupp.split('-');
            const date = new Date(y,m-1,d);
            const endDate = new Date();
            endDate.setHours(0,0,0,0);
            endDate.setDate(endDate.getDate()+120);
            ticketModule.startAttentionDate=today.toLocaleDateString('sv-SE');
            ticketModule.estimatedEndDate=endDate.toLocaleString('sv-SE').split(' ')[0];
            if(date<today){
                file.sendingSupplier.name='denied';
                file.sendingSupplier.file='denied';
                file.supplier.name='denied';
                file.supplier.file='denied';
                ticketModule.documents=file;
                return ticketModule;
            }else{
                file.laboratory.name='denied';
                file.laboratory.file='denied';
                ticketModule.documents=file;
                return ticketModule;
            }
        }else if(status==='finished'){
            const [y,m,d] = ticketModule.estimatedEndDate.split('-');
            const date = new Date(y,m-1,d);
            ticketModule.realEndDate=today.toLocaleDateString('sv-SE');
            if(date>today){
                ticketModule.endDateCompliance=true;
            } 
            ticketModule.documents=file;
            return ticketModule;
        }
                
    }catch(error){
        console.log(`ERROR UPDATING THE TICKET INFORMATION: ${error}`);
        throw error;
    }
}

/**
 * 
 * @param ticket 
 * @param newModule 
 * @param newSerial 
 * @returns return if the waterFall update was success
 */
const newModuleService = async (ticket:string,newModule:file,newSerial:string,newPrice:number)=>{
    try{
        const updTicket = await warrantyTicketModel.findOneAndUpdate({ticket:ticket},{$set:{"documents.newModule":newModule,status:'newModule',newModulePrice:newPrice}});
        if(updTicket){
            const serial = updTicket.module.serial;
            await modulesModel.updateOne({serial:serial},{$set:{"purchaseOrder":newModule,serial:newSerial}});
            const updModule = await modulesModel.findOne({serial:newSerial},{_id:0});
            const waterFall = await warrantyTicketModel.updateMany({"module.serial":serial},{$set:{module:updModule}});
            if(waterFall){
                return "Waterfall update was successful";
            }else{
                return "Waterfall update failed";
            }
        }else{
            return "Something went wrong";
        }
    }catch(error){
        console.log(`ERROR IN THE WATERFALL UPDATE: ${error}`);
        throw error;
    }
}

/**
* 
* @param ticket 
* @returns string
*/
const deleteWarrantyTicketService = async (ticket:string) => {
    const response = await warrantyTicketModel.deleteOne({ticket:ticket});
    if (response){
        return "WarrantyTicket deleted correctly"
    } else {
        return "NOT WarrantyTicket"
    }
};

export {
    createWarrantyTicketService,
    getTicketByContractService,
    getOneWarrantyTicketService,
    getAllWarrantyTicketService,
    updateWarrantyTicketService,
    deleteWarrantyTicketService,
    newModuleService,
    getTicketsByModuleService
}