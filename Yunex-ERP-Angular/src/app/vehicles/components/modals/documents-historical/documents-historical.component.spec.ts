import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsHistoricalComponent } from './documents-historical.component';

describe('DocumentsHistoricalComponent', () => {
  let component: DocumentsHistoricalComponent;
  let fixture: ComponentFixture<DocumentsHistoricalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsHistoricalComponent]
    });
    fixture = TestBed.createComponent(DocumentsHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
