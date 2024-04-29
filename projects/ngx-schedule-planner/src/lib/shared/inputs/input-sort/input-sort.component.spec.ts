/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputSortComponent } from './input-sort.component';

describe('InputSortComponent', () => {
  let component: InputSortComponent;
  let fixture: ComponentFixture<InputSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
