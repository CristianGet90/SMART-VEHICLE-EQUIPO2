import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloVehiculo } from 'src/app/modelos/vehiculo.modelo';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';

@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.component.html',
  styleUrls: ['./editar-vehiculo.component.css']
})
export class EditarVehiculoComponent implements OnInit {
  id: string = '';

  fgValidador: FormGroup = this.fb.group({
    'id': ['',[Validators.required]],
    'imagen': ['',[Validators.required]],
    'tipo': ['',[Validators.required]],
    'marca': ['',[Validators.required]],
    'valor_alquiler': ['',[Validators.required]],
    'valor_compra': ['',[Validators.required]],
    'modelo': ['',[Validators.required]]
    
  });

  constructor(private fb: FormBuilder,
    private servicioVehiculo: VehiculoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarVehiculo();
  }
  BuscarVehiculo(){
    this.servicioVehiculo.ObtenerRegistroPorId(this.id).subscribe((datos) => {
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["imagen"].setValue(datos.imagen);
      this.fgValidador.controls["tipo"].setValue(datos.tipo);
      this.fgValidador.controls["marca"].setValue(datos.marca);
      this.fgValidador.controls["valor_alquiler"].setValue(datos.valor_alquiler);
      this.fgValidador.controls["valor_compra"].setValue(datos.valor_compra);
      this.fgValidador.controls["modelo"].setValue(datos.modelo);
    })
  }
  EditarVehiculo(){
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
    p.id = this.id;

    this.servicioVehiculo.ActualizarVehiculo(p).subscribe((datos: ModeloVehiculo)=>{
      alert("Vehiculo Actualizado");
      this.router.navigate(["/administracion/listar-vehiculos"]);
    }, (error: any)=> {
      alert("Error el vehiculo no se actualizó");
    })

  }

}
