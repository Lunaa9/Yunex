import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudModulesComponent } from './crud-modules.component';

describe('CrudModulesComponent', () => {
  let component: CrudModulesComponent;
  let fixture: ComponentFixture<CrudModulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudModulesComponent]
    });
    fixture = TestBed.createComponent(CrudModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
