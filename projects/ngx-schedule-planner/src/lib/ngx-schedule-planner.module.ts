import { NgModule } from '@angular/core';
import { NgxSchedulePlannerComponent } from './main/ngx-schedule-planner.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { InputModule } from './modules/inputs/input.module';
import { CalendarModule } from './modules/calendar/calendar.module';

@NgModule({
  declarations: [NgxSchedulePlannerComponent],
  imports: [BrowserModule, FormsModule, CalendarModule, InputModule],
  exports: [NgxSchedulePlannerComponent],
})
export class NgxSchedulePlannerModule {}
