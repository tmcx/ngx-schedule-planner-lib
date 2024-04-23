import { Component } from '@angular/core';
import { LeftPanelComponent } from '../components/left-panel/left-panel.component';
import { RightPanelComponent } from '../components/right-panel/right-panel.component';

@Component({
  standalone: true,
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss'],
  imports: [LeftPanelComponent, RightPanelComponent],
})
export class TopPanelComponent {}
