import { HEADER } from '../config/constants';

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
  dir: { vertical?: boolean; horizontal?: boolean }
) {
  let vScroll: HTMLElement | undefined;
  let hScroll: HTMLElement | undefined;

  const el = await querySelector(selector);
  (el.style as any).scrollbarWidth = 'none';
  el.style.overflow = 'auto';

  const vId = 'v-fs' + unique(selector);
  if (dir.vertical) {
    if (!el.parentElement?.querySelector(`.${vId}`)) {
      vScroll = document.createElement('span');
      vScroll.classList.add('v-floating-scroll');
      vScroll.classList.add(vId);
      vScroll.innerText = '.';

      vScroll.style.height = `calc(100% - ${HEADER.HEIGHT})`;
      vScroll.style.lineHeight = el.scrollHeight + 'px';
      vScroll.style.top = HEADER.HEIGHT;
      vScroll.style.right = '1px';

      el.parentElement?.append(vScroll);
    }
  }

  const hId = 'h-fs' + unique(selector);
  if (dir.horizontal) {
    if (!el.parentElement?.querySelector(`.${hId}`)) {
      hScroll = document.createElement('span');
      hScroll.classList.add('h-floating-scroll');
      hScroll.classList.add(hId);
      hScroll.innerText = '.';

      hScroll.style.width = `calc(100% - ${HEADER.WIDTH})`;
      hScroll.style.letterSpacing = el.scrollWidth + 'px';
      hScroll.style.left = HEADER.WIDTH;
      hScroll.style.bottom = '1px';
      hScroll.style.height = '10px';

      el.parentElement?.append(hScroll);
    }
  }

  el.onscroll = (e) => {
    if (hScroll) {
      hScroll.scrollLeft = (e as any).target.scrollLeft;
    }
    if (vScroll) {
      vScroll.scrollTop = (e as any).target.scrollTop;
    }
  };

  if (hScroll) {
    hScroll.onscroll = (e) => (el.scrollLeft = (e as any).target.scrollLeft);
  }
  if (vScroll) {
    vScroll.onscroll = (e) => (el.scrollTop = (e as any).target.scrollTop);
  }

  setInterval(async () => {
    if (hScroll) {
      const { horizontal } = await hasScroll(selector);
      if (!horizontal) {
        hScroll.style.display = 'none';
      } else {
        hScroll.style.display = 'block';
        hScroll.scrollLeft = el.scrollLeft;
        hScroll.style.left = HEADER.WIDTH;
        hScroll.style.width = `calc(100% - ${HEADER.WIDTH})`;
        hScroll.style.letterSpacing = `calc(${el.scrollWidth}px - 10px - ${HEADER.WIDTH})`;
      }
    }
    if (vScroll) {
      const { vertical } = await hasScroll(selector);
      if (!vertical) {
        vScroll.style.display = 'none';
      } else {
        vScroll.style.display = 'block';
        vScroll.scrollTop = el.scrollTop;
        vScroll.style.top = HEADER.HEIGHT;
        vScroll.style.lineHeight = el.scrollHeight + 'px';
        vScroll.style.height = `calc(100% - ${HEADER.HEIGHT})`;
      }
    }
  }, 100);

  return { vId: '.' + vId, hId: '.' + hId };
}

function unique(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }
  hash = hash % 1000;
  return hash;
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

export function crossIncludes(
  array1: { [key: string]: any }[],
  array2: { [key: string]: any }[],
  field: string
) {
  const values = array1.map((object) => object[field]);
  return array2.some((object) => values.includes(object[field]));
}
