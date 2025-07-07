import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrtChartsComponent } from './warrt-charts.component';

describe('WarrtChartsComponent', () => {
  let component: WarrtChartsComponent;
  let fixture: ComponentFixture<WarrtChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarrtChartsComponent]
    });
    fixture = TestBed.createComponent(WarrtChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
