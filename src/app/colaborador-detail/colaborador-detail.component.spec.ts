import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratingDetailComponent } from './colaborador-detail.component';

describe('ColaboradorDetailComponent', () => {
  let component: CollaboratingDetailComponent;
  let fixture: ComponentFixture<CollaboratingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratingDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollaboratingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
