import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyCrudComponent } from './assembly-crud.component';

describe('AssemblyCrudComponent', () => {
  let component: AssemblyCrudComponent;
  let fixture: ComponentFixture<AssemblyCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssemblyCrudComponent]
    });
    fixture = TestBed.createComponent(AssemblyCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
