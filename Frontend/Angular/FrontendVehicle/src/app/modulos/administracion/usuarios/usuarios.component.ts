import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloUsuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'nombres': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'numero_documento': ['', [Validators.required]],
    'tipo_documento': ['', [Validators.required]],
    'email:': ['', [Validators.required]],
    'celular': ['', [Validators.required]],
    'direccion': ['', [Validators.required]],
    'rol': ['', [Validators.required]]
  });

  constructor(private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  }

  GuardarUsuario() {
    // Sacar la info del formulario
    let nombres = this.fgValidador.controls['nombres'].value;
    let apellidos = this.fgValidador.controls['apellidos'].value;
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

    // Llamar el servcio de creación del usuario
    this.usuarioService.CrearUsuario(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado");
        this.router.navigate(["/administracion/buscar-usuario"]);
      },
      (error) => {
        alert("Error almacenado el registro");
      }
    )
  }
}
