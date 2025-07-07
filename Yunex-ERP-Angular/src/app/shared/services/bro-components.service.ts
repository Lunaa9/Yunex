import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { BalanceComponent } from '../../laboratory/pages/balance/balance.component';
import { ModulesComponent } from '../../laboratory/pages/modules/modules.component';
import { TableComponentP} from '../../laboratory/pages/table/tablep.component';
import { AssemblyComponent } from 'src/app/laboratory/pages/assembly/assembly.component';
import { labTechGuard } from '../../guards/Lab-tech.guard'

@Injectable({
  providedIn: 'root'
})
export class BroComponentsService {
  private actualRoute:string='';//This variable takes the current name's module
  private componentChild:Array<any>=[];//This array takes the current module's elements
  private content:string='dontRoute';//This variable takes the current module's route

  // This array has all modules with their elements
  private components:Array<any>=[
    {
      component:'laboratory',
      child:[
        {
          route:'Reparaciones',
          icon:'../../../../assets/img/tools.svg',
          path: '/laboratory/modules',
          component: ModulesComponent,
          rol:'LAB TECHINICIAN'
        },
        {
          route:'Balance',
          icon:'../../../../assets/img/graph-up-arrow.svg',
          path: '/laboratory/balance',
          component: BalanceComponent,
          canActivate:[labTechGuard],
        },
        {
          route:'General',
          icon:'../../../../assets/img/activity.svg',
          path: '/laboratory/table',
          component: TableComponentP,
          canActivate:[labTechGuard],
        },
        {
          route:'Ensambles',
          icon:'../../../../assets/img/gear.svg',
          path: '/laboratory/assembly',
          component: AssemblyComponent,
          canActivate:[labTechGuard],
        }
      ]
    },
    {
      component:'ehs',
      child:[
        {
          route:'inspecciones',
          icon:'',
          path:'/ehs/doc-ehs'
        }
      ]
    },
    {
      component:'garantias',
      child:[
        {
          route:'Garantias',
          icon:'../../../../assets/img/award-fill.svg',
          path:'/garantias/garantias'
        },
        {
          route:'General',
          icon:'../../../../assets/img/activity.svg',
          path:'/garantias/general'
        },
        {
          route:'Balance',
          icon:'../../../../assets/img/graph-up-arrow.svg',
          path:'/garantias/balance'
        },
        {
          route:'Archivos',
          icon:'../../../../assets/img/file-earmark-richtext.svg',
          path:'/garantias/documents'
        },
      ]
    },
    {
      component:'store',
      child:[
        {
          route:'balance',
          icon:'',
          path:'/store/balance'
        }
      ]
    },
    {
      component:'vehiculos',
      child:[
        {
          route:'soat',
          icon:'../../../../assets/img/vehicle.svg',
          path:'/vehiculos/soat'
        },
        {
          route:'documentos',
          icon:'../../../../assets/img/documents.svg',
          path:'/vehiculos/documents'
        }
      ]
    },
    {
      component:'admin',
      child:[
        {
          route:'LabAdmin',
          icon:'',
          path:'/admin/LabAdmin'
        }
      ]
    },
  ];

  constructor(private router:Router){ 
    this.actualRoute= window.location.pathname.split('/')[1];
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.actualRoute= window.location.pathname.split('/')[1];
      }
    });
  }

  /**This function returns an array with the current module's components and their elements
   * @returns array
   */
  componentsChildList() {
    for(let x of this.components){
      if(x.component===this.actualRoute){
        this.componentChild=x.child;
      }
    }
    return this.componentChild;
  }


  /**This function returns the current route if it is content's part
   * @returns string
   */
  showContent(){
    for(let x of this.components){
      if(x.component===this.actualRoute){
        this.content=x.child[0].path;
        for(let y of x.child){
          if(y.path===window.location.pathname){
            this.content=y.path;
          }
        }
      }
    }
    return this.content;
  }
}