import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { LLaves } from '../config/llaves';
import {Asesor, Credenciales} from '../models';
import {AsesorRepository} from '../repositories';
import { AutenticacionService } from '../services';

const fetch = require('node-fetch');

export class AsesorController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository : AsesorRepository,
    @service(AutenticacionService)
    public servicioAutenticacion :AutenticacionService
  ) {}
  @post("/identificarAsesor", {
    responses:{
      '200' : {
        description: "Identificación de usuarios"
      }

    }
  })

  async identificarPersona(
    @requestBody() credenciales : Credenciales
  ){
    let p = await this.servicioAutenticacion.IdentificarAsesor(credenciales.usuario, credenciales.clave, credenciales.rol);
    if (p){
      let token = this.servicioAutenticacion.GenerarTokenAsesor(p);
      return {
        datos:{
          nombre: p.nombres,
          correo: p.email,
          rol:    p.rol,
          id: p.id
        },
        tk: token
      }

    }else{
      throw new HttpErrors[401]("Datos invalidos");
    }

  }

  @post('/asesores')
  @response(200, {
    description: 'Asesor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesor',
            exclude: ['id'],
          }),
        },
      },
    })
    asesor: Omit<Asesor, 'id'>,
  ): Promise<Asesor> {
    //return this.asesorRepository.create(asesor);
    
     //Servicio local de generar y cifrar clave en servicios
     let clave = this.servicioAutenticacion.GenerarClave();
     let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
     asesor.clave = claveCifrada;
     //let a = await this.asesorRepository.create(asesor);
     let p = await this.asesorRepository.create(asesor);
 
     //Notificar al asesor
     let destino = asesor.email;
     let asunto = 'Asesor registrado en la plataforma Smart Vehicle.';
     let contenido =  `Hola ${asesor.nombres}, su nombre de usuario  es : ${asesor.email}, y su clave es : ${clave}`;
     fetch(`${LLaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
       .then((data: any)=> {
           console.log(data);
         })
     return p;
  }

  @get('/asesors/count')
  @response(200, {
    description: 'Asesor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.count(where);
  }

  @get('/asesores')
  @response(200, {
    description: 'Array of Asesor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asesor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Asesor) filter?: Filter<Asesor>,
  ): Promise<Asesor[]> {
    return this.asesorRepository.find(filter);
  }

  @patch('/asesores')
  @response(200, {
    description: 'Asesor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Asesor,
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.updateAll(asesor, where);
  }

  @get('/asesores/{id}')
  @response(200, {
    description: 'Asesor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asesor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asesor, {exclude: 'where'}) filter?: FilterExcludingWhere<Asesor>
  ): Promise<Asesor> {
    return this.asesorRepository.findById(id, filter);
  }

  @patch('/asesores/{id}')
  @response(204, {
    description: 'Asesor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.updateById(id, asesor);
  }

  @put('/asesores/{id}')
  @response(204, {
    description: 'Asesor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.replaceById(id, asesor);
  }

  @del('/asesores/{id}')
  @response(204, {
    description: 'Asesor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asesorRepository.deleteById(id);
  }
}
