import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDrawerComponent } from './product-drawer.component';

describe('ProductDrawerComponent', () => {
  let component: ProductDrawerComponent;
  let fixture: ComponentFixture<ProductDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
