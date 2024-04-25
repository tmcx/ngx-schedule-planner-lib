import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  imports: [FormsModule, ReactiveFormsModule],
})
export class InputSearchComponent {
  @Output() onKeyUp = new EventEmitter<string>();
  @Input() placeholder!: string;
  input: FormControl;

  constructor() {
    this.input = new FormControl();
    this.input.valueChanges.pipe(debounceTime(200)).subscribe(() => {
      this.onKeyUp.emit(this.input.value ?? '');
    });
  }
}
