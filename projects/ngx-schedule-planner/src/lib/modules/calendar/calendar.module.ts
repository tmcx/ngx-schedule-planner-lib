import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyModule } from './body/body.module';
import { HeaderModule } from './header/header.module';
import { CalendarComponent } from './main/calendar.component';

@NgModule({
  imports: [CommonModule, BodyModule, HeaderModule],
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
})
export class CalendarModule {}
