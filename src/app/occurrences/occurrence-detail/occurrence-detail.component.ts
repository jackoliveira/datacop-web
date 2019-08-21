import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { OccurrencesService } from 'src/app/shared/services/occurrences.service';
import { OccurrenceDetailModalComponent } from '../occurrence-detail-modal/occurrence-detail-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AnswersService } from 'src/app/shared/services/answers.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-occurrence-detail',
  templateUrl: './occurrence-detail.component.html',
  styleUrls: ['./occurrence-detail.component.scss']
})
export class OccurrenceDetailComponent implements OnInit {
  public occurrence: any;
  public answers: any;
  public errors: string;
  public loading: boolean = false;
  public loadingAnswers: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private answersService: AnswersService,
              private occurrencesService: OccurrencesService,
              private notificationService: NotificationService,
              public dialog: MatDialog) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
      this.occurrencesService.get(id)
        .subscribe(({ body }) => {
          // Get Occurrence
          this.occurrence = body;

          // Get Answers of that occurrence
          this.populateAnswers();
        },
          ({ status, statusText, error }) => {
            this.loading = false;
            this.notificationService.notify(`${statusText}`)
            this.router.navigate(['/'])
          }
        )
  }

  public populateAnswers() {
    this.loadingAnswers = true;
    this.answersService.get(this.occurrence.id)
      .subscribe(({ body }) => {
        this.loadingAnswers = false;
        this.answers = body;
    }, ({ status, statusText, error }) => {
      this.loadingAnswers = false;
      // this.notificationService.notify('Nenhuma resposta encontrada.')
    }
    )
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(OccurrenceDetailModalComponent, {
      width: '700px',
      data: this.occurrence
    });

    dialogRef.afterClosed().subscribe(result => {
      this.populateAnswers();
    });
  }


}
