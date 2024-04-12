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
  wait = true
): Promise<HTMLElement[]> {
  const getElements = () =>
    Array.from(document.querySelectorAll(selector)) as unknown as HTMLElement[];
  return new Promise<HTMLElement[]>((resolve) => {
    const interval = setInterval(() => {
      const elements = getElements();
      if (elements.length || !wait) {
        resolve(elements);
        clearInterval(interval);
      }
    }, 100);
  });
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

export function getValueOfObjectByPath<T>(
  object: { [key: string]: any },
  path: string
): T {
  const route = path.split('.');

  for (const section of route) {
    object = object[section];
  }

  return object as T;
}

export async function clientHeight(els: HTMLElement[] | HTMLElement | string) {
  let values = [];
  if (Array.isArray(els)) {
    values = els;
  } else if (typeof els == 'string') {
    values = await querySelectorAll(els, false);
  } else {
    values = [els];
  }
  return values.reduce((prev, curr) => curr.clientHeight + prev, 0);
}

export async function setHeight(
  els: HTMLElement[] | HTMLElement | string[] | string,
  value: number,
  unit = 'px'
) {
  let values = [];
  if (Array.isArray(els)) {
    if (els.length == 0) {
      return;
    }
    if (typeof els[0] == 'string') {
      for (const selector of els) {
        values.push(...(await querySelectorAll(selector as string, false)));
      }
    } else {
      values = els as HTMLElement[];
    }
  } else if (typeof els == 'string') {
    values = await querySelectorAll(els, false);
  } else {
    values = [els];
  }
  values.forEach((el) => {
    el.style.height = value + unit;
  });
}
