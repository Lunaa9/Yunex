import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryModulesComponent } from './entry-modules.component';

describe('EntryModulesComponent', () => {
  let component: EntryModulesComponent;
  let fixture: ComponentFixture<EntryModulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntryModulesComponent]
    });
    fixture = TestBed.createComponent(EntryModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
