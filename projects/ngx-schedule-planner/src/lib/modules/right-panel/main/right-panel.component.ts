import { AfterViewInit, Component } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { linkScroll, linkSize, querySelector } from '../../../utils/functions';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
})
export class RightPanelComponent implements AfterViewInit {
  constructor(private calendarService: CalendarService) {}

  async ngAfterViewInit(): Promise<void> {
    const {
      RIGHT_PANEL: { NAVIGATOR, TITLE, HOST: RIGHT_PANEL_HOST },
      LEFT_PANEL: { HOST: LEFT_PANEL_HOST },
    } = this.calendarService.selectors;

    linkSize(RIGHT_PANEL_HOST, [TITLE, NAVIGATOR], { width: true });
    linkScroll([LEFT_PANEL_HOST, RIGHT_PANEL_HOST], {
      scrollTop: true,
    });
  }
}
