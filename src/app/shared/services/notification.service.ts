import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  private openSnackBar(message: string, action: string = 'Fechar') {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 3000,
    });
  }

  notify(message) {
    this.openSnackBar(message)
  }
}
