import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  Administrador,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoAdministradorController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<Administrador> {
    return this.vehiculoRepository.vehiculoAdmin(id);
  }
}
