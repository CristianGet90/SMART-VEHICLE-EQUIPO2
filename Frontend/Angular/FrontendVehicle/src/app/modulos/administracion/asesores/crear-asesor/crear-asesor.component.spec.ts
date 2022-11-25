import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAsesorComponent } from './crear-asesor.component';

describe('CrearAsesorComponent', () => {
  let component: CrearAsesorComponent;
  let fixture: ComponentFixture<CrearAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAsesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
