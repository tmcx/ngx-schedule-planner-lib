import { IActivity } from '../main/internal.interfaces';
import { ICalendarContent } from '../services/calendar/calendar.interface';
import { CalendarService } from '../services/calendar/calendar.service';
import { ActivityHTML } from './classes/activity-html';
import { clone, groupBy } from './functions';
import { duration, format } from './moment';
import moment from 'moment';

export function convertToCalendarContent(
  calendarService: CalendarService
): ICalendarContent[] {
  const start = new Date().getTime();
  const activityHTML = new ActivityHTML(calendarService);
  const {
    interval: {
      global: { startDate, endDate },
      timeRange: { hrFrom, hrTo },
    },
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

  function groupAndFilterActivities(activities: IActivity[]): IActivity[][] {
    const filteredActivities = activities.filter((activity) => {
      const activityStartDate = moment(activity.startDate);
      const activityEndDate = moment(activity.endDate);
      const belongsToPeriod =
        activityStartDate.isSameOrAfter(startDate) &&
        activityEndDate.isSameOrBefore(endDate);
      const belongsToHrsInterval =
        activityStartDate.hour() >= hrFrom && activityEndDate.hour() <= hrTo;
      return belongsToPeriod && belongsToHrsInterval;
    });

    const groups: IActivity[][] = [];

    filteredActivities.forEach((activity) => {
      const groupIndex = groups.findIndex((group) =>
        group.every(
          (existingActivity) => !hasConflict(existingActivity, activity)
        )
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
      const profileActivities: ICalendarContent['current'][0]['rows'][0]['activities'] =
        profile.activities
          .map(({ activityId }) => {
            const activity = originalContent.activities[activityId];
            const actStartDate = new Date(activity.startDate);
            const actEndDate = new Date(activity.endDate);
            const strDuration = duration(actStartDate, actEndDate);
            return {
              ...activity,
              startDate: actStartDate,
              endDate: actEndDate,
              tags: activity.tags.map((tagId) => originalContent.tags[tagId]),
              colorTags: activity.colorTags.map(
                (colorTagId) => originalContent.colorTags[colorTagId]
              ),
              presentation: {
                startDate: format(actStartDate),
                endDate: format(actEndDate),
                duration: strDuration,
                zone: '',
              },
            };
          })
          .flatMap((activity) => [
            activity,
            ...activity.repeat.map((repeat) => {
              const actClone = clone(activity);

              const actStartDate = new Date(
                repeat + 'T' + actClone.startDate.toISOString().split('T')[1]
              );
              const actEndDate = new Date(
                repeat + 'T' + actClone.endDate.toISOString().split('T')[1]
              );
              const strDuration = duration(actStartDate, actEndDate);
              return {
                ...actClone,
                startDate: actStartDate,
                endDate: actEndDate,
                presentation: {
                  startDate: format(actStartDate),
                  endDate: format(actEndDate),
                  duration: strDuration,
                  zone: '',
                },
              };
            }),
          ]);
      const groups = Object.values(
        groupBy<IActivity>(profileActivities, 'groupId')
      );

      const current: ICalendarContent['current'] = groups
        .flatMap((group) => ({
          group: { ...originalContent.groups[group[0].groupId] },
          rows: groupAndFilterActivities(group).map((row) => ({
            activities: row,
          })),
        }))
        .filter(({ rows }) => rows.length > 0);

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
