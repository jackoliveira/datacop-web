import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from '../login/login.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { RouterModule } from '@angular/router';

const components = [ LoginComponent, NavbarComponent , FooterComponent ];
const modules = [ CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, MaterialModule ];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    RouterModule,
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ],
  providers: []
})
export class SharedModule { }
