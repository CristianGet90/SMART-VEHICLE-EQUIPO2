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
import {Cliente, Credenciales} from '../models';
import {ClienteRepository} from '../repositories';
import { AutenticacionService } from '../services';


const fetch = require('node-fetch');

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @service(AutenticacionService)
    public servicioAutenticacion : AutenticacionService
  ) {}

  @post("/identificarCliente", {
    responses:{
      '200' : {
        description: "Identificacion de clientes"
      }
    }
  })
  async identificarPersona(
    @requestBody() credenciales: Credenciales
  ) {
    let p = await this.servicioAutenticacion.IdentificarCliente(credenciales.usuario, credenciales.clave, credenciales.rol);
    if (p){
      let token = this.servicioAutenticacion.GenerarTokenCliente(p);
      return {
        datos:{
          nombre: p.nombres,
          correo: p.email,
          id: p.id,
          rol: p.rol
          
        },
        tk: token
      }
      
    }else{
      throw new HttpErrors[401]("Datos invalidos");
    }


  }

  @post('/clientes')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {

    //Servicio local de generar y cifrar clave en servicios
    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    cliente.clave = claveCifrada;
    let p = await this.clienteRepository.create(cliente);

    //Notificar al Cliente
    let destino = cliente.email;
    let asunto = 'Registrado en la plataforma Smart Vehicle.';
    let contenido =  `Hola ${cliente.nombres}, su nombre de usuario  es : ${cliente.email}, y su clave es : ${clave}`;
    fetch(`${LLaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any)=> {
          console.log(data);
        })
    return p;
    
  }

  @get('/clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
