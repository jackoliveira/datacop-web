import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccurrenceDetailModalComponent } from './occurrence-detail-modal.component';

describe('OccurrenceDetailModalComponent', () => {
  let component: OccurrenceDetailModalComponent;
  let fixture: ComponentFixture<OccurrenceDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccurrenceDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccurrenceDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
