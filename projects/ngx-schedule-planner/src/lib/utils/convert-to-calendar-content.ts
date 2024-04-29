import { CalendarContent } from '../../public-interfaces';
import { IActivity } from '../main/internal.interfaces';
import { ICalendarContent } from '../services/calendar/calendar.interface';
import { CalendarService } from '../services/calendar/calendar.service';
import { ActivityHTML } from './classes/activity-html';
import { clone, groupBy } from './functions';
import moment from 'moment';

export function convertToCalendarContent(
  calendarService: CalendarService
): ICalendarContent[] {
  const start = new Date().getTime();
  const activityHTML = new ActivityHTML(calendarService);
  const {
    interval: { startDate, endDate },
  } = calendarService.config;

  let output: ICalendarContent[] = [];

  const originalContent = clone(calendarService.originalContent);
  console.log('Conversion starting');

  function hasConflict(activityA: IActivity, activityB: IActivity): boolean {
    const startA = moment(activityA.startDate);
    const endA = moment(activityA.endDate);
    const startB = moment(activityB.startDate);
    const endB = moment(activityB.endDate);
    return startA.isBefore(endB) && endA.isAfter(startB);
  }

  function durationInMin(activity: CalendarContent['activities'][0]) {
    return moment(activity.endDate).diff(activity.startDate, 'minutes');
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
  output = originalContent.profiles
    .map((profile) => {
      const profileActivities: CalendarContent['activities'][0][] =
        profile.activities
          .map(({ activityId }) => {
            const activity = originalContent.activities[activityId];
            return {
              ...activity,
              durationInMin: durationInMin(activity),
              startDate: activity.startDate,
              endDate: activity.endDate,
            };
          })
          .flatMap((activity) => [
            activity,
            ...activity.repeat.map((repeat) => {
              const actClone = clone(activity);
              return {
                ...actClone,
                startDate: repeat + 'T' + actClone.startDate.split('T')[1],
                endDate: repeat + 'T' + actClone.endDate.split('T')[1],
              };
            }),
          ]);
      const groups = Object.values(
        groupBy<IActivity>(profileActivities, 'groupId')
      );

      const current: ICalendarContent['current'] = groups
        .flatMap((group) => ({
          group: { ...originalContent.groups[group[0].groupId] },
          activities: groupAndFilterActivities(group),
        }))
        .filter(({ activities }) => activities.length > 0);

      return {
        current,
        profile: {
          ...profile,
          tags: profile.tags.map((tagId) => originalContent.tags[tagId]),
        },
      };
    })
    .filter((row) => row.current.length > 0);

  console.log(
    'Conversion finished',
    output.length,
    ((new Date().getTime() - start) / 1000).toFixed(1) + 's'
  );
  return output;
}
