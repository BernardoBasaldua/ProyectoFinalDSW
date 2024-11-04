import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteDetailsComponent } from './docente-details.component';

describe('DocenteDetailsComponent', () => {
  let component: DocenteDetailsComponent;
  let fixture: ComponentFixture<DocenteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocenteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
