import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocEhsComponent } from './doc-ehs.component';

describe('DocEhsComponent', () => {
  let component: DocEhsComponent;
  let fixture: ComponentFixture<DocEhsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocEhsComponent]
    });
    fixture = TestBed.createComponent(DocEhsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
