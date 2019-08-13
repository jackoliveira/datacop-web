import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OccurrencesService } from 'src/app/shared/services/occurrences.service';
import { FormBuilder, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-occurrence-detail-modal',
  templateUrl: './occurrence-detail-modal.component.html',
  styleUrls: ['./occurrence-detail-modal.component.scss']
})
export class OccurrenceDetailModalComponent implements OnInit {
  public form: any;
  public loading: boolean = false;
  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private occurrencesService: OccurrencesService,
    public dialogRef: MatDialogRef<OccurrenceDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      occurrence: [this.data.id, [ Validators.required, Validators.maxLength(1000) ]],
      content: ['', [ Validators.required ]],
      status: ['', [ Validators.required ]]
    })
  }

  onSubmit() {
    this.loading = true;
    console.log(this.form.value)
    const delay_observable = of('').pipe(delay(5000));
    delay_observable.subscribe((s) => { 
      this.loading = false;
      this.notificationService.notify('Enviado com sucesso')
      this.dialogRef.close();
   });

    //this.occurrencesService.post('', this.form.value)
  }

}
