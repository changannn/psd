import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootHeaderComponent } from './root-header.component';

describe('RootHeaderComponent', () => {
  let component: RootHeaderComponent;
  let fixture: ComponentFixture<RootHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RootHeaderComponent]
    });
    fixture = TestBed.createComponent(RootHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
