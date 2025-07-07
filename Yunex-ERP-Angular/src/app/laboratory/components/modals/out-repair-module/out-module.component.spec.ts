import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutModuleComponent } from './out-module.component';

describe('OutModuleComponent', () => {
  let component: OutModuleComponent;
  let fixture: ComponentFixture<OutModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutModuleComponent]
    });
    fixture = TestBed.createComponent(OutModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
