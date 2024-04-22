import { NgModule } from '@angular/core';
import { NgxSchedulePlannerComponent } from './lib/main/ngx-schedule-planner.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [BrowserModule, NgxSchedulePlannerComponent],
  exports: [NgxSchedulePlannerComponent],
})
export class NgxSchedulePlannerModule {}
