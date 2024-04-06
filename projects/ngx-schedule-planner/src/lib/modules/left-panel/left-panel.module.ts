import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftPanelComponent } from './main/left-panel.component';
import { HeaderComponent } from './components/header/header.component';
import { InputModule } from '../inputs/input.module';
import { BodyComponent } from './components/body/body.component';

@NgModule({
  imports: [CommonModule, InputModule],
  declarations: [LeftPanelComponent, HeaderComponent, BodyComponent],
  exports: [LeftPanelComponent],
})
export class LeftPanelModule {}
