import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyComponent } from './assembly.component';

describe('AssemblyComponent', () => {
  let component: AssemblyComponent;
  let fixture: ComponentFixture<AssemblyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssemblyComponent]
    });
    fixture = TestBed.createComponent(AssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
