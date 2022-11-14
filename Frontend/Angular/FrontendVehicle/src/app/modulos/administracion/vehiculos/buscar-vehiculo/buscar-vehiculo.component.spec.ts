import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarVehiculoComponent } from './buscar-vehiculo.component';

describe('BuscarVehiculoComponent', () => {
  let component: BuscarVehiculoComponent;
  let fixture: ComponentFixture<BuscarVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarVehiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
