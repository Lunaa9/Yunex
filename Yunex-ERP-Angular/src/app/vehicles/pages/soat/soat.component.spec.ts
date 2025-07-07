import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoatComponent } from './soat.component';

describe('SoatComponent', () => {
  let component: SoatComponent;
  let fixture: ComponentFixture<SoatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoatComponent]
    });
    fixture = TestBed.createComponent(SoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
