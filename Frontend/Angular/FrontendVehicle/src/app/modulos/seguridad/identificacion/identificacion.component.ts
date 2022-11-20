
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
//import * as cryptoJS from "crypto-js";
const cryptoJS = require("cryptojs");

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'usuario': ['', [Validators.required, Validators.email]],
    'clave': ['', [Validators.required]],
    'rol':['',[Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router) { }
  

  ngOnInit(): void {
  }

  IdentificarUsuario(){
    let usuario = this.fgValidador.controls["usuario"].value;
    let clave = this.fgValidador.controls["clave"].value;
    let rol= this.fgValidador.controls["rol"].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();
    

    this.servicioSeguridad.Identificar(usuario,claveCifrada,rol).subscribe((datos:any)=> {
      this.servicioSeguridad.AlmacenarSesion(datos);
      alert("Datos ingresados correctamente");
      this.router.navigate(["/inicio"]);

    },(error:any)=>{
      alert("Error");
    })
    

    //alert(usuario + ":" + clave);
  }

}