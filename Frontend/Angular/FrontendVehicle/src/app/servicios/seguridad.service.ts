import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  url =`http://localhost:3000`;
  datosUsuarioEnSesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());



  constructor(private http: HttpClient) {
    this.VerificarSesionActual();
  }
//Aqui realizamos  validaciones de roles 
  Identificar(usuario: string, clave: string, rol: string): Observable<ModeloIdentificar> {
    let consumo = "";
    if(rol=='asesor'){
      consumo = 'identificarAsesor';
    }else if(rol=='administrador'){
      consumo = 'identificarAdmin';
    }else if(rol=='cliente'){
      consumo = 'identificarCliente';
    }
     
    return this.http.post<ModeloIdentificar>(`${this.url}/${consumo}`, {
      usuario: usuario,
      clave: clave,
      rol: rol
    }, {
      headers: new HttpHeaders({
        //encabezados  Tokens
      })
    })
  }

  AlmacenarSesion(datos: ModeloIdentificar){
    datos.estaIdentificado = true;
    let stringDatos = JSON.stringify(datos);
    localStorage.setItem("datosSesion", stringDatos);
    this.RefrescarDatosSesion(datos);
  }

  ObtenerInformacionSesion(){
    let datosString = localStorage.getItem("datosSesion");
    if(datosString){
      let datos = JSON.parse(datosString);
      return datos;
    }else{
      return null;
    }
  }

  EliminarInformacionSesion(){
    localStorage.removeItem("datosSesion");
    this.RefrescarDatosSesion(new ModeloIdentificar());
  }

  SeHaIniciadoSesion(){
    let datosString = localStorage.getItem("datosSesion");
    return datosString;
  }

  VerificarSesionActual(){
    let datos = this.ObtenerInformacionSesion();
    if(datos){
      this.RefrescarDatosSesion(datos);
    }
  }

  RefrescarDatosSesion(datos: ModeloIdentificar){
    this.datosUsuarioEnSesion.next(datos);
  }

  ObtenerDatosUsuarioEnSesion(){
    return this.datosUsuarioEnSesion.asObservable();
  }

  ObtenerToken(){
    let datosString = localStorage.getItem("datosSesion");
    if(datosString){
      let datos = JSON.parse(datosString);
      return datos.tk
    }else{
      return '';
    }
  }




}
