import contractModel from '../../models/warranty/contract.model';
import { contract } from '../../interfaces/warranties/contract.interface';

/**
 * function create new contract by garantias
 * @param client contract{ handover:object,
    seriales:any[],
    initWarranty:string,
    endWarranty:string,
    contractName:string,
    ceco:number,
    modules:object,
    tickets:any[]} to be created
 * @returns customer's message is created correctly
 */

const createContractService = async (contract: contract) => {
    const contractExist = await contractModel.findOne({contractName: contract.contractName});
    if(contractExist){
        return "contract exist";
    }else{
        let res = "";
        const date = contract.endWarranty;
        contract.activeWarranty = await warrantyActive(date);
        const newContract = await contractModel.create(contract);
        newContract ? (res = "contract create correctly") : (res = "error to create the contract");
        return res;
    };
}

const warrantyActive = async ( endWarranty:string) => {
  const realDate = new Date().toLocaleDateString('sv-SE');
  const [YYYY, MM, DD] = realDate.split("-").map(num => parseInt(num));
  const [yyyy, mm, dd] = endWarranty.split("-").map(num => parseInt(num));
  
  const today = new Date(`${YYYY}-${MM}-${DD}`);
  const EndWarranty = new Date(`${yyyy}-${mm}-${dd}`);

  if(EndWarranty >= today){
    return true
  }else{
    return false
  };
}


/**
 * Function to update an existing contract
 * @paramclient contract{ handover:object,
    seriales:any[],
    initWarranty:string,
    endWarranty:string,
    contractName:string,
    ceco:number,
    modules:object,
    tickets:any[]} to be created
 * @returns Message of how the update went
 */
const updateContractService = async (contract: contract) => {
    const contractExist = await contractModel.findOne({ contractName: contract.contractName});
    if (contractExist) {
      let res = "";
      const updatecontract = await contractModel.findOneAndUpdate({ contractName: contract.contractName }, contract);
      updatecontract ? (res = "contract updated ok") : (res = "Error updating contract");
      return res;
    } else {
      return "Not existing contract";
    }
  };

/**
 * Function to delete an existing contract
 * @param contractName The name of the contract that want to delete
 * @returns Message of how the delete went
 */
const deleteContractService = async (contractName: string) => {
  const contractExist = await contractModel.findOne({contractName: contractName});
  if(contractExist){
    let res = ""
    const deleteContract = await contractModel.findOneAndDelete({contractName: contractName});
    deleteContract ? (res = "contract delete correctly") : (res = "Error delete contract")
    return res;
  } else {
    return "Not existing contract"
  }
};

/**
 * Function to get all contract stored
 * @returns All the stored contract or a message empty
 */
const getAllContractService = async () => {
  const contractExist = await contractModel.find({},{handover:0})
  let res:any = "";
  contractExist ? (res = contractExist) : (res = "Empty");
  return res;
}

/**
 * Function to find a contract by it's contractName
 * @param name The contractName of the contract that want to find
 * @returns The contract founded or a message not existing contract
 */
const getContractByClientService = async (clientName: string) => {
  const contractExist = await contractModel.find({clientName: clientName},{handover:0});
  if(contractExist){
    let res:any = "";
    contractExist ? (res = contractExist) : (res = "Empty");
    return res;
  }
}

export {
    createContractService,
    updateContractService,
    deleteContractService,
    getAllContractService,
    getContractByClientService
}