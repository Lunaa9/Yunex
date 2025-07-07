import { LabModule } from '../../interfaces/lab/labIncidence.interface'
import labIncidencesModel from '../../models/lab/labIncidence.model'

/**
 * Generate a new labModule
 * @param labModule recive an labModule { ticket: string,
    admissionDate: string,
    module: string,
    equipment: string,
    serial: string,
    status: string,
    city: string,
    comments: string,
    contractNumber: string,
    client: string,
    sender: string,
    warranty: string,
    expectedOutDate: string,
    repairCenterResponsable: string,
    servicesResponsable: string,
    realOutDate: string,
    outDateCompliance: boolean,
    estimatedRepairTime: number,
    realRepairTime: number,
    repairTimeCompliance: boolean,
    year: number,
    failure: string,
    repairProcedure: string,
    repairTechnician: string,}
 * @returns string
 */
  const createLabModelservice = async (labModule:LabModule) => {
    try{
      let labModuleExist = await labIncidencesModel.findOne({ticket: labModule.ticket});
    if(labModuleExist){
        return "Alredy repair sheet";
    }else{
      const ticket = await GenerateTicket();
      labModule.ticket = ticket;
      labModule.admissionDate = GenerateDateEntry();
      labModule.expectedOutDate = GenerateexpectedOutDate();
      await labIncidencesModel.create(labModule);
      return "repair sheet created correctly";
    } 
    }catch(e){
      console.log(`ERROR CREATING LABMODEL=${e}`);
      return "invalid labModule object";
    }
  }

  /**
   * generate automatic ticket number
   * @returns string
   */

  const GenerateTicket = async (): Promise<string> => {
    const tickets = await labIncidencesModel.find({}, {ticket:1})
    const numerosTickets = tickets.map(ticket => parseInt(ticket.ticket.split('-')[1]));
    try{
        const lastTicket = Math.max(...numerosTickets); // latest mongo collection wanted for the ticket
        let nextTicket = 1;  //if there are no more tickets, you will be assigned 1     
      if (lastTicket) {
        nextTicket = lastTicket + 1; // but if the last ticket is found, it is added 1
      }
        const Ticket = `L-${nextTicket}`; // the ticket number is assigned to the required format
        return Ticket.toString();
      
    }catch(e){
      console.log(`ERROR AL GENERAR EL NÚMERO DE TICKET: ${e}`);
      throw e;
    }
  }

  /**
   * generate automatic entry date
   * @returns string
   */
  const GenerateDateEntry = (): string => {
    const DateEntryinictial = new Date()
    const formatDay = DateEntryinictial.getDate();
    const formatMonth = DateEntryinictial.getMonth() + 1;
    const formatYear = DateEntryinictial.getFullYear();

    const DateEntry = `${formatDay}/${formatMonth}/${formatYear}`;
    return DateEntry
  }

  /**
   * generate automatic entry date
   * @returns string
   */
  const GenerateexpectedOutDate = (): string => {
    const DateExpexted = new Date()
    DateExpexted.setMonth(DateExpexted.getMonth()+1);
    const formatDay = DateExpexted.getDate();
    const formatMonth = DateExpexted.getMonth() + 1;
    const formatYear = DateExpexted.getFullYear();
  
    const DateEntry = `${formatDay }/${formatMonth}/${formatYear}`;
    return DateEntry

  }

  /**
   * Get one labModel of the collection
   * @param ticket 
   * @returns labModule { ticket: string,
    admissionDate: string,
    module: string,
    equipment: string,
    serial: string,
    status: string,
    city: string,
    comments: string,
    contractNumber: string,
    client: string,
    sender: string,
    warranty: string,
    expectedOutDate: string,
    repairCenterResponsable: string,
    servicesResponsable: string,
    realOutDate: string,
    outDateCompliance: boolean,
    estimatedRepairTime: number,
    realRepairTime: number,
    repairTimeCompliance: boolean,
    year: number,
    failure: string,
    repairProcedure: string,
    repairTechnician: string,} 
   */
const getOneLabModelService = async (ticket: string) => {
    const response = await labIncidencesModel.findOne({ ticket: ticket });
    return response;
  };

