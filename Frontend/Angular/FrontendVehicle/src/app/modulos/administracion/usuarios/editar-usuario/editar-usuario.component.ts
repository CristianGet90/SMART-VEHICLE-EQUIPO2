import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mode } from 'crypto-js';
import { ModeloUsuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  id : string = "";
  fgValidador : FormGroup = this.fb.group({
    'id':['', [Validators.required]],
    'nombre':['', [Validators.required]],
    'apellido':['', [Validators.required]],
    'email':['', [Validators.required]],
    'celular':['', [Validators.required]],
    'direccion':['', [Validators.required]],
    'rol':['', [Validators.required]]
  });
  

  constructor(private usuarioService : UsuarioService,
    private fb : FormBuilder,
    private router : Router,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarUsuario();
  }
  BuscarUsuario(){
    this.usuarioService.ObtenerRegistroPorId(this.id).subscribe(
      (datos:ModeloUsuario) => {
        this.fgValidador.controls['id'].setValue(this.id);
        this.fgValidador.controls['nombres'].setValue(datos.nombres);
        this.fgValidador.controls['apellidos'].setValue(datos.apellidos);
        this.fgValidador.controls['tipo_documento'].setValue(datos.tipo_documento);
        this.fgValidador.controls['numero_documento'].setValue(datos.numero_documento);
        this.fgValidador.controls['email'].setValue(datos.email);
        this.fgValidador.controls['celular'].setValue(datos.celular);
        this.fgValidador.controls['direccion'].setValue(datos.direccion);
        this.fgValidador.controls['rol'].setValue(datos.rol);
      },
      (error) => {
        console.log("Error buscando el usuario");
      }
    )
  }
  ActualizarUsuario(){
    // Sacar la info del formulario
    let nombres = this.fgValidador.controls['nombres'].value;
    let apellidos = this.fgValidador.controls['apellido'].value;
    let tipo_documento = this.fgValidador.controls['tipo_documento'].value;
    let numero_documento = this.fgValidador.controls['numero_documento'].value;
    let email = this.fgValidador.controls['email'].value;
    let celular = this.fgValidador.controls['celular'].value;
    let direccion = this.fgValidador.controls['direccion'].value;
    let rol = this.fgValidador.controls['rol'].value;

    // Crear una instancia del modelo y llenarlo
    let modelo = new ModeloUsuario();
    modelo.nombres = nombres;
    modelo.apellidos = apellidos;
    modelo.tipo_documento = tipo_documento;
    modelo.numero_documento = numero_documento;
    modelo.email = email;
    modelo.celular = celular;
    modelo.direccion = direccion;
    modelo.rol = rol;
    modelo.id = this.id;

    // Llamar el servcio de actualización del usuario
    this.usuarioService.ActualizarUsuario(modelo).subscribe(
      (datos: ModeloUsuario) => {
        alert("Registro almacenado");
        this.router.navigate(["/administracion/buscar-usuario"]);
      },
      (error: any) => {
        alert("Error almacenado el registro");
      }
    )
  }


}
