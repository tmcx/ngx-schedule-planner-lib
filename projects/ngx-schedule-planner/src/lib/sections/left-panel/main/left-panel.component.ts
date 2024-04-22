import { Component } from '@angular/core';
import { BodyComponent } from '../components/body/body.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  imports: [BodyComponent, HeaderComponent],
})
export class LeftPanelComponent {}
