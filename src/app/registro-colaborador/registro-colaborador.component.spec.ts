import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroColaboradorComponent } from './registro-colaborador.component';

describe('RegistroColaboradorComponent', () => {
  let component: RegistroColaboradorComponent;
  let fixture: ComponentFixture<RegistroColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroColaboradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
