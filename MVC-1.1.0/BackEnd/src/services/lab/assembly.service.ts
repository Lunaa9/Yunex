import assemblyModel from "../../models/lab/assembly.model";
import {assembly} from "../../interfaces/lab/assembly.interface";
import * as xlsx from "xlsx";

/**
 * A message according if the assembly was created correctly or it's already exists
 * @param assembly 
 * @returns string
 */
const createAssemblyService = async(assembly:assembly) => {
    try{
        const exists = await assemblyModel.findOne({consecutive:assembly.consecutive});
        if(exists){
            return "The assembly already exists";
        }else{
            assembly = await generateConsecutive(assembly);
            await assemblyModel.create(assembly);
            return "Assembly created correctly";
        }
    }catch(error){
        console.log(`SOMETHING WENT WRONG CREATING NEW ASSEMBLY: ${error}`);
        throw error;
    }  
};

/**
 * return the assembly with default values
 * @returns assembly
 */
const generateConsecutive = async(assembly:assembly) => {
    const today=new Date();
    const consecutives = await assemblyModel.find({},{consecutive:1});
    const consecAmount = consecutives.map(ticket => ticket.consecutive);
    try{
        const lastNum = Math.max(...consecAmount);
        const newConsec = lastNum>0 ? lastNum+1 : 1;
        
        assembly.consecutive=newConsec;
        assembly.startDate=today.toLocaleDateString('sv-SE');

        let [y,m]:any = assembly.startDate.split('-');
        y=parseInt(y);
        m=parseInt(m);
        m>9
        ? assembly.year=y+1
        : assembly.year=y;

        return assembly;
    }catch(error){
        console.log(`SOMETHING WENT WRONG CREATING NEW ASSEMBLY: ${error}`);
        throw error;
    }
};

/**
 * 
 * @returns Get an assembly array [{consecutive:number,
    startDate:string,
    graph:string,
    assemblyType:string,
    amount:number,
    status:string,
    contract:string,
    client:string,
    senderName:string,
    expectedOutDate:string,
    realEndDate:string,
    complianceDate:boolean,
    received:string,
    assemblyRes:string,
    serviceRes:string}]
 */
const getAllAssembliesService = async() => {
    const response = await assemblyModel.find();
    return response;
}

/**
 * 
 * @param consec 
 * @returns Get one assembly object {consecutive:number,
    startDate:string,
    graph:string,
    assemblyType:string,
    amount:number,
    status:string,
    contract:string,
    client:string,
    senderName:string,
    expectedOutDate:string,
    realEndDate:string,
    complianceDate:boolean,
    received:string,
    assemblyRes:string,
    serviceRes:string}
 */
const getOneAssemblyService = async(consec:string) => {
    const response = await assemblyModel.findOne({consecutive:consec});
    return response;
}

/**
 * update an Assembly
 * @param assembly 
 * @returns A message if the assembly was updated correctly
 */
const updateAssemblyService = async(assembly:assembly) => {
    if(assembly.received){
        let [y,m,d]:any= assembly.expectedOutDate.split('-');
        y=parseInt(y);
        m=parseInt(m);
        d=parseInt(d);
        const expDate = new Date(y,m-1,d);
        const today=new Date();
        today.setHours(0,0,0,0);
        today>expDate ? assembly.complianceDate=false : assembly.complianceDate=true;
        assembly.status='finished';
        assembly.realEndDate=today.toLocaleDateString('sv-SE');
    }
    const response = await assemblyModel.updateOne({consecutive:assembly.consecutive},assembly);
    if (response){
        return "Assembly updated correctly";
    }else{
        return "Not Assembly";
    }
}

/**
 * 
 * @param consec 
 * @returns A message if the assembly was deleted correctly
 */
const deleteAssemblyService = async(consec:string) => {
    const response = await assemblyModel.deleteOne({consecutive:consec});
    if(response){
        return "Assembly deleted correctly";
    }else{
        return "Not assembly deleted"
    }
}

/**
 * 
 * @param file 
 * @returns if the data was upload correctly
 */
