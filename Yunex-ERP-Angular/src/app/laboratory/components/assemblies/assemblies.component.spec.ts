import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssembliesComponent } from './assemblies.component';

describe('AssembliesComponent', () => {
  let component: AssembliesComponent;
  let fixture: ComponentFixture<AssembliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssembliesComponent]
    });
    fixture = TestBed.createComponent(AssembliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
