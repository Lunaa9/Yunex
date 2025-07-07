import { Component } from '@angular/core';
import { contract } from 'src/app/interfaces/warranties/contract.interface';
import { DataService } from '../../services/data.service';
import { WarrantyModulesService } from '../../services/warranty-modules.service';
import { WarrantyModule } from 'src/app/interfaces/warranties/warrantyModule.interface';
import { Actions } from 'src/app/interfaces/warranties/actions.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css'],
})
export class ModulesComponent {
  contract: contract[] = []; //array of the contract's modules
  serials: any[] = []; //serials array
  filterTable = ''; //filterTable params
  page: number = 0; //page number
  moduleData: any = ''; //component data
  showCrud: boolean = false; //crud validator
  void: boolean = false; //vaoid validator
  today: Date = new Date(); //the today date
  private subscription: Subscription; //all component subscriptions

  constructor(
    private module: WarrantyModulesService,
    private data: DataService
  ) {
    //subscription to warrantyData observable
    this.subscription = data.warrantyData.subscribe((module: any) => {
      this.moduleData = module;
    });
  }

  ngOnInit(): void {
    //subscription to object observable and validate to get modules
    this.subscription.add(
      this.data.object.subscribe((object) => {
        this.showCrud = object.show;
        if (!object.show) {
          this.getContract();
        }
      })
    );
  }

  //unsubscribe all components subscriptions
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * get the modules with the contractName
   */
  getContract() {
    const contractNum = this.moduleData.contractNum;
    this.module.getOneModules(contractNum).subscribe((data) => {
      this.serials = data;
      if (this.serials.length <= 0) {
        this.void = true;
      }
    });
  }

  /**
   * show the crud-module with its corresponding act and module
   * @param module
   * @param action
   */
  crud(module: WarrantyModule, action: string) {
    const moduleObject: Actions = {
      module: module,
      action: action,
      show: true,
    };
    this.moduleData.serial = module.serial;
    this.data.setData(this.moduleData);
    this.data.setObject(moduleObject);
  }

  // getOneModule(module:WarrantyModule){
  //   this.moduleData.serial=module.serial;
  //   this.moduleData.toShow='';
  //   this.data.setData(this.moduleData);
  // };

  /**
   * validate if the module have warranty yet
   * @param date
   * @returns
   */
  noWarranty(date: string): boolean {
    const endDate = new Date(date);
    if (endDate > this.today) {
      return true;
    } else {
      return false;
    }
  }
}
