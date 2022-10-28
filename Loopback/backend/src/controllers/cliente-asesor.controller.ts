import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Asesor,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteAsesorController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<Asesor> {
    return this.clienteRepository.clienteAsesor(id);
  }
}
