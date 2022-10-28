import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Cliente, Vehiculo, Asesor} from '../models';
import {ClienteRepository} from './cliente.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {AsesorRepository} from './asesor.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Solicitud.prototype.id>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Solicitud.prototype.id>;

  public readonly solicitudAsesor: BelongsToAccessor<Asesor, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Solicitud, dataSource);
    this.solicitudAsesor = this.createBelongsToAccessorFor('solicitudAsesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('solicitudAsesor', this.solicitudAsesor.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
