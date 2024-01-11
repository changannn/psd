import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageAdminComponent } from './homepage-admin.component';

describe('HomepageAdminComponent', () => {
  let component: HomepageAdminComponent;
  let fixture: ComponentFixture<HomepageAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageAdminComponent]
    });
    fixture = TestBed.createComponent(HomepageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
