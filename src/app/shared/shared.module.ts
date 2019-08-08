import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    CommonModule
  ]
})
export class SharedModule { }
