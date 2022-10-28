import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Solicitud, Asesor} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {AsesorRepository} from './asesor.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly clienteSolicitud: HasManyRepositoryFactory<Solicitud, typeof Cliente.prototype.id>;

  public readonly clienteAsesor: BelongsToAccessor<Asesor, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Cliente, dataSource);
    this.clienteAsesor = this.createBelongsToAccessorFor('clienteAsesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('clienteAsesor', this.clienteAsesor.inclusionResolver);
    this.clienteSolicitud = this.createHasManyRepositoryFactoryFor('clienteSolicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('clienteSolicitud', this.clienteSolicitud.inclusionResolver);
  }
}
