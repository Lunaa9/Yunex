import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketHistoricalComponent } from './ticket-historical.component';

describe('TicketHistoricalComponent', () => {
  let component: TicketHistoricalComponent;
  let fixture: ComponentFixture<TicketHistoricalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketHistoricalComponent]
    });
    fixture = TestBed.createComponent(TicketHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
