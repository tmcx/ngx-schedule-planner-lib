import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { EEvent } from '../../../services/calendar/calendar.interface';
import { IColorTag, ITag } from '../../../main/internal.interfaces';
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
  original: {
    colorTags: IColorTag[];
    tags: ITag[];
  };

  constructor(private calendarService: CalendarService) {
    this.onTagSelection = new EventEmitter();
    this.selected = {
      colorTags: [],
      tags: [],
    };
    this.original = { tags: [], colorTags: [] };
    this.showModal = false;
    this.calendarService.on.event.subscribe(({ event }) => {
      if (EEvent.contentChange == event) {
        const tags = Object.values(this.calendarService.originalContent.tags);
        tags.sort((a, b) => (a.name < b.name ? -1 : 1));
        const colorTags = Object.values(
          this.calendarService.originalContent.colorTags
        );
        colorTags.sort((a, b) => (a.name < b.name ? -1 : 1));
        this.original.tags = tags;
        this.original.colorTags = colorTags;
      }
    });
  }

  includes(tag: ITag | IColorTag, type: 'colorTag' | 'tag') {
    switch (type) {
      case 'colorTag':
        return this.selected.colorTags.includes(tag as IColorTag);
      case 'tag':
        return this.selected.tags.includes(tag as ITag);
    }
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleTag(tag: ITag | IColorTag, type: 'colorTag' | 'tag') {
    switch (type) {
      case 'colorTag':
        const cIndex = this.selected.colorTags.findIndex((aTag) => aTag == tag);
        if (cIndex != -1) {
          this.selected.colorTags.splice(cIndex, 1);
        } else {
          this.selected.colorTags.push(tag as IColorTag);
          this.selected.colorTags.sort((a, b) => (a.name < b.name ? -1 : 1));
        }

        break;
      case 'tag':
        const tIndex = this.selected.tags.findIndex((aTag) => aTag == tag);
        if (tIndex != -1) {
          this.selected.tags.splice(tIndex, 1);
        } else {
          this.selected.tags.push(tag as ITag);
          this.selected.tags.sort((a, b) => (a.name < b.name ? -1 : 1));
        }

        break;
    }
    this.onTagSelection.emit(this.selected);
  }
}
