import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { EEvent } from '../../../services/calendar/calendar.interface';
import { ITag } from '../../../main/internal.interfaces';
import { IFilters } from './filter-btn.interface';

@Component({
  standalone: true,
  selector: 'app-filter-btn',
  templateUrl: './filter-btn.component.html',
  styleUrls: ['./filter-btn.component.scss'],
  imports: [CommonModule],
})
export class FilterBtnComponent {
  @Output() onTagSelection: EventEmitter<IFilters>;
  selected: IFilters;
  showModal: boolean;
  tags: ITag[];

  constructor(
    private calendarService: CalendarService,
    private elementRef: ElementRef
  ) {
    this.onTagSelection = new EventEmitter();
    this.selected = {
      tags: [],
    };
    this.tags = [];
    this.showModal = false;
    this.calendarService.on.event.subscribe(({ event }) => {
      if (EEvent.contentChange == event) {
        const tags = Object.values(this.calendarService.originalContent.tags);
        tags.sort((a, b) => (a.name < b.name ? -1 : 1));
        this.tags = tags;
      }
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleTag(tag: ITag) {
    const index = this.selected.tags.findIndex((aTag) => aTag == tag);
    if (index != -1) {
      this.selected.tags.splice(index, 1);
    } else {
      this.selected.tags.push(tag);
      this.selected.tags.sort((a, b) => (a.name < b.name ? -1 : 1));
    }
    this.onTagSelection.emit(this.selected);
  }

  @HostListener('document:click', ['$event.target'])
  handleClick(target: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    const inputClicked = (target as HTMLElement).tagName === 'INPUT';
    if (!clickedInside && !inputClicked) {
      this.toggleModal();
    }
  }
}
