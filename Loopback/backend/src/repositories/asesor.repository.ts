import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Asesor, AsesorRelations, Solicitud, Cliente, Administrador, Vehiculo} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {ClienteRepository} from './cliente.repository';
import {AdministradorRepository} from './administrador.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly asesorSolicitud: HasManyRepositoryFactory<Solicitud, typeof Asesor.prototype.id>;

  public readonly asesorClientes: HasManyRepositoryFactory<Cliente, typeof Asesor.prototype.id>;

  public readonly asesorAdmin: BelongsToAccessor<Administrador, typeof Asesor.prototype.id>;

  public readonly asesorVehiculos: HasManyRepositoryFactory<Vehiculo, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Asesor, dataSource);
    this.asesorVehiculos = this.createHasManyRepositoryFactoryFor('asesorVehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('asesorVehiculos', this.asesorVehiculos.inclusionResolver);
    this.asesorAdmin = this.createBelongsToAccessorFor('asesorAdmin', administradorRepositoryGetter,);
    this.registerInclusionResolver('asesorAdmin', this.asesorAdmin.inclusionResolver);
    this.asesorClientes = this.createHasManyRepositoryFactoryFor('asesorClientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('asesorClientes', this.asesorClientes.inclusionResolver);
    this.asesorSolicitud = this.createHasManyRepositoryFactoryFor('asesorSolicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('asesorSolicitud', this.asesorSolicitud.inclusionResolver);
  }
}
