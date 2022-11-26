import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAsesorComponent } from './buscar-asesor.component';

describe('BuscarAsesorComponent', () => {
  let component: BuscarAsesorComponent;
  let fixture: ComponentFixture<BuscarAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarAsesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
