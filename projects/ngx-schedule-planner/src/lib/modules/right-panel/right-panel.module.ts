import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightPanelComponent } from './main/right-panel.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { InputModule } from '../inputs/input.module';

@NgModule({
  imports: [CommonModule, InputModule],
  declarations: [RightPanelComponent, HeaderComponent, BodyComponent],
  exports: [RightPanelComponent],
})
export class RightPanelModule {}
