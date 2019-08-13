import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccurrenceListItemComponent } from './occurrence-list-item.component';

describe('OccurrenceListItemComponent', () => {
  let component: OccurrenceListItemComponent;
  let fixture: ComponentFixture<OccurrenceListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccurrenceListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccurrenceListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
