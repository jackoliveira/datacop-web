import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { OccurrenceListItemComponent } from './occurrence-list-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { By, BrowserModule } from '@angular/platform-browser';
import { OccurrenceRoutingModule } from '../occurrence-routing.module';
import { OccurrenceModule } from '../occurrence.module';
import { OccurrenceListComponent } from '../occurrence-list/occurrence-list.component';
import { OccurrenceDetailComponent } from '../occurrence-detail/occurrence-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OccurrenceListItemComponent', () => {
  let component: OccurrenceListItemComponent;
  let fixture: ComponentFixture<OccurrenceListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        OccurrenceListItemComponent,
        OccurrenceListComponent,
        OccurrenceDetailComponent
      ],
      providers: [],
      imports: [
        BrowserAnimationsModule,
        BrowserModule,
        SharedModule,
        OccurrenceRoutingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccurrenceListItemComponent);
    component = fixture.componentInstance;
    const element = fixture.debugElement.query(By.css('form'))
    const el = element.nativeElement;
    fixture.detectChanges();

  });

  afterEach(() => { window.localStorage.clear() })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});