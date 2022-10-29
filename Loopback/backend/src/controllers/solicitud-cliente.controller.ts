import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitud,
  Cliente,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudClienteController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<Cliente> {
    return this.solicitudRepository.cliente(id);
  }
}
