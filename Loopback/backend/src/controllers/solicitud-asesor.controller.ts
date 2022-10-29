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
  Asesor,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudAsesorController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<Asesor> {
    return this.solicitudRepository.asesor(id);
  }
}
