import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './components/main/body.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { HeaderComponent } from './components/header/header.component';
import { UserScheduleComponent } from './components/user-schedule/user-schedule.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BodyComponent,
    HeaderComponent,
    ActivitiesComponent,
    UserScheduleComponent,
  ],
  exports: [BodyComponent],
})
export class BodyModule {}
