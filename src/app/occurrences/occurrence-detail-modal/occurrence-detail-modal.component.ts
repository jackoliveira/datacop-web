import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OccurrencesService } from 'src/app/shared/services/occurrences.service';
import { FormBuilder, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { AnswersService } from 'src/app/shared/services/answers.service';

@Component({
  selector: 'app-occurrence-detail-modal',
  templateUrl: './occurrence-detail-modal.component.html',
  styleUrls: ['./occurrence-detail-modal.component.scss']
})
export class OccurrenceDetailModalComponent implements OnInit {
  public form: any;
  public errors: any;
  public loading: boolean = false;
  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private answersService: AnswersService,
    private occurrencesService: OccurrencesService,
    public dialogRef: MatDialogRef<OccurrenceDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      content: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(1000) ]],
      status: ['', [ Validators.required ]]
    })

  }

  // Getters do Form
  get content() { return this.form.get('content') }
  get status() { return this.form.get('status') }

  statuses = ['canceled', 'finished']

  onSubmit() {
    this.loading = true;
    this.answersService.save(this.data.id, this.form.value)
      .subscribe(
        (data) => {
        this.loading = false;
        this.notificationService.notify('Enviado com sucesso')
        this.dialogRef.close();
      }, 
      (error) => {
        console.log(error)
        this.loading = false;
        this.notificationService.notify(`${error.errors}`)
      }
    );

    //this.occurrencesService.post('', this.form.value)
  }

}
