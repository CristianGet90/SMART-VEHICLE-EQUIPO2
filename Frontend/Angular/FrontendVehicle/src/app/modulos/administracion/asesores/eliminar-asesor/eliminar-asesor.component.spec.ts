import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAsesorComponent } from './eliminar-asesor.component';

describe('EliminarAsesorComponent', () => {
  let component: EliminarAsesorComponent;
  let fixture: ComponentFixture<EliminarAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarAsesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
