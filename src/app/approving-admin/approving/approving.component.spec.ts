import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovingComponent } from './approving.component';

describe('ApprovingComponent', () => {
  let component: ApprovingComponent;
  let fixture: ComponentFixture<ApprovingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
