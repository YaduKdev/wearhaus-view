import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductSliderComponent } from './home-product-slider.component';

describe('HomeProductSliderComponent', () => {
  let component: HomeProductSliderComponent;
  let fixture: ComponentFixture<HomeProductSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProductSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProductSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
