import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OccurrencesService } from 'src/app/shared/services/occurrences.service';
import { switchMap, map, tap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-occurrence-list',
  templateUrl: './occurrence-list.component.html',
  styleUrls: ['./occurrence-list.component.scss']
})
export class OccurrenceListComponent implements OnInit {
  @Output() occurrence: any
  public occurrences$: Observable<any[]>;
  public search = new FormControl();
  public searchTerms = new Subject<string>();
  constructor(private occurrencesService: OccurrencesService) { }
  
  options: string[] = ['One', 'Two', 'Three'];
  handleSearch(params: string) {
    this.searchTerms.next(params);
  }

  complexSearch(params: string) {
    const search = `?query[id_eq]=${params}`
    this.searchTerms.next(search)
  }

  ngOnInit() {
    
    this.occurrences$ = this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((search: string) => this.occurrencesService.get(`?query[department_name_cont]=${search}`)),
      tap((data) => { console.log(data) }),
      map(({ body }) => { return body }),
    )
  }

  ngAfterViewInit(): void {
    this.searchTerms.next();
  }

}
