import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoiseSelectComponent } from './noise-select.component';

describe('NoiseSelectComponent', () => {
  let component: NoiseSelectComponent;
  let fixture: ComponentFixture<NoiseSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoiseSelectComponent]
    });
    fixture = TestBed.createComponent(NoiseSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
