import { IActivity } from '../main/internal.interfaces';

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
  parent?: HTMLElement
): Promise<HTMLElement> {
  const getElement = () =>
    (parent ?? document).querySelector(selector) as unknown as HTMLElement;
  return new Promise<HTMLElement>((resolve) => {
    const element = getElement();
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = getElement();
      if (element) {
        observer.disconnect();
        resolve(element);
        return;
      }
    });
    observer.observe(document.querySelector('ngx-schedule-planner')!, {
      characterDataOldValue: true,
      attributeOldValue: true,
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true,
    });
  });
}

export async function querySelectorAll(
  selector: string,
  parent?: HTMLElement
): Promise<HTMLElement[]> {
  const getElements = () =>
    Array.from(
      (parent ?? document).querySelectorAll(selector)
    ) as unknown as HTMLElement[];
  return new Promise<HTMLElement[]>((resolve) => {
    const elements = getElements();
    if (elements.length > 0) {
      resolve(elements);
      return;
    }

    const observer = new MutationObserver(() => {
      const elements = getElements();
      if (elements.length > 0) {
        observer.disconnect();
        resolve(elements);
        return;
      }
    });
    observer.observe(document.querySelector('ngx-schedule-planner')!, {
      characterDataOldValue: true,
      attributeOldValue: true,
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true,
    });
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

export async function getElementSize(
  els: HTMLElement[] | HTMLElement | string
) {
  let values: HTMLElement[] = [];
  if (Array.isArray(els)) {
    values = els;
  } else if (typeof els == 'string') {
    values = await querySelectorAll(els);
  } else {
    values = [els];
  }

  const summarize = (fieldName: string, subFieldName?: string): number => {
    return values.reduce(
      (previous: number, curr: any) =>
        +(subFieldName ? curr[fieldName][subFieldName] : curr[fieldName])
          .toString()
          .replace(/^\D+/g, '') + previous,
      0
    );
  };

  return {
    clientHeight: summarize('clientHeight'),
    clientWidth: summarize('clientWidth'),
    scrollHeight: summarize('scrollHeight'),
    scrollWidth: summarize('scrollWidth'),
    styleHeight: summarize('style', 'height'),
    styleWidth: summarize('style', 'width'),
  };
}

export async function setHeight(
  els: HTMLElement[] | HTMLElement | string[] | string,
  value: number | 'auto',
  unit = 'px'
) {
  let values = [];
  if (Array.isArray(els)) {
    if (els.length == 0) {
      return;
    }
    if (typeof els[0] == 'string') {
      for (const selector of els) {
        values.push(...(await querySelectorAll(selector as string)));
      }
    } else {
      values = els as HTMLElement[];
    }
  } else if (typeof els == 'string') {
    values = await querySelectorAll(els);
  } else {
    values = [els];
  }
  values.forEach((el) => {
    el.style.height = value == 'auto' ? value : value + unit;
    el.style.maxHeight = value == 'auto' ? value : value + unit;
  });
}

export async function linkScroll(
  selectors: string[],
  options?: { scrollLeft?: boolean; scrollTop?: boolean }
) {
  const scroll = ($event: any) => {
    const { scrollTop, scrollLeft } = $event.srcElement;
    selectors.forEach((selector) => {
      querySelector(selector).then((element) => {
        if (options?.scrollLeft && scrollLeft >= 0) {
          element.scrollLeft = scrollLeft;
        }
        if (options?.scrollTop && scrollTop >= 0) {
          element.scrollTop = scrollTop;
        }
      });
    });
  };
  for (const selector of selectors) {
    const element = await querySelector(selector);
    if (element) {
      element.addEventListener('scroll', scroll);
    }
  }
}

export async function linkSize(
  mainSelector: string,
  selectors: string[],
  options?: { width?: boolean; height?: boolean }
) {
  const observer = new ResizeObserver((entries) => {
    entries.forEach(async (entry) => {
      const { width, height } = entry.contentRect;
      selectors.forEach((selector) => {
        querySelector(selector).then((element) => {
          if (options?.width) {
            element.style.width = width + 'px';
          }
          if (options?.height) {
            element.style.height = height + 'px';
          }
        });
      });
    });
  });

  observer.observe(await querySelector(mainSelector));
}

export async function hasScroll(selector: string) {
  var element = await querySelector(selector);
  return {
    horizontal: element.scrollWidth > element.clientWidth,
    vertical: element.scrollHeight > element.clientHeight,
  };
}

export async function onResizeDo(
  selector: string,
  process: ResizeObserverCallback
) {
  const observer = new ResizeObserver(process);
  observer.observe(await querySelector(selector));
}
