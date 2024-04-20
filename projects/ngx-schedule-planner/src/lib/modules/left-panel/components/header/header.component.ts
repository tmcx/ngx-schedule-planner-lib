import { Component } from '@angular/core';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { clone } from '../../../../utils/functions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  filters: { groupName: string; userName: string };

  constructor(public calendarService: CalendarService) {
    this.filters = {
      groupName: '',
      userName: '',
    };
  }

  filterByUserName(name: string) {
    this.filters.userName = name;
    this.filter();
  }

  filterByGroupName(name: string) {
    this.filters.groupName = name;
    this.filter();
  }

  private filter() {
    const { all } = this.calendarService.content;
    let content = clone(all);
    if (this.filters.groupName) {
      content = !this.filters.groupName
        ? content
        : content
            .filter((userSchedule) =>
              userSchedule.groups
                .map(({ name }) => name)
                .join('[]')
                .toLowerCase()
                .includes(this.filters.groupName.toLowerCase())
            )
            .map((userSchedule) => {
              if (this.filters.groupName) {
                userSchedule.groups = userSchedule.groups.filter(({ name }) =>
                  name
                    .toLowerCase()
                    .includes(this.filters.groupName.toLowerCase())
                );
              }
              return userSchedule;
            });
    }

    content = !this.filters.userName
      ? content
      : content.filter((userSchedule) =>
          userSchedule.profile.name
            .toLowerCase()
            .includes(this.filters.userName.toLowerCase())
        );
    this.calendarService.changeContent(content, 'filtered');
  }

  addActivity() {
    this.calendarService.addActivityClicked();
  }

  get isCollapsed() {
    return this.calendarService.config.leftPanel.isCollapsed;
  }

  set isCollapsed(isCollapsed: boolean) {
    this.calendarService.setLeftPanelCollapse(isCollapsed);
  }
}
