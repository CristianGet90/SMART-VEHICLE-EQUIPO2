import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAdministradorComponent } from './buscar-administrador.component';

describe('BuscarAdministradorComponent', () => {
  let component: BuscarAdministradorComponent;
  let fixture: ComponentFixture<BuscarAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
