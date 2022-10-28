import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Solicitud, Administrador, Asesor} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {AdministradorRepository} from './administrador.repository';
import {AsesorRepository} from './asesor.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof Vehiculo.prototype.id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Vehiculo.prototype.id>;

  public readonly vehiculoAdmin: BelongsToAccessor<Administrador, typeof Vehiculo.prototype.id>;

  public readonly vehiculoAsesor: BelongsToAccessor<Asesor, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.vehiculoAsesor = this.createBelongsToAccessorFor('vehiculoAsesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('vehiculoAsesor', this.vehiculoAsesor.inclusionResolver);
    this.vehiculoAdmin = this.createBelongsToAccessorFor('vehiculoAdmin', administradorRepositoryGetter,);
    this.registerInclusionResolver('vehiculoAdmin', this.vehiculoAdmin.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
  }
}
