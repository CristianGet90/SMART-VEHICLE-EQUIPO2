import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { LLaves } from '../config/llaves';
import { Administrador, Asesor, Cliente } from '../models';
import { AdministradorRepository, AsesorRepository, ClienteRepository } from '../repositories';

const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
    @repository(AdministradorRepository)
    public administradorRepository : AdministradorRepository
  ) {}

  /*
   * Add service methods here
   */

  GenerarClave(){
    let clave = generador(8, false);
    return clave;
  }
  
  CifrarClave(clave: string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }
  //Identificacion de cliente , Autenticacion
  IdentificarCliente(usuario:string, clave:string, rol:string){
    try {
      let p = this.clienteRepository.findOne({where : {email: usuario,clave: clave}});
      if(p){
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }
  IdentificarAsesor(usuario:string, clave:string, rol:string){
    try {
      let p = this.asesorRepository.findOne({where : {email: usuario,clave: clave}});
      if(p){
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }
  IdentificarAdmin(usuario:string, clave:string, rol:string){
    try {
      let p = this.administradorRepository.findOne({where : {email: usuario,clave: clave}});
      if(p){
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }
  //Token cliente
  GenerarTokenCliente(cliente : Cliente ) {

    let token = jwt.sign({
      data: {
        id: cliente.id,
        correo: cliente.email,
        nombre: cliente.nombres + " " + cliente.apellidos,
        rol: cliente.rol
      }
    }, LLaves.claveJWT);
  return token;
  }

  //Token Asesor
  GenerarTokenAsesor(asesor : Asesor ) {

    let token = jwt.sign({
      data: {
        id: asesor.id,
        correo: asesor.email,
        nombre: asesor.nombres + " " + asesor.apellidos,
        rol: asesor.rol
      }
    }, LLaves.claveJWT);
  return token;
  }

  //Token Administrador
  GenerarTokenAdmin(admin : Administrador ) {

    let token = jwt.sign({
      data: {
        id: admin .id,
        correo: admin .email,
        nombre: admin .nombres + " " + admin .apellidos,
        rol: admin .rol
      }
    }, LLaves.claveJWT);
  return token;
  }

  //Válida para todos
  ValidarTokenJWT(token: string){
    try{
      let datos = jwt.verify(token, LLaves.claveJWT);
      return datos;

    }catch{
      return false;

    }

  }

}
