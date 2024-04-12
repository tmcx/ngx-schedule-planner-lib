import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightPanelComponent } from './main/right-panel.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { InputModule } from '../inputs/input.module';
import { MarkerComponent } from './components/marker/marker.component';

@NgModule({
  imports: [CommonModule, InputModule],
  declarations: [
    RightPanelComponent,
    HeaderComponent,
    BodyComponent,
    MarkerComponent,
  ],
  exports: [RightPanelComponent],
})
export class RightPanelModule {}
