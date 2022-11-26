import { Component, OnInit } from '@angular/core';
import { ModeloUsuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent implements OnInit {
  listadoUsuarios: ModeloUsuario[] = [];

  constructor(private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.LlenarListadoUsuarios();
  }
  LlenarListadoUsuarios(){
    this.usuarioService.ObtenerRegistros().subscribe(
      (datos: ModeloUsuario[]) => {
        this.listadoUsuarios = datos;
      },
      (error: any) => {
        console.log(error);
        alert("error al listar")
      }
    );
  }

}
