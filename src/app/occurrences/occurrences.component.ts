import { Component, OnInit, Output } from '@angular/core';
import { OccurrencesService } from '../shared/services/occurrences.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-occurrences',
  templateUrl: './occurrences.component.html',
  styleUrls: ['./occurrences.component.scss']
})
export class OccurrencesComponent implements OnInit {

  ngOnInit() {}

}
