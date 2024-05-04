import { ITheme } from '../../public-interfaces';
import { HEADER_STYLE, SELECTOR } from '../config/constants';
import { ISelectors } from '../main/internal.interfaces';
import { querySelector } from './functions';

export class StyleProcessor {
  static root: HTMLElement;

  static async initialize(uuid: string) {
    SELECTOR.HOST = SELECTOR.HOST.replace('{uuid}', uuid);
    Object.keys(SELECTOR).forEach((_key) => {
      const key = _key as keyof ISelectors;
      SELECTOR[key] = SELECTOR[key].replace('{uuid}', uuid);
    });

    await this.setNestedProps(HEADER_STYLE.STYLE, HEADER_STYLE.STYLE_VAR);
  }

  static async setProp(varName: string, value: string) {
    await StyleProcessor.validateHost();
    StyleProcessor.root.style.setProperty(varName, value);
  }

  static async getProp(varName: string) {
    await StyleProcessor.validateHost();
    return StyleProcessor.root.style.getPropertyValue(varName);
  }

  static async validateHost() {
    if (!StyleProcessor.root) {
      StyleProcessor.root = await querySelector(SELECTOR.HOST);
    }
  }

  static async setNestedProps(
    values: { [key: string]: any },
    varNames: { [key: string]: any }
  ) {
    for (const [key, value] of Object.entries(values)) {
      if (typeof value == 'object') {
        await this.setNestedProps(value, varNames[key]);
        continue;
      }
      const varName = varNames[key];
      await StyleProcessor.setProp(varName, value);
    }
  }

  static mergeThemes(theme1: ITheme, theme2?: ITheme): ITheme {
    const mergedTheme: ITheme = { ...theme1 };

    for (const key1 in theme2) {
      if (Object.prototype.hasOwnProperty.call(theme2, key1)) {
        const value1 = theme1[key1 as keyof ITheme];
        const value2 = theme2[key1 as keyof ITheme];

        if (value2 && typeof value2 === 'object' && !Array.isArray(value2)) {
          mergedTheme[key1 as keyof ITheme] = StyleProcessor.mergeThemes(
            (value1 as any) || {},
            value2 as any
          ) as any;
        } else {
          mergedTheme[key1 as keyof ITheme] =
            value2 !== undefined ? value2 : value1;
        }
      }
    }

    return mergedTheme;
  }
}
