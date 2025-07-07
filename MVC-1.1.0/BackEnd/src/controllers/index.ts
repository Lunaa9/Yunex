//import * as Assembly from "./assembly.controller";
import * as LabModule from "./lab/laboratory.controller";
import * as User from "./users/user.controller";
import * as Rol from "./users/rol.controllers";
import * as Module from "./lab/module.controller"
import * as Equipment from "./lab/equipment.controller"
import * as client from "./warranties/client.controller"
import * as contract from "./warranties/contract.controller"
import * as formats from "./warranties/formats.controller"
import * as warrantyProcedure from "./warranties/warrantyProcedure.controller";
import * as warrantyTicket from "./warranties/warrantyTicket.controller";
import * as modules from "./warranties/modules.controller";
import * as ticketFiles from './warranties/ticketFiles.controller';
import * as charts from './warranties/charts.controller';
import * as noti from './shared/noti.controller';
import * as assembly from './lab/assembly.controller';
import * as chartsLab from './lab/charts.contoller'
import * as vehicle from './vehicles/vehicle.controller'
import * as vehicleFiles from './vehicles/vehicle-files.controller'
import * as vehicleSecurity from './vehicles/security.controller'
export default {
  User,
  Rol,
  Module,
  Equipment,
  LabModule,
  client,
  contract,
  formats,
  warrantyProcedure,
  warrantyTicket,
  modules,
  ticketFiles,
  charts,
  noti,
  assembly,
  chartsLab,
  vehicle,
  vehicleFiles,
  vehicleSecurity
};
