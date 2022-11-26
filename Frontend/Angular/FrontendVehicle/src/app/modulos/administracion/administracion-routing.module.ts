import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { BuscarUsuarioComponent } from './usuarios/buscar-usuario/buscar-usuario.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './usuarios/eliminar-usuario/eliminar-usuario.component';

import { BuscarVehiculoComponent } from './vehiculos/buscar-vehiculo/buscar-vehiculo.component';
import { CrearVehiculoComponent } from './vehiculos/crear-vehiculo/crear-vehiculo.component';
import { EditarVehiculoComponent } from './vehiculos/editar-vehiculo/editar-vehiculo.component';
import { EliminarVehiculoComponent } from './vehiculos/eliminar-vehiculo/eliminar-vehiculo.component';

const routes: Routes = [
 
    {
      path: 'crear-usuario',
      component: CrearUsuarioComponent,
      canActivate: [ValidadorSesionGuard]
    },
    {
      path: 'editar-usuario/:id',
      component: EditarUsuarioComponent,
      canActivate: [ValidadorSesionGuard]
    },
    {
      path:'buscar-usuario',
      component: BuscarUsuarioComponent,
      canActivate: [ValidadorSesionGuard]
    },
    {
      path:'eliminar-usuario/:id',
      component: EliminarUsuarioComponent,
      canActivate: [ValidadorSesionGuard]
    },
  {
    path: 'listar-vehiculos',
    component: BuscarVehiculoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-vehiculo',
    component: CrearVehiculoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-vehiculo/:id',
    component: EditarVehiculoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-vehiculo/:id',
    component: EliminarVehiculoComponent,
    canActivate: [ValidadorSesionGuard]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
