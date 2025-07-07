import clientModel from '../../models/warranty/client.model';
import * as xlsx from "xlsx";
import { client } from '../../interfaces/warranties/client.interface';

/**
 * function create new clent by garantias
 * @param client Client{name: string, NIT: number, personInCharge: string, direction: string, email: string, phone:number, contract: string} to be created
 * @returns customer's message is created correctly
 */

const createClientService = async (client: client) => {
    const clientExist = await clientModel.findOne({name: client.name});
    if(clientExist){
        return "client exist";
    } else {
        let res = "";
        const newClient = await clientModel.create(client);
        newClient ? (res = "client create correctly") : (res = "error to create the client");
        return res
    }
}

/**
 * Function to update an existing Client
 * @param rolClient{name: string, NIT: number, personInCharge: string, direction: string, email: string, phone:number, contract: string} to be updated
 * @returns Message of how the update went
 */
const updateClientService = async (client: client) => {
    const clientExist = await clientModel.findOne({ name: client.name });
    if (clientExist) {
      let res = "";
      const updateRol = await clientModel.findOneAndUpdate({ name: client.name }, client);
      updateRol ? (res = "client updated ok") : (res = "Error updating client");
      return res;
    } else {
      return "Not existing client";
    }
  };

/**
 * Function to delete an existing client
 * @param name The name of the client that want to delete
 * @returns Message of how the delete went
 */
const deleteClientService = async (name: string) => {
  const clientExist = await clientModel.findOne({name: name});
  if(clientExist){
    let res = ""
    const deleteClient = await clientModel.findOneAndDelete({name: name});
    deleteClient ? (res = "client delete correctly") : (res = "Error delete client")
    return res;
  } else {
    return "Not existing client"
  }
};

/**
 * Function to get all clients stored
 * @returns All the stored clients or a message empty
 */
const getAllclientsService = async () => {
  const clientExist = await clientModel.find({})
  let res:any = "";
  clientExist ? (res = clientExist) : (res = "Empty");
  return res;
}

/**
 * Function to find a client by it's name
 * @param name The name of the client that want to find
 * @returns The client founded or a message not existing client
 */
const getClientService = async (name: string) => {
  const clientExist = await clientModel.findOne({name: name});
  if(clientExist){
    let res:any = "";
    clientExist ? (res = clientExist) : (res = "Empty");
    return res;
  }
}

/**
 * 
 * @param file 
 * @returns if the data was upload correctly
 */
const excelToJsonService = async (file:any) =>{
  const binaryData=file.data;
  const excel=xlsx.read(binaryData,{type:'buffer'});
  const pageName=excel.SheetNames;
  const data=xlsx.utils.sheet_to_json(excel.Sheets[pageName[0]]); 
  const json:Array<any>=data;
  const newData:Array<any>=[];
    for(let x of json){
      const keys = Object.keys(x);
      if(keys.length===6){
        if(!x.name) return false;
        if(!x.NIT) return false;
        if(!x.personInCharge) return false;
        if(!x.direction) return false;
        if(!x.email) return false;
        if(!x.phone) return false;
        newData.push(x);
      }else{
        return false;
      }
    }
  const response = await clientModel.insertMany(newData);
  if(response){
    return response;
  }else{
    return false;
  }
;}

export {
    createClientService,
    updateClientService,
    deleteClientService,
    getAllclientsService,
    getClientService,
    excelToJsonService
}