import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewModuleComponent } from './new-module.component';

describe('NewModuleComponent', () => {
  let component: NewModuleComponent;
  let fixture: ComponentFixture<NewModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewModuleComponent]
    });
    fixture = TestBed.createComponent(NewModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
