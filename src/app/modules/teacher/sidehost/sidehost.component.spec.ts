import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidehostComponent } from './sidehost.component';

describe('SidehostComponent', () => {
  let component: SidehostComponent;
  let fixture: ComponentFixture<SidehostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidehostComponent]
    });
    fixture = TestBed.createComponent(SidehostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
