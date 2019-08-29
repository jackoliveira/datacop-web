import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ApiService } from '../shared/services/api.service';
import { NotificationService } from '../shared/services/notification.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loading: boolean = false;
  public errors: any;
  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private authService: AuthService,
              private location: Router
              ) { }

  ngOnInit(): void {
  }

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
      (err) => {
        this.userForm.reset();
        this.errors = err.errors || err.statusText;
        this.loading = false;
      }
    )
  }
}