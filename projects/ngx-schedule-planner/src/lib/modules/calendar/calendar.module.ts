import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderGridComponent } from './header-grid/header-grid.component';
import { InputModule } from '../inputs/input.module';
import { ActionPanelComponent } from './action-panel/action-panel.component';

@NgModule({
  imports: [CommonModule, InputModule],
  declarations: [
    HeaderComponent,
    NavigationComponent,
    HeaderGridComponent,
    ActionPanelComponent,
  ],
  exports: [HeaderComponent],
})
export class CalendarModule {}
