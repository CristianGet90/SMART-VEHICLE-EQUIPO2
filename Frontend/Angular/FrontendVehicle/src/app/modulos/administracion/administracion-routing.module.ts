import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { BuscarPersonaComponent } from './personas/buscar-persona/buscar-persona.component';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import { EliminarPersonaComponent } from './personas/eliminar-persona/eliminar-persona.component';
import { BuscarVehiculoComponent } from './vehiculos/buscar-vehiculo/buscar-vehiculo.component';
import { CrearVehiculoComponent } from './vehiculos/crear-vehiculo/crear-vehiculo.component';
import { EditarVehiculoComponent } from './vehiculos/editar-vehiculo/editar-vehiculo.component';
import { EliminarVehiculoComponent } from './vehiculos/eliminar-vehiculo/eliminar-vehiculo.component';

const routes: Routes = [
  {
    path: 'crear-persona',
    component: CrearPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-persona',
    component: EditarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'buscar-persona',
    component: BuscarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-persona',
    component: EliminarPersonaComponent,
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
