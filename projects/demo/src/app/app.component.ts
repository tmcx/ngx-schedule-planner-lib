import { Component } from '@angular/core';
import { MOCK } from './mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mock = MOCK;
}
