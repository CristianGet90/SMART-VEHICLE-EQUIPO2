import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
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
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  
  @property({
    type: 'string',
    required: true,
  })
  caracteristicas: string;

  @property({
    type: 'number',
    required: true,
  })
  estado_vehiculo: number;

  @property({
    type: 'number',
    required: true,
  })
  valor_alquiler: number;

  @property({
    type: 'number',
    required: true,
  })
  valor_compra: number;

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

  //este atributo no es mandatorio
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

  @hasOne(() => Solicitud)
  solicitud: Solicitud;

  @belongsTo(() => Asesor)
  asesorId: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
