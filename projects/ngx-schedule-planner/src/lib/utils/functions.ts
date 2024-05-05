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

async function addScroll(
  selector: string,
  options: {
    type: 'h' | 'v';
    margin: {
      top?: Function;
      right?: Function;
      bottom?: Function;
      left?: Function;
    };
    bePending?: string[];
  }
) {
  const { type } = options;
  const target = await querySelector(selector);
  (target.style as any).scrollbarWidth = 'none';
  target.style.overflow = 'auto';
  let parent = target.parentElement!;
  const eScroll = document.createElement('span');
  const id = type + '-fs' + unique(selector);
  eScroll.id = id;
  eScroll.classList.add(type + '-floating-scroll');
  let scrollHeight = target.scrollHeight;
  let scrollWidth = target.scrollWidth;

  const setPosition = () => {
    Object.entries(options.margin).forEach(([key, value]) => {
      (eScroll.style as any)[key] = value();
    });
  };

  const setVScroll = () => {
    const bottom = options.margin.bottom && options.margin.bottom();
    const top = options.margin.top && options.margin.top();
    const heightReducer = top ?? bottom ?? '0px';
    eScroll.style.height = `calc(100% - ${heightReducer})`;
    eScroll.innerHTML = `<span style="height: calc(${scrollHeight}px - ${heightReducer} - 10px);"></span>`;
    setPosition();
  };

  const setHScroll = () => {
    const right = options.margin.right && options.margin.right();
    const left = options.margin.left && options.margin.left();
    const widthReducer = right ?? left ?? '0px';
    eScroll.style.width = `calc(100% - ${widthReducer})`;
    eScroll.innerHTML = `<span style="width: calc(${scrollWidth}px - ${widthReducer} - 10px);"></span>`;
    setPosition();
  };
  parent.append(eScroll);
  target.addEventListener('scroll', (e) => {
    if (type == 'v') {
      eScroll.scrollTop = (e as any).target.scrollTop;
    } else {
      eScroll.scrollLeft = (e as any).target.scrollLeft;
    }
  });
  eScroll.addEventListener('scroll', (e) => {
    if (type == 'v') {
      target.scrollTop = (e as any).target.scrollTop;
    } else {
      target.scrollLeft = (e as any).target.scrollLeft;
    }
  });

  if (type == 'v') {
    setVScroll();
  } else {
    setHScroll();
  }

  const onResize = () => {
    if (type == 'v') {
      if (scrollHeight != target.scrollHeight) {
        scrollHeight = target.scrollHeight;
        setVScroll();
      }
    } else {
      if (scrollWidth != target.scrollWidth) {
        scrollWidth = target.scrollWidth;
        setHScroll();
      }
    }
  };
  onResizeDo(selector, onResize);
  options.bePending?.forEach((otherSelector) => {
    onResizeDo(otherSelector, onResize);
  });
  return id;
}

export async function floatingScroll(
  selector: string,
  options: { vertical?: boolean; horizontal?: boolean; bePending?: string[] }
) {
  return {
    vId: await addScroll(selector, {
      type: 'v',
      margin: { top: () => HEADER.HEIGHT, right: () => '1px' },
      bePending: options.bePending,
    }),
    hId: await addScroll(selector, {
      type: 'h',
      margin: { left: () => HEADER.WIDTH, bottom: () => '1px' },
      bePending: options.bePending,
    }),
  };
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
