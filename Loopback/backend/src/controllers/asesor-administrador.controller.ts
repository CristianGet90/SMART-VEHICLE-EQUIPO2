import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Asesor,
  Administrador,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorAdministradorController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Asesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Asesor.prototype.id,
  ): Promise<Administrador> {
    return this.asesorRepository.administrador(id);
  }
}
