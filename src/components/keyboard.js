import createElement from './createElem.js';
// import * as storageLang from './storageLang.js';
import Key from './createKey.js';
import langLayout from '../keyboard/lang_layout.js';
import Textarea from './textarea.js';

export default class Keyboard {
  constructor(rows) {
    this.rows = rows;
    this.wrapper = createElement('div', 'keyboard');
    this.textarea = new Textarea(5, 50).wrapper;
  }

  initLang(lang) {
    this.keyInit = langLayout[lang];
    this.wrapper.dataset.lang = lang;
    return this;
  }

  show() {
    this.tempKey = [];
    this.rows.forEach((row, i) => {
      const rowComponent = createElement('div', 'row_component');
      rowComponent.dataset.row = i + 1;
      row.forEach((code) => {
        const keyLayout = this.keyInit.find((key) => key.code === code);
        if (keyLayout) {
          const keyBtn = new Key(keyLayout);
          this.tempKey.push(keyBtn);
          rowComponent.append(keyBtn.wrapper);
        }
      });
      this.wrapper.append(rowComponent);
    });
    return this;
  }
}
