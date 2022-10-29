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
  Asesor,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoAsesorController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<Asesor> {
    return this.vehiculoRepository.asesor(id);
  }
}
