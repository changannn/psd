import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarSelectComponent } from './solar-select.component';

describe('SolarSelectComponent', () => {
  let component: SolarSelectComponent;
  let fixture: ComponentFixture<SolarSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolarSelectComponent]
    });
    fixture = TestBed.createComponent(SolarSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
