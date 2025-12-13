import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsForm } from './leads-form';

describe('LeadsForm', () => {
  let component: LeadsForm;
  let fixture: ComponentFixture<LeadsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
