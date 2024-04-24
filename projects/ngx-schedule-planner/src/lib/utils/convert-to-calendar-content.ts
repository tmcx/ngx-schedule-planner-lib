import { IActivity } from '../main/internal.interfaces';
import { ICalendarContent } from '../services/calendar/calendar.interface';
import { CalendarService } from '../services/calendar/calendar.service';
import { ActivityHTML } from './classes/activity-html';
import { clone } from './functions';
import moment from 'moment';

export function convertToCalendarContent(
  calendarService: CalendarService
): ICalendarContent[] {
  const { startDate, endDate } = calendarService.subColumns();
  const activityHTML = new ActivityHTML(calendarService);
  const contents = clone(calendarService.originalContent);

  function hasConflict(activityA: IActivity, activityB: IActivity): boolean {
    const startA = moment(activityA.startDate);
    const endA = moment(activityA.endDate);
    const startB = moment(activityB.startDate);
    const endB = moment(activityB.endDate);
    return startA.isBefore(endB) && endA.isAfter(startB);
  }

  function groupAndFilterActivities(activities: IActivity[]): IActivity[][] {
    const filteredActivities = activities.filter((activity) => {
      const activityStartDate = moment(activity.startDate);
      const activityEndDate = moment(activity.endDate);
      return (
        (!startDate || activityStartDate.isSameOrAfter(startDate)) &&
        (!endDate || activityEndDate.isSameOrBefore(endDate))
      );
    });

    const groups: IActivity[][] = [];

    filteredActivities.forEach((activity) => {
      const groupIndex = groups.findIndex((group) =>
        group.every(
          (existingActivity) => !hasConflict(existingActivity, activity)
        )
      );

      activity.durationInMin = moment(activity.endDate).diff(
        activity.startDate,
        'minutes'
      );
      activity.htmlContent = activityHTML.activityHTMLContent(activity);
      activity.style = activityHTML.activityStyle(activity);
      if (groupIndex !== -1) {
        groups[groupIndex].push(activity);
      } else {
        groups.push([activity]);
      }
    });

    return groups;
  }

  const output = contents.map((content) => {
    return {
      profile: {
        id: content.profile.id,
        name: content.profile.name,
        description: content.profile.description,
        tags: content.profile.tags,
        imageUrl: content.profile.imageUrl,
      },
      current: content.groups.map((group) => {
        group.activities = group.activities.flatMap((activity) => {
          const activities = activity.repeat.map((repeat) => {
            const clonedActivity = clone(activity);
            const repeatDate = moment(repeat);
            clonedActivity.startDate = moment(activity.startDate)
              .year(repeatDate.year())
              .month(repeatDate.month())
              .date(repeatDate.date())
              .toDate();
            clonedActivity.endDate = moment(activity.endDate)
              .year(repeatDate.year())
              .month(repeatDate.month())
              .date(repeatDate.date())
              .toDate();

            return clonedActivity;
          });
          return [activity, ...activities];
        });
        const groupedActivities = groupAndFilterActivities(group.activities);
        return {
          group: {
            name: group.name,
            id: group.id,
            icon: group.icon,
            style: group.style,
          },
          activities: groupedActivities,
        };
      }),
    };
  });
  return output;
}