const uploadExcelService = async(file:any) => {
    let consecutive=0;
    const binaryData=file.data;
    const excel=xlsx.read(binaryData,{type:'buffer'});
    const pageName=excel.SheetNames;
    const data=xlsx.utils.sheet_to_json(excel.Sheets[pageName[0]]); 
    const json:Array<any>=data;
    const newData:Array<any>=[];
        for(let x of json){
            const keys = Object.keys(x);
            if(keys.length===13){
                if(!x.startDate) return false;
                if(!x.graph) return false;
                if(!x.assemblyType) return false;
                if(!x.amount) return false;
                if(!x.status) return false;
                if(!x.contract) return false;
                if(!x.client) return false;
                if(!x.senderName) return false;
                if(!x.expectedOutDate) return false;
                if(!x.realEndDate) return false;
                if(!x.received) return false;
                if(!x.assemblyRes) return false;
                if(!x.serviceRes) return false;
                consecutive>0 ? x.consecutive=consecutive+1 : null;
                x = await completeAssembly(x);
                if(!x){
                    return false
                }else{
                    consecutive=x.consecutive;
                    newData.push(x);
                }
            }else{
                return false;
            }
        }
    const response = await assemblyModel.insertMany(newData);
    if(response){
        return response;
    }else{
        return false;
    }
}

/**
 * complete the assembly from the excel
 * @param assembly 
 * @returns 
 */
const completeAssembly = async (assembly:any) => {
    //validates the dates integrity and becamos them to the right format
    let valiDate = typeof assembly.expectedOutDate;
    if(typeof assembly.startDate!=='number')return false;
    if(valiDate!=='number' && assembly.expectedOutDate!=='-')return false;
    
    const fDate = new Date(1899,11,30);
    fDate.setDate(fDate.getDate()+assembly.startDate);
    const startDate=new Date(fDate).toLocaleDateString('sv-SE');
    assembly.startDate=startDate;
    
    if(assembly.expectedOutDate==='-'){
        if(assembly.realEndDate!=='-' || assembly.received!=='-'){
            return false;
        }else{
            assembly.expectedOutDate='';
            assembly.realEndDate='';
            assembly.received='';
        }
    }else{
        valiDate = typeof assembly.realEndDate;
        if(valiDate!=='number' && assembly.realEndDate!=='-')return false;

        if(assembly.realEndDate==='-'){
            if(assembly.received!=='-'){
                return false;
            }else{
                assembly.realEndDate='';
                assembly.received='';
            }
        }else if(assembly.received==='-'){
            return false;
        }else{
            const intDate = new Date(1899,11,30);
            intDate.setDate(intDate.getDate()+assembly.realEndDate);
            const realDate=new Date(intDate).toLocaleDateString('sv-SE');
            assembly.realEndDate=realDate;
        }
        const intDate = new Date(1899,11,30);
        intDate.setDate(intDate.getDate()+assembly.expectedOutDate);
        const expDate=new Date(intDate).toLocaleDateString('sv-SE');
        assembly.expectedOutDate=expDate;
    }
    //generates the new consecutive
    if(!assembly.consecutive){
        const consecutives = await assemblyModel.find({},{consecutive:1});
        const consecAmount = consecutives.map(ticket => ticket.consecutive);
        const lastNum = Math.max(...consecAmount);
        assembly.consecutive = lastNum>0 ? lastNum+1 : 1;
    }
    //takes the business year
    let [y,m]:any = assembly.startDate.split('-');
    y=parseInt(y);
    m=parseInt(m);
    m>9 ? assembly.year=y+1 : assembly.year=y;
    //makes the validation of the finish date compliance
    if(assembly.realEndDate && assembly.expectedOutDate){
        let [y,m,d]:any= assembly.expectedOutDate.split('-');
        y=parseInt(y);
        m=parseInt(m);
        d=parseInt(d);
        const expDate = new Date(y,m-1,d);
        const today=new Date();
        today.setHours(0,0,0,0);
        today>expDate ? assembly.complianceDate=false : assembly.complianceDate=true;
        assembly.status='finished';
        assembly.realEndDate=today.toLocaleDateString('sv-SE');
    }else assembly.complianceDate=false;
    
    return assembly;
}

export{
    createAssemblyService,
    getAllAssembliesService,
    getOneAssemblyService,
    updateAssemblyService,
    deleteAssemblyService,
    uploadExcelService
}