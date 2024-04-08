import { IActivity } from '../main/ngx-schedule-planner.interface';

export function arrayOf(length: number, plus: number = 0) {
  return Array.from(Array(length + 1).keys()).map((num) => num + plus);
}

export function clone<T>(variable: T): T {
  return structuredClone(variable) as T;
}

export function uuid() {
  return Math.floor(Math.random() * 1000000000).toFixed(0);
}

export async function querySelector(
  selector: string,
  wait = false
): Promise<HTMLElement> {
  const getElement = () =>
    document.querySelector(selector) as unknown as HTMLElement;
  if (wait) {
    return new Promise<HTMLElement>((resolve) => {
      const interval = setInterval(() => {
        const elements = getElement();
        if (elements) {
          resolve(elements);
          clearInterval(interval);
        }
      }, 100);
    });
  } else {
    return getElement();
  }
}

export async function querySelectorAll(
  selector: string,
  wait = false
): Promise<HTMLElement[]> {
  const getElements = () =>
    Array.from(document.querySelectorAll(selector)) as unknown as HTMLElement[];
  if (wait) {
    return new Promise<HTMLElement[]>((resolve) => {
      const interval = setInterval(() => {
        const elements = getElements();
        if (elements.length) {
          resolve(elements);
          clearInterval(interval);
        }
      }, 100);
    });
  } else {
    return getElements();
  }
}

export function groupActivities(activities: IActivity[]): IActivity[][] {
  const groups: IActivity[][] = [];

  const hasCollision = (group: IActivity[], interval: IActivity) => {
    for (let i = 0; i < group.length; i++) {
      if (
        interval.startDate < group[i].endDate &&
        interval.endDate > group[i].startDate
      ) {
        return true;
      }
    }
    return false;
  };

  activities.forEach((interval) => {
    let added = false;

    groups.forEach((group) => {
      if (!added && !hasCollision(group, interval)) {
        group.push(interval);
        added = true;
      }
    });

    if (!added) {
      groups.push([interval]);
    }
  });

  return groups;
}
