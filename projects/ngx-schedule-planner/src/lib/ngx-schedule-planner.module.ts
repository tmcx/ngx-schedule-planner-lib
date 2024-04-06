import { NgModule } from '@angular/core';
import { NgxSchedulePlannerComponent } from './main/ngx-schedule-planner.component';
import { BrowserModule } from '@angular/platform-browser';
import { LeftPanelModule } from './modules/left-panel/left-panel.module';
import { RightPanelModule } from './modules/right-panel/right-panel.module';

@NgModule({
  declarations: [NgxSchedulePlannerComponent],
  imports: [BrowserModule, LeftPanelModule, RightPanelModule],
  exports: [NgxSchedulePlannerComponent],
})
export class NgxSchedulePlannerModule {}
