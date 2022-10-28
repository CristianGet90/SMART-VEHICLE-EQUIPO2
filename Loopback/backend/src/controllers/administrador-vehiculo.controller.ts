import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Administrador,
  Vehiculo,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorVehiculoController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Administrador has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.administradorRepository.adminVehicolos(id).find(filter);
  }

  @post('/administradors/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'id'>,
  ): Promise<Vehiculo> {
    return this.administradorRepository.adminVehicolos(id).create(vehiculo);
  }

  @patch('/administradors/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Administrador.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.administradorRepository.adminVehicolos(id).patch(vehiculo, where);
  }

  @del('/administradors/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Administrador.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.administradorRepository.adminVehicolos(id).delete(where);
  }
}
