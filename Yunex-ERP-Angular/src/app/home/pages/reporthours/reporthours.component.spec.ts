import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporthoursComponent } from './reporthours.component';

describe('DashboardComponent', () => {
  let component: ReporthoursComponent;
  let fixture: ComponentFixture<ReporthoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporthoursComponent]
    });
    fixture = TestBed.createComponent(ReporthoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
