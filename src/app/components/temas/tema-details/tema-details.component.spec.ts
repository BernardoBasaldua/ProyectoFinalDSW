import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemaDetailsComponent } from './tema-details.component';

describe('TemaDetailsComponent', () => {
  let component: TemaDetailsComponent;
  let fixture: ComponentFixture<TemaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemaDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
