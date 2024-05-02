import { CONFIG, SELECTOR } from '../config/constants';
import { ISelectors, STYLE_VAR_KEYS } from '../main/internal.interfaces';
import { querySelector } from './functions';

export class StyleProcessor {

  static root: HTMLElement;

  static async initialize(uuid: string) {
    SELECTOR.HOST = SELECTOR.HOST.replace('{uuid}', uuid);
    Object.keys(SELECTOR).forEach((_key) => {
      const key = _key as keyof ISelectors;
      SELECTOR[key] = SELECTOR[key].replace('{uuid}', uuid);
    });

    await this.setNestedProps(CONFIG.STYLE, CONFIG.STYLE_VAR);
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
}
