import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseroverzichtComponent } from './useroverzicht.component';

describe('UseroverzichtComponent', () => {
  let component: UseroverzichtComponent;
  let fixture: ComponentFixture<UseroverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseroverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseroverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
