import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent {
  @Output() onKeyUp = new EventEmitter<string>();
  @Input() placeholder!: string;

  emitSearch($event: any) {
    this.onKeyUp.emit($event.target.value ?? '');
  }
}
