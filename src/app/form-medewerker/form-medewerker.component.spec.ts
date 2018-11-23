import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMedewerkerComponent } from './form-medewerker.component';

describe('FormMedewerkerComponent', () => {
  let component: FormMedewerkerComponent;
  let fixture: ComponentFixture<FormMedewerkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMedewerkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMedewerkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
