import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarSolicitudComponent } from './registar-solicitud.component';

describe('RegistarSolicitudComponent', () => {
  let component: RegistarSolicitudComponent;
  let fixture: ComponentFixture<RegistarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistarSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
