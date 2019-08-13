import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from '../login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
    FooterComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    CommonModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    CommonModule,
    FooterComponent,
    LoginComponent,
  ]
})
export class SharedModule { }
