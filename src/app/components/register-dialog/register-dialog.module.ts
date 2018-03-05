import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './../app-material/app-material.module';
import { RegisterDialogComponent} from './register-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
  ],
  providers: [],
  entryComponents: [RegisterDialogComponent],
  declarations: [ RegisterDialogComponent],
  bootstrap: [ RegisterDialogComponent ],
})
export class RegisterDialogModule {}