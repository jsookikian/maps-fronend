import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './../app-material/app-material.module';
import { LoginDialogComponent } from './login-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
  ],
  providers: [],
  entryComponents: [ LoginDialogComponent],
  declarations: [ LoginDialogComponent],
  bootstrap: [ LoginDialogComponent ],
})
export class LoginDialogModule {}