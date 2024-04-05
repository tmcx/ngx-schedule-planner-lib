import { Component } from '@angular/core';
import { BaseVariables } from '../../../../../utils/base-variables';
import { CalendarService } from '../../../../../services/calendar/calendar.service';
import { EMode } from '../header-grid/header-grid.interface';
import { clone } from '../../../../../utils/functions';
import moment from 'moment';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss'],
})
export class ActionPanelComponent extends BaseVariables {
  title: string;
  filters: { groupName: string; userName: string };

  constructor(private calendarService: CalendarService) {
    super();
    this.filters = {
      groupName: '',
      userName: '',
    };
    this.title = '';
    this.calendarService.onModeChange.subscribe(() => {
      this.setName();
    });
    this.calendarService.onPeriodChange.subscribe(() => {
      this.setName();
    });
  }

  setName() {
    const referenceDate = this.calendarService.config.referenceDate;
    switch (this.calendarService.config.mode) {
      case EMode.monthly:
        this.title = moment(referenceDate).format('YYYY, MMMM');
        break;
      case EMode.weekly:
        const week =
          moment(referenceDate).week() -
          moment(referenceDate).startOf('M').week();
        this.title = `${moment(referenceDate).format('YYYY, MMMM')}, ${
          week + 1
        } week`;
        break;
      case EMode.daily:
        this.title = moment(referenceDate).format('YYYY, MMMM, dddd D');
        break;
    }
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

  addActivity(){
    this.calendarService.addActivityClicked();
  }
}
