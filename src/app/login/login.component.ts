import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../shared/services/users.service';
import { AuthService } from '../shared/services/auth.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public errors: string;
  public loading: boolean = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private api: ApiService) { }

  public userForm = this.formBuilder.group({
    email: new FormControl('admin@example.com', [ Validators.required, Validators.email ]),
    password: new FormControl('password', [ Validators.required ]),
  })

  ngOnInit(): void { }
  onSubmit() {
    this.loading = true;
    this.authService.authUser(this.userForm.value).subscribe(
      (data) => {
        this.loading = false;
       },
      ({ status, statusText, error }) => {
        this.loading = false;
        this.errors = `${error.errors}`;
      }
    )
  }
}
