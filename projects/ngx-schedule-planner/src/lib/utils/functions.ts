import { CONFIG } from '../config/constants';
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

export async function floatingScroll(
  selector: string,
  dir = { vertical: false }
) {
  const id = unique(selector);
  const el = await querySelector(selector);
  if (!el.parentElement?.querySelector(`.${id}`)) {
    (el.style as any).scrollbarWidth = 'none';
    el.style.overflow = 'auto';

    if (dir.vertical) {
      const vScroll = document.createElement('span');
      vScroll.classList.add(id);
      vScroll.innerText = '.';

      vScroll.onscroll = (e) => (el.scrollTop = (e as any).target.scrollTop);
      el.onscroll = (e) => (vScroll.scrollTop = (e as any).target.scrollTop);

      vScroll.onmouseleave = () => (vScroll.style.opacity = '.4');
      el.onmouseleave = () => (vScroll.style.opacity = '.4');

      vScroll.onmouseenter = () => (vScroll.style.opacity = '1');
      el.onmouseenter = () => (vScroll.style.opacity = '1');

      (vScroll.style as any).scrollbarColor = 'white transparent';
      vScroll.style.lineHeight = el.scrollHeight + 'px';

      vScroll.style.height = `calc(100% - 10px - ${CONFIG.STYLE['--ngx-header-height']})`;
      vScroll.style.transition = 'opacity 0.5s ease 0s';
      (vScroll.style as any).scrollbarWidth = 'thin';
      vScroll.style.right = 11 + 'px';
      vScroll.style.top = el.offsetTop + 'px';
      vScroll.style.position = 'absolute';
      vScroll.style.overflow = 'auto';
      vScroll.style.width = '11px';
      vScroll.style.opacity = '.4';
      vScroll.style.zIndex = '1';

      el.parentElement?.append(vScroll);

      setInterval(() => {
        if (el.scrollTop > vScroll.scrollTop) {
          el.scrollTop = vScroll.scrollTop;
        } else {
          vScroll.scrollTop = el.scrollTop;
          vScroll.style.lineHeight = el.scrollHeight + 'px';
        }
      }, 1000);
    }
  }
}

function unique(str: string) {
  let uniq = '';

  for (let i = 0; i < str.length; i++) {
    if (uniq.includes(str[i]) === false) {
      uniq += str[i];
    }
  }
  return uniq;
}

export function includes(
  str1: string | { [key: string]: any }[],
  str2: string,
  path?: string
) {
  const str2Lower = str2.toLowerCase();
  if (typeof str1 == 'string') {
    return str1.toLowerCase().includes(str2Lower);
  } else {
    return (
      Array.isArray(str1) &&
      str1.some((value) =>
        String(getValueOfObjectByPath(value, path!))
          .toLowerCase()
          .includes(str2Lower)
      )
    );
  }
}

export function wait(delay: number) {
  return new Promise<void>((resolve) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve();
    }, delay);
  });
}

export function groupBy<T>(
  array: { [key: string]: any }[],
  _key: string
): { [key: string]: T[] } {
  return array.reduce((result, next) => {
    const key = next[_key];
    result[key] = (result[key] || []).concat(next);
    return result;
  }, {} as { [key: string]: T[] });
}
