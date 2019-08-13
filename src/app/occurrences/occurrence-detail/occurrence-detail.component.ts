import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OccurrencesService } from 'src/app/shared/services/occurrences.service';
import { OccurrenceDetailModalComponent } from '../occurrence-detail-modal/occurrence-detail-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-occurrence-detail',
  templateUrl: './occurrence-detail.component.html',
  styleUrls: ['./occurrence-detail.component.scss']
})
export class OccurrenceDetailComponent implements OnInit {
  public occurrence: any;
  constructor(private activatedRoute: ActivatedRoute,
              private occurrencesService: OccurrencesService,
              public dialog: MatDialog) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
      this.occurrencesService.get(id)
        .subscribe(({ body }) => { this.occurrence = body })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OccurrenceDetailModalComponent, {
      width: '700px',
      data: this.occurrence
    });
  }


}
