import labIncidencesModel from "../../models/lab/labIncidence.model";
import warrantyTicketModel from '../../models/warranty/warrantyTicket.model';
import contractModel from '../../models/warranty/contract.model';

/**
 * 
 * @returns the today and tomorrow date
 */
const genDates = async () => {
    const today=new Date();
    const nextDay=new Date();
    nextDay.setDate(nextDay.getDate()+1);
    today.setHours(0,0,0,0);
    nextDay.setHours(0,0,0,0);
    return {today:today,nextDay:nextDay};
}

/**
 * 
 * @returns An object with the current laboratory notifications
 */
const getLabNotiService = async () => {
    const date = await genDates();
    const danger:Array<any>=[];
    const warning:Array<any>=[];
    const approved:Array<any>=[];
    const noti:Array<any> = await labIncidencesModel.find({status:{$ne:'approved'},approved:false},
        {_id:0,ticket:1,expectedOutDate:1,repairTechnician:1});
    for(let x of noti){
        const [d,m,y]=x.expectedOutDate.split('/');
        const strToDate = new Date(+y,+m -1,+d);
        if( strToDate < date.today){
            danger.push(x);
        }else if( strToDate.getTime() == date.today.getTime() || strToDate.getTime() == date.nextDay.getTime()){
            warning.push(x);
        }else if(x.status==='repaired' || x.status==='irreparable'){
            approved.push(x);
        }
    }
    const response={
        danger:danger,
        warning:warning,
        approved:approved
    }
    return response;
}

/**
 * 
 * @returns An object with the current warranty notifications
 */
const getWarrantyNotiService = async () => {
    const date = await genDates();
    const danger:Array<any>=[];
    const warning:Array<any>=[];
    const contracts:Array<any>= await contractModel.find({activeWarranty:true},{_id:0,contractName:1,endWarranty:1,clientName:1});
    const tickets:Array<any> = await warrantyTicketModel.find({realEndDate:"",startAttentionDate:{$ne:""}},
        {_id:0,ticket:1,startAttentionDate:1,status:1,module:1});
    const noti = contracts.concat(tickets);
    for(let x of noti){
        if(x.startAttentionDate){
            const [y,m,d]=x.startAttentionDate.split('-');
            const strToDate = new Date(+y,+m -1,+d);
            strToDate.setDate(strToDate.getDate()+90);
            if( strToDate <= date.today){
                danger.push(x);
            }
        }else if(x.endWarranty){
            const [y,m,d]=x.endWarranty.split('-');
            const strToDate = new Date(+y,+m -1,+d);
            if( strToDate <= date.today){
                warning.push(x);
            }
        }
    }
    const response={
        danger:danger,
        warning:warning,
    }
    return response;
}

export{
    getLabNotiService,
    getWarrantyNotiService
}