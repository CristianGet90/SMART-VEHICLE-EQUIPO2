import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloUsuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:3000';

  constructor(private http : HttpClient) { }

  ObtenerRegistros() : Observable<ModeloUsuario[]>{
    return this.http.get<ModeloUsuario[]>(`${this.url}/usuarios`);
  }

  CrearUsuario(usuario: ModeloUsuario): Observable<ModeloUsuario>{
    return this.http.post<ModeloUsuario>(`${this.url}/usuarios`,usuario);
  }

  ActualizarUsuarioPorId(id:string,usuario:ModeloUsuario): Observable<ModeloUsuario>{
    return this.http.put<ModeloUsuario>(`${this.url}/usuarios/${id}`,usuario);
  }

  EliminarUsuario(id:string):Observable<any>{
    return this.http.delete(`${this.url}/usuarios/${id}`);
  }

  ObtenerRegistroPorId(id:string):Observable<ModeloUsuario>{
    return this.http.get<ModeloUsuario>(`${this.url}/usuarios/${id}`);
  }
}
