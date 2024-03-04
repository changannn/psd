import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageUserComponent } from './homepage-user.component';

describe('HomepageUserComponent', () => {
  let component: HomepageUserComponent;
  let fixture: ComponentFixture<HomepageUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageUserComponent]
    });
    fixture = TestBed.createComponent(HomepageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
