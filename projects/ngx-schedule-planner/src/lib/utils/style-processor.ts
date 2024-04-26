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
    for (const _key in CONFIG.STYLE) {
      const key = _key as STYLE_VAR_KEYS;
      const value = CONFIG.STYLE[key];
      const varName = CONFIG.STYLE_VAR[key];
      await StyleProcessor.setProp(varName, value);
    }
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
}
