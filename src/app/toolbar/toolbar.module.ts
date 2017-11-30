import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './../app-material/app-material.module';
import { ToolbarComponent} from './toolbar/toolbar.component';
import { ToolbarRoutingModule} from './toolbar-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    ToolbarRoutingModule
  ],
  providers: [],
  declarations: [ ToolbarComponent],
  bootstrap: [ToolbarComponent ],
  exports: [ToolbarComponent]
})
export class ToolbarModule {}