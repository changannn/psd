import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IemsimComponent } from './iemsim.component';

describe('IemsimComponent', () => {
  let component: IemsimComponent;
  let fixture: ComponentFixture<IemsimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IemsimComponent]
    });
    fixture = TestBed.createComponent(IemsimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
