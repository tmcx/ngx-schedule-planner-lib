import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent implements OnInit {
  @Output() onKeyUp = new EventEmitter<string>();
  @Input() placeholder!: string;

  ngOnInit() {}

  emitSearch($event: any) {
    this.onKeyUp.emit($event.target.value ?? '');
  }
}
