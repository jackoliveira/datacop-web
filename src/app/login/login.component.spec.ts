import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../shared/services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let testUser = { email: 'admin@example.com', password: 'password' };
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      providers: [ AuthService ],
      imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        SharedModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    const element = fixture.debugElement.query(By.css('form'))
    const el = element.nativeElement;
    fixture.detectChanges();

  });

  afterEach(() => { window.localStorage.clear() })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('user login should success', inject([AuthService, AuthGuard], (service: AuthService, authGuard: AuthGuard) => {
    const response = service.authUser({ email: 'admin@example.com', password: 'password' })
      .subscribe((data) => { return authGuard.canActivate(route, state) })

    expect(response).toBeTruthy();
  }));

  it('user login should fail', inject([AuthService, AuthGuard], (service: AuthService, authGuard: AuthGuard) => {
    service.authUser({ email: 'failed@example.com', password: 'password' })
    .subscribe(
      (data) => {},
      (error) => { return expect(authGuard.canActivate(route, state)).toBeFalsy(); }
    )
  }));

  it('should form to be invalid', async(() => {
    component.userForm.get('email').setValue('');
    component.userForm.get('password').setValue('');

    expect(component.userForm.valid).toBeFalsy();
  }));

  it('should form to be valid', async(() => {
    component.userForm.get('email').setValue('admin@example.com');
    component.userForm.get('password').setValue('password');

    expect(component.userForm.valid).toBeTruthy();
  }));


});
