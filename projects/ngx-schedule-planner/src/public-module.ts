import { NgModule } from '@angular/core';
import { NgxSchedulePlannerComponent } from './lib/main/ngx-schedule-planner.component';
import { BrowserModule } from '@angular/platform-browser';
import { LeftPanelModule } from './lib/modules/left-panel/left-panel.module';
import { RightPanelModule } from './lib/modules/right-panel/right-panel.module';

@NgModule({
  declarations: [NgxSchedulePlannerComponent],
  imports: [BrowserModule, LeftPanelModule, RightPanelModule],
  exports: [NgxSchedulePlannerComponent],
})
export class NgxSchedulePlannerModule {}
