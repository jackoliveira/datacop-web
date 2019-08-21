import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ApiService } from '../shared/services/api.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loading: boolean = false;
  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private authService: AuthService,
    private api: ApiService) { }

  public userForm = this.formBuilder.group({
    email: new FormControl('admin@example.com', [ Validators.required, Validators.email ]),
    password: new FormControl('password', [ Validators.required, Validators.minLength(8), Validators.maxLength(255) ]),
  })


  public logout(): void {
    this.authService.logout();
  }
  
  public onSubmit(): void {
    this.loading = true;
    this.authService.authUser(this.userForm.value).subscribe(
      (data) => {
        this.loading = false;
        this.notificationService.notify(`Logado com sucesso.`);
       },
      ({ status, statusText, error }) => {
        this.loading = false;
        this.notificationService.notify(`${error.errors}`);
      }
    )
  }
}
