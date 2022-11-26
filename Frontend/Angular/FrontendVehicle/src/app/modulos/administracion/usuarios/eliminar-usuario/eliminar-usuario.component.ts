import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {
  id: string = "";
    constructor(private usuarioService : UsuarioService,
    private router : Router,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
  }

  EliminarUsuario(){
    this.usuarioService.EliminarUsuario(this.id).subscribe(
      (datos)=>{
        alert("Registro eliminado correctamente");
        this.router.navigate(["/administracion/buscar-usuario"]);
      },
      (error) =>{
        alert("Error elmininando el registro");
      }
    )
  }

}
