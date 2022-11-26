import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAdministradorComponent } from './eliminar-administrador.component';

describe('EliminarAdministradorComponent', () => {
  let component: EliminarAdministradorComponent;
  let fixture: ComponentFixture<EliminarAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
