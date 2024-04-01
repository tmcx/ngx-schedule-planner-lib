import { NgModule } from '@angular/core';
import { NgxSchedulePlannerComponent } from './main/ngx-schedule-planner.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NgxSchedulePlannerComponent,
    NavigationComponent,
    CalendarComponent,
  ],
  imports: [BrowserModule, FormsModule],
  exports: [NgxSchedulePlannerComponent],
})
export class NgxSchedulePlannerModule {}
