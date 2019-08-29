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
  public loading: boolean = true;
  public noContent: boolean = false;
  public contentLength: number;
  @Output() occurrence: any;
  public occurrences$: Observable<any[]>;
  constructor(private occurrencesService: OccurrencesService,
              private notificationService: NotificationService) { }
  
  statuses = Object.keys({ cancelado: 0, aberto: 1, fechado: 2 })
  departments = ['Department Default', 'GED', 'MKT', 'CTE'];
  searchField = new FormControl('');
  statusesField = new FormControl('');
  departmentsField = new FormControl('');

  resetSearch() {
    this.searchField.setValue('')
    this.statusesField.setValue('')
    this.departmentsField.setValue('')
  }
  get statusesFieldGetter() { return this.statusesField.value }
  get textFieldGetter() { return this.searchField.value }
  get departmentsFieldGetter() { return this.departmentsField.value }
  
  ngOnInit() {
    this.occurrences$ = merge(
      this.statusesField.valueChanges,
      this.searchField.valueChanges,
      this.departmentsField.valueChanges)
        .pipe(
          startWith(''),
          debounceTime(500),
          distinctUntilChanged(),
          tap(() => { this.noContent = false; this.loading = true; }),
          switchMap(_search => this.occurrencesService.get(`?query[content_cont]=${this.textFieldGetter}&query[status_eq]=${this.statusesFieldGetter}&query[department_name_eq]=${this.departmentsFieldGetter}`)
            .pipe(
              map(({ body: { data } }) => {
                console.log(data)
                this.loading = false;
                this.contentLength = data.length
                if (this.contentLength == 0) {
                  this.noContent = true;
                }
                return data;
              }),
              catchError(_ => of(['error']),
              )
            )
          ),
        )
  }

  ngAfterContentInit(): void {
  }
}