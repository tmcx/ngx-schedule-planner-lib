import { Component } from '@angular/core';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { clone } from '../../../../utils/functions';
import { InputSearchComponent } from '../../../../shared/inputs/input-search/input-search.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  imports: [InputSearchComponent, CommonModule],
})
export class LeftPanelComponent {
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
    // const { all } = this.calendarService.content;
    // let content = clone(all);
    // if (this.filters.groupName) {
    //   content = !this.filters.groupName
    //     ? content
    //     : content
    //         .filter((userSchedule) =>
    //           userSchedule.groups
    //             .map(({ name }) => name)
    //             .join('[]')
    //             .toLowerCase()
    //             .includes(this.filters.groupName.toLowerCase())
    //         )
    //         .map((userSchedule) => {
    //           if (this.filters.groupName) {
    //             userSchedule.groups = userSchedule.groups.filter(({ name }) =>
    //               name
    //                 .toLowerCase()
    //                 .includes(this.filters.groupName.toLowerCase())
    //             );
    //           }
    //           return userSchedule;
    //         });
    // }

    // content = !this.filters.userName
    //   ? content
    //   : content.filter((userSchedule) =>
    //       userSchedule.profile.name
    //         .toLowerCase()
    //         .includes(this.filters.userName.toLowerCase())
    //     );
    // this.calendarService.changeCurrentContent(content, 'filtered');
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
