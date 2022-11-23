import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { mode } from 'crypto-js';
import { ModeloDatos } from 'src/app/modelos/datos.modelo';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.css']
})
export class CrearVehiculoComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
    'imagen': ['',[Validators.required]],
    'tipo': ['',[Validators.required]],
    'marca': ['',[Validators.required]],
    'valor_alquiler': ['',[Validators.required]],
    'valor_compra': ['',[Validators.required]],
    'modelo': ['',[Validators.required]]
    
  });

  constructor(private fb: FormBuilder,
    private servicioVehiculo: VehiculoService,
    private router: Router) { }

  ngOnInit(): void {
  }
  GuardarVehiculo(){
    let imagen = this.fgValidador.controls["imagen"].value;
    let tipo = this.fgValidador.controls["tipo"].value;
    let marca = this.fgValidador.controls["marca"].value;
    let valor_alquiler = parseInt(this.fgValidador.controls["valor_alquiler"].value);
    let valor_compra = parseInt(this.fgValidador.controls["valor_compra"].value);
    let modelo = this.fgValidador.controls["modelo"].value;

    let p = new ModeloVehiculo();
    p.imagen = imagen;
    p.tipo = tipo;
    p.marca = marca;
    p.valor_alquiler = valor_alquiler;
    p.valor_compra = valor_compra;
    p.modelo = modelo;

    this.servicioVehiculo.CrearVehiculo(p).subscribe((datos: ModeloVehiculo)=>{
      alert("Vehiculo agregado correctamente");
      this.router.navigate(["/administracion/listar-vehiculos"]);
    }, (error: any)=> {
      alert("Error el vehiculo no se agregó");
    })

  }

}
