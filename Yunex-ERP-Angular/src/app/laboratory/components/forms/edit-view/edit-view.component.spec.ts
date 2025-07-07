import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditViewComponent } from './edit-view.component';

describe('DetailViewComponent', () => {
  let component: EditViewComponent;
  let fixture: ComponentFixture<EditViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditViewComponent]
    });
    fixture = TestBed.createComponent(EditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
