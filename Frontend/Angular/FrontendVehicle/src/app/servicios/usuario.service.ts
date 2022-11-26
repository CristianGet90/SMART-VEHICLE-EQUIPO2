import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloUsuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:3000';
  token: String = '';

  constructor(private http : HttpClient) { }

  ObtenerRegistros() : Observable<ModeloUsuario[]>{
    return this.http.get<ModeloUsuario[]>(`${this.url}/asesores`);
    
  }
  ObtenerRegistroPorId(id:string):Observable<ModeloUsuario>{
    return this.http.get<ModeloUsuario>(`${this.url}/asesores/${id}`);
  }

  CrearUsuario(usuario: ModeloUsuario): Observable<ModeloUsuario>{
    return this.http.post<ModeloUsuario>(`${this.url}/asesores`,usuario,{
      headers: new HttpHeaders ({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  ActualizarUsuario(usuario: ModeloUsuario): Observable <ModeloUsuario> {
    return this.http.put<ModeloUsuario>(`${this.url}/asesores/${usuario.id}`, usuario,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })

  }

  EliminarUsuario(id:string):Observable<any>{
    return this.http.delete(`${this.url}/asesores/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  
}
