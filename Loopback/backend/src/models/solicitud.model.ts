import {Entity, model, property} from '@loopback/repository';

@model()
export class Solicitud extends Entity {
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
  tipo_solicitud: string;

  @property({
    type: 'number',
    required: true,
  })
  numero_solicitud: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_solicitud: string;

  @property({
    type: 'date',
    required: true,
  })
  inicio_alquiler: string;

  @property({
    type: 'date',
    required: true,
  })
  fin_alquiler: string;

  @property({
    type: 'number',
    required: true,
  })
  estado_solicitud: number;

  @property({
    type: 'string',
    required: true,
  })
  comentario: string;


  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
