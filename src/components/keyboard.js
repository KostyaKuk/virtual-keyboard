import createElement from './createElem.js';
// import * as storageLang from './storageLang.js';
import Key from './createKey.js';
import langLayout from '../keyboard/lang_layout.js';
import Textarea from './textarea.js';

export default class Keyboard {
  constructor(rows) {
    this.rows = rows;
    this.wrapper = createElement('div', 'keyboard');
    this.textarea = new Textarea(5, 20).wrapper;
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
        const keyBase = this.keyInit.find((key) => key.code === code);
        if (keyBase) {
          const keyBtn = new Key(keyBase);
          this.tempKey.push(keyBtn);
          rowComponent.append(keyBtn.wrapper);
        }
      });
      this.wrapper.append(rowComponent);
    });
    this.wrapper.addEventListener('mousedown', this.mouseEventKeydown);
    document.addEventListener('keydown', this.keyEventKeydown);
    document.addEventListener('keyup', this.keyEventKeydown);
    return this;
  }

  mouseEventKeydown = (event) => {
    const areaKeyboard = event.target.closest('.key');
    const {
      dataset: { code },
    } = areaKeyboard;
    // this.textarea.value += `${code}`;
    this.eventKeydown({ code, type: event.type });
    areaKeyboard.addEventListener('mouseleave', this.cancelStyle);
  };

  keyEventKeydown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.eventKeydown(event);
  };

  cancelStyle = (event) => {
    event.target.classList.remove('active');
    event.target.removeEventListener('mouseleave', this.cancelStyle);
  };

  pressedKey(code, isPressed) {
    if (code.includes('Shift')) {
      this.isShift = isPressed;
    }
  }

  determineKey(keyBase) {
    this.printKey(keyBase, keyBase.key);
  }

  eventKeydown = (event) => {
    const { code, type } = event;
    const keyBase = this.tempKey.find((key) => key.code === code);
    this.textarea.focus();
    if (type.includes('down')) {
      keyBase.wrapper.classList.add('active');
    }
    this.determineKey(keyBase);
  };

  printKey = (keyBase, key) => {
    console.log(keyBase);
    const cursorPosition = this.textarea.selectionStart;
    const leftCursor = this.textarea.value.slice(0, cursorPosition);
    const rightCursor = this.textarea.value.slice(cursorPosition);

    this.textarea.value = `${leftCursor}${key}${rightCursor}`;
  };
}
