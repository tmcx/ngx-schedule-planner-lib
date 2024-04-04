import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/main/header.component';
import { HeaderGridComponent } from './components/header-grid/header-grid.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ActionPanelComponent } from './components/action-panel/action-panel.component';
import { InputModule } from '../../inputs/input.module';

@NgModule({
  imports: [CommonModule, InputModule],
  declarations: [
    HeaderComponent,
    HeaderGridComponent,
    NavigationComponent,
    ActionPanelComponent,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
