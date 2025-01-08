import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandindPageComponent } from './landind-page.component';

describe('LandindPageComponent', () => {
  let component: LandindPageComponent;
  let fixture: ComponentFixture<LandindPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandindPageComponent]
    });
    fixture = TestBed.createComponent(LandindPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
