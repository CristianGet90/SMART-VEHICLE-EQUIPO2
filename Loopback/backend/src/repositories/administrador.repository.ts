import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Asesor, Vehiculo} from '../models';
import {AsesorRepository} from './asesor.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly adminAsesores: HasManyRepositoryFactory<Asesor, typeof Administrador.prototype.id>;

  public readonly adminVehicolos: HasManyRepositoryFactory<Vehiculo, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Administrador, dataSource);
    this.adminVehicolos = this.createHasManyRepositoryFactoryFor('adminVehicolos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('adminVehicolos', this.adminVehicolos.inclusionResolver);
    this.adminAsesores = this.createHasManyRepositoryFactoryFor('adminAsesores', asesorRepositoryGetter,);
    this.registerInclusionResolver('adminAsesores', this.adminAsesores.inclusionResolver);
  }
}