/**
 * Get all labModel of the collection
 * @returns labModule { ticket: string,
    admissionDate: string,
    module: string,
    equipment: string,
    serial: string,
    status: string,
    city: string,
    comments: string,
    contractNumber: string,
    client: string,
    sender: string,
    warranty: string,
    expectedOutDate: string,
    repairCenterResponsable: string,
    servicesResponsable: string,
    realOutDate: string,
    outDateCompliance: boolean,
    estimatedRepairTime: number,
    realRepairTime: number,
    repairTimeCompliance: boolean,
    year: number,
    failure: string,
    repairProcedure: string,
    repairTechnician: string,} 
 */
const getAllLabModelService = async () => {
  const response = await labIncidencesModel.find({});
  return response;
};

/**
 * Get filtered data labModel of the collection
 * @returns labModule { ticket: string,
    admissionDate: string,
    module: string,
    equipment: string,
    serial: string,
    status: string,
    city: string,
    comments: string,
    contractNumber: string,
    client: string,
    sender: string,
    warranty: string,
    expectedOutDate: string,
    repairCenterResponsable: string,
    servicesResponsable: string,
    realOutDate: string,
    outDateCompliance: boolean,
    estimatedRepairTime: number,
    realRepairTime: number,
    repairTimeCompliance: boolean,
    year: number,
    failure: string,
    repairProcedure: string,
    repairTechnician: string,} 
 */
const getFilteredDataService = async () => {
  const response = await labIncidencesModel.find({$or:[{status:'repairing'},
    {status:'irreparable',approved:false},{status:'repaired',approved:false}]});
  return response;
}

/**
 * Update an existing labmodel
 * @param labModel 
 * @returns string
 */
const updateLabModelService = async (labModule:LabModule) => {
  const response = await labIncidencesModel.findOneAndUpdate(
    { ticket: labModule.ticket }, labModule, 
  )
  if (response) {
    return "LabModule updated correctly";
  } else {
    return "Not LabModule";
  }
};

/**
 * out Update an existing labmodel
 * @param labModel 
 * @returns string
 */
const outeupdateLabModelService = async (labModule:LabModule) => {
  labModule.realOutDate = Generatedateupdate()

  const labIncidence = await labIncidencesModel.findOne ({ticket: labModule.ticket})
  const expectedOutDate = labIncidence?.expectedOutDate?.toString() ?? '';
  
  labModule.outDateCompliance = await GenerateoutDateCompliance(expectedOutDate)

  const response = await labIncidencesModel.findOneAndUpdate(
    { ticket: labModule.ticket }, labModule,
  )
  if (response) {
    return "LabModule updated correctly";
  } else return "Not LabModule";
};

/**
   * generate automatic out update date
   * @returns string
   */
const Generatedateupdate = (): string => {
  const DateExpexted = new Date()
  const formatDay = DateExpexted.getDate();
  const formatMonth = DateExpexted.getMonth() + 1;
  const formatYear = DateExpexted.getFullYear();

  const DateEntry = `${formatDay }/${formatMonth}/${formatYear}`;
  return DateEntry
}

/**
   * automatically generates whether or not the departure date has been met. 
   * @returns boolean
   */
const GenerateoutDateCompliance = async ( expectedOutDate:string) => {
  const realDate = Generatedateupdate()
  const [DD, MM, YYYY] = realDate.split("/").map(num => parseInt(num))
  const [dd, mm, yyyy] = expectedOutDate.split("/").map(num => parseInt(num))

  const outDate = new Date(`${YYYY}-${MM}-${DD}`)
  const expectDate = new Date(`${yyyy}-${mm}-${dd}`)

  if (outDate <= expectDate){
    return true
  } else {
    return false
  }
}

/**
 * Delete an existing labModule
 * @param ticket 
 * @returns string
 */
const deleteLabModelService = async (ticket: string) => {
  const response = await labIncidencesModel.deleteOne({ ticket: ticket });
  if (response) {
    return "LabModel deleted correctly";
  } else return "Not LabModel";
};

export {
    createLabModelservice,
    getOneLabModelService,
    getAllLabModelService,
    updateLabModelService,
    deleteLabModelService,
    outeupdateLabModelService,
    getFilteredDataService
}