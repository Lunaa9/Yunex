import FormatstModel from '../../models/warranty/formats.model';
import {formats} from '../../interfaces/warranties/formats.interface'

/**
 * 
 * @param formatFile receives a file name: string,
  data: Buffer,
  size: number,
  encoding: string,
  tempFilePath: string,
  truncated: boolean,
  mimetype: string,
  md5: string,
  mv: Array}{
 * @returns string
 */
const createFormatFileService = async (formatFile:any)=>{
  try{
    const fileData= await generateFormatFile(formatFile)
    await FormatstModel.create(fileData);
    return "File added correctly";
  }catch(error){
    console.log(`ERROR ADDED FILE=${error}`);
    return "FILE NOT CREATED";
  }
};

/**
 * generate the fileData object
 * @param ticketFile 
 * @returns a fileData
 */
const generateFormatFile = async (ticketFile:any): Promise<formats> => {
  const tickets = await FormatstModel.find({},{ticket:1,_id:0});
  const ticketNumber = tickets.map(ticket => parseInt(ticket.ticket.split('-')[1]));
  try{
      const lastTicket = Math.max(...ticketNumber);
      let nextTicket = 1;
      if (lastTicket>0){
          nextTicket = lastTicket+1;
      }
      const ticket = `FF-${nextTicket}`;
      const fileData:formats= {
        ticket:ticket,
        name:await clearName(ticketFile.name),
        fileType:ticketFile.name.slice(ticketFile.name.lastIndexOf('.')+1),
        data:ticketFile.data,
        size:Math.round(ticketFile.size/1000),
        mimetype:ticketFile.mimetype,
        date:new Date().toLocaleDateString('es-CO', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
      };
      return fileData;
  } catch(error){
      console.log(`ERROR GENERATING CREATING FILE OBJECT: ${error}`);
      throw error;
  }
};

/**
 * clear the name format and change it if the name exist
 * @param fileName 
 * @param create 
 * @returns string
 */
const clearName = async(fileName:string):Promise<string> =>{
  fileName=fileName.slice(0,fileName.lastIndexOf('.'));
  const sameFileName = await FormatstModel.find({},{name:1,_id:0});

  try{
    if(fileName){
      const numName = sameFileName.filter((name)=>{
        const files = name.name.slice(0,name.name.lastIndexOf('('));    
        if(files === fileName || fileName === name.name){
          return 1;
        }
      });
      
      if(numName.length>0) {
        const nFiles = numName.length.toString();
        const newFileName=fileName+`(${nFiles})`;
        return newFileName;
      }
    };
    return fileName;
  }catch(error){
    console.log(`ERROR GIVING A NEW FILE NAME: ${error}`);
    throw error;
  }
};

/**
 * 
 * @param name 
 * @returns formatFile {name: string,
  data: Buffer,
  size: number,
  mimetype: string}
 */
const getOneFormatFileService = async (name:string)=>{
  const response = await FormatstModel.findOne({name:name},{data:1,_id:0});
  return response;
};

/**
 * returns all formatFiles files
 * @returns formatFile {name: string,
  data: Buffer,
  size: number,
  mimetype: string}
 */
const getAllFormatFileService = async ()=>{
  const response = await FormatstModel.find({},{data:0});
  return response;
};

/**
 * 
 * @param formatFile 
 * @returns string
 */
const updateWarrantyProcedureService = async (formatFile:any)=>{
  formatFile.name=await clearName(formatFile.name);
  const response = await FormatstModel.findOneAndUpdate({name:formatFile.name},formatFile);
  if(response){
    return "Module formatFile updated correctly"
  }else{
    return "NOT FORMAT FILE UPDATED"
  }
};

/**
 * 
 * @param name 
 * @returns string
 */
const deleteFormatFileService = async (name:string)=>{
  const response = await FormatstModel.deleteOne({name:name});
  if(response){
    return "FormatFile deleted correctly";
  }else{
    return "NOT WARRANTY FORMAT FILE";
  }
}

export {
    createFormatFileService,
    getOneFormatFileService,
    getAllFormatFileService,
    updateWarrantyProcedureService,
    deleteFormatFileService
}