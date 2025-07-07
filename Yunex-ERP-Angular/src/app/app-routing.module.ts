import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { labRoleGuard} from './guards/lab-role.guard';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
      loadChildren: () =>
        import('./login-register/login-register.module').then((m) => m.LoginRegisterModule),
  },
  {
    path: '',
      loadChildren: () =>
        import('./login-register/login-register.module').then((m) => m.LoginRegisterModule),
  },
  {
    path: 'home',
      loadChildren: () =>
        import('./home/home.module').then((m) => m.HomeModule),
        canActivate:[authGuard]
  },
  {
    path: 'laboratory',
      loadChildren: () =>
        import('./laboratory/lab.module').then((m) => m.LabModule),
        canActivate:[labRoleGuard],
        
  },
  {
    path: 'ehs',
      loadChildren: () =>
        import('./ehs/ehs.module').then((m) => m.EHSModule),
        canActivate:[authGuard],
        
  },
  {
    path: 'store',
      loadChildren: () =>
        import('./store/almacen.module').then((m) => m.AlmacenModule),
        canActivate:[authGuard],
        
  },
  {
    path: 'vehiculos',
      loadChildren: () =>
        import('./vehicles/vehiculos.module').then((m) => m.VehiculosModule),
        canActivate:[authGuard],
        
  },
  {
    path: 'garantias',
      loadChildren: () =>
        import('./warranty/warranty.module').then((m) => m.GarantiasModule),
        canActivate:[authGuard],
        
  },
  {
    path: 'admin',
      loadChildren: () =>
        import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate:[authGuard],
        
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
