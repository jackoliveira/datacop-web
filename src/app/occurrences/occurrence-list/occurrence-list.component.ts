import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Observable, Subject, timer, of, range } from 'rxjs';
import { OccurrencesService } from 'src/app/shared/services/occurrences.service';
import { switchMap, map, tap, distinctUntilChanged, debounceTime, catchError, shareReplay, retryWhen, delayWhen, startWith } from 'rxjs/operators';
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
  public searchTerms = new Subject<string>();
  constructor(private occurrencesService: OccurrencesService,
              private notificationService: NotificationService) { }
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'department', 'cop', 'status', 'created_at']; 
  options = ['opened', 'closed', 'canceled'];
  // Initialize data Source
  dataSource: any;
  public handleSearch(params: string) {
    this.searchTerms.next(params);
  }

  ngOnInit() {
    this.occurrences$ = this.searchTerms.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(_search => this.occurrencesService.get(`?query[status_cont]=${_search}`)
        .pipe(
          map(({ body }) => {
            console.log(body)
            return body;
          }),
          catchError(_ => of(['error']),
          )
        )
      ),
    )
  }

  ngAfterContentInit(): void {
    this.searchTerms.next('');
  }
}


    // this.occurrences$ = this.searchTerms.pipe(
    //   startWith(''),
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap(_search => this.occurrencesService.get(`?query[status_cont]=${_search}`)
    //     .pipe(
    //       map(({ body }) => {
    //         console.log(body)
    //         return body;
    //       }),
    //       catchError(_ => of(['error']),
    //       )
    //     )
    //   ),
    // )



//  merge(this.sort.sortChange, this.paginator.page)
//       .pipe(
//         startWith({}),
//         switchMap(() => {
//           this.isLoadingResults = true;
//           return this.exampleDatabase!.getRepoIssues(
//             this.sort.active, this.sort.direction, this.paginator.pageIndex);
//         }),
//         map(data => {
//           // Flip flag to show that loading has finished.
//           this.isLoadingResults = false;
//           this.isRateLimitReached = false;
//           this.resultsLength = data.total_count;

//           return data.items;
//         }),
//         catchError(() => {
//           this.isLoadingResults = false;
//           // Catch if the GitHub API has reached its rate limit. Return empty data.
//           this.isRateLimitReached = true;
//           return observableOf([]);
//         })
//       ).subscribe(data => this.data = data);
//   }
// }