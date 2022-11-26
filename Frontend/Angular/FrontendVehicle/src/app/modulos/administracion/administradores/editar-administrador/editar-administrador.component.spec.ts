import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAdministradorComponent } from './editar-administrador.component';

describe('EditarAdministradorComponent', () => {
  let component: EditarAdministradorComponent;
  let fixture: ComponentFixture<EditarAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
