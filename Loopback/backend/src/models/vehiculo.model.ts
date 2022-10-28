import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Administrador} from './administrador.model';
import {Asesor} from './asesor.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  caracteristicas: string;

  @property({
    type: 'string',
    required: true,
  })
  estado_vehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  valor_alquiler: string;

  @property({
    type: 'string',
    required: true,
  })
  valor_compra: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_oferta: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
  })
  video?: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @belongsTo(() => Solicitud)
  solicitudId: string;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  @belongsTo(() => Administrador, {name: 'vehiculoAdmin'})
  administradorId: string;

  @belongsTo(() => Asesor, {name: 'vehiculoAsesor'})
  asesorId: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
