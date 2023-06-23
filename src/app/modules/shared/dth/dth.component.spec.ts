import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DTHComponent } from './dth.component';

describe('DTHComponent', () => {
  let component: DTHComponent;
  let fixture: ComponentFixture<DTHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DTHComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DTHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
