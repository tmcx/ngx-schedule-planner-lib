import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSearchComponent } from './input-search/input-search.component';
import { InputCalendarComponent } from './input-calendar/input-calendar.component';

const components = [InputSearchComponent, InputCalendarComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
})
export class InputModule {}
