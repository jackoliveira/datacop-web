import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Observable, Subject, timer, of, range, merge } from 'rxjs';
import { OccurrencesService } from 'src/app/shared/services/occurrences.service';
import { switchMap, map, tap, distinctUntilChanged, debounceTime, catchError, shareReplay, retryWhen, delayWhen, startWith, filter, concat } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  animateChild,
  // ...
} from '@angular/animations';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-occurrence-list',
  templateUrl: './occurrence-list.component.html',
  styleUrls: ['./occurrence-list.component.scss'],
  animations: [
    trigger('list', [
      transition(':enter', [
        animate('3s', style({ transition: '1s ease-in' }))
      ]),
    ]),
  ]
})
export class OccurrenceListComponent implements OnInit {
  public errors: any;
  public loading: boolean = false;
  @Output() occurrence: any
  public occurrences$: Observable<any[]>;
  constructor(private occurrencesService: OccurrencesService,
              private notificationService: NotificationService) { }
  
  search = { text: '', status: '' };
  statuses = Object.keys({ canceled: 0, opened: 1, closed: 2  })
  searchField = new FormControl();
  statusesField = new FormControl();

  get statusesFieldGetter() { return this.statusesField.value }
  get searchFieldGetter() { return this.searchField.value }
  ngOnInit() {
    this.occurrences$ = merge(this.statusesField.valueChanges, this.searchField.valueChanges)
        .pipe(
          startWith(''),
          debounceTime(300),
          distinctUntilChanged(),
          tap((_search) => console.log(_search)),
          switchMap(_search => this.occurrencesService.get(`?query[id_eq]=${this.searchFieldGetter}&query[status_eq]=${this.statusesFieldGetter}`)
            .pipe(
              tap((data) => console.log(data)),
              map(({ body }) => {
                return body;
              }),
              catchError(_ => of(['error']),
              )
            )
          ),
          tap((_search) => console.log(_search)),
          )
  }

  ngAfterContentInit(): void { }
}