import createElement from './createElem.js';
// import * as storageLang from './storageLang.js';
import Key from './createKey.js';
import langLayout from '../keyboard/lang_layout.js';
import Textarea from './textarea.js';

export default class Keyboard {
  constructor(rows) {
    this.isCaps = false;
    this.rows = rows;
    this.wrapper = createElement('div', 'keyboard');
    this.textarea = new Textarea(5, 10).wrapper;
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
    this.wrapper.addEventListener('mouseup', this.mouseEventKeydown);
    document.addEventListener('keydown', this.keyEventKeydown);
    document.addEventListener('keyup', this.keyEventKeydown);
    return this;
  }

  mouseEventKeydown = (event) => {
    const areaKeyboard = event.target.closest('.key');
    const {
      dataset: { code },
    } = areaKeyboard;
    this.eventKeydown({ code, type: event.type });
    if (!code.includes('CapsLock'))
      areaKeyboard.addEventListener('mouseleave', this.cancelStyle);
  };

  keyEventKeydown = (event) => {
    event.preventDefault();

    this.eventKeydown(event);
  };

  cancelStyle = (event) => {
    if (event.target.dataset.code.includes('Shift')) {
      this.isShift = false;
      this.setUpperCase();
    }
    event.target.classList.remove('active');
    event.target.removeEventListener('mouseleave', this.cancelStyle);
  };

  checkPressedBtnForEvent(keyBase, code) {
    if (code.includes('CapsLock') && this.isCaps) {
      this.isCaps = false;
      this.setUpperCase(false);
      keyBase.wrapper.classList.remove('active');
    } else if (code.includes('CapsLock')) {
      this.isCaps = true;
      this.setUpperCase(true);
    }
    this.pressedKey(code, true);
  }

  pressedKey(code, isPressed) {
    if (code.includes('Shift')) {
      this.isShift = isPressed;
      this.setUpperCase(isPressed);
    }
  }

  determineKey(keyBase) {
    if (!this.isCaps) {
      this.printKey(keyBase, this.isShift ? keyBase.shiftKey : keyBase.key);
    } else if (this.isCaps) {
      if (this.isShift) {
        this.printKey(
          keyBase,
          keyBase.subSymbol.innerHTML ? keyBase.shiftKey : keyBase.key
        );
      } else {
        this.printKey(
          keyBase,
          !keyBase.subSymbol.innerHTML ? keyBase.shiftKey : keyBase.key
        );
      }
    }
    if (keyBase.code.includes('Backspace')) {
      this.textarea.value = this.textarea.value.slice(0, -1);
    }
    if (keyBase.code.includes('Enter')) {
      this.textarea.value = '\n';
    }
    if (keyBase.code.includes('Tab')) {
      this.textarea.value += '   ';
    }
    if (keyBase.code.includes('Del')) {
      this.textarea.value = this.textarea.value.slice(0, -1);
    }
  }

  eventKeydown = (event) => {
    const { code, type } = event;
    const keyBase = this.tempKey.find((key) => key.code === code);
    if (!keyBase) return;
    this.textarea.focus();
    if (type.includes('down')) {
      keyBase.wrapper.classList.add('active');
      this.checkPressedBtnForEvent(keyBase, code, type);
      this.determineKey(keyBase);
    } else {
      if (!code.includes('CapsLock'))
        keyBase.wrapper.classList.remove('active');
      this.pressedKey(code, false);
    }
  };

  setUpperCase(isPressed) {
    if (isPressed) {
      this.tempKey.forEach((btn) => {
        if (this.isCaps && this.isShift) {
          if (btn.subSymbol.innerHTML) {
            btn.subSymbol.innerHTML = btn.key;
            btn.symbol.innerHTML = btn.shiftKey;
          } else {
            btn.symbol.innerHTML = btn.key;
          }
        } else if (this.isShift) {
          if (!btn.isFunctionKey) {
            btn.symbol.innerHTML = btn.shiftKey;
          }
          if (btn.subSymbol.innerHTML) {
            btn.subSymbol.innerHTML = btn.key;
          }
        } else if (this.isCaps) {
          if (!btn.subSymbol.innerHTML && !btn.isFunctionKey) {
            btn.symbol.innerHTML = btn.shiftKey;
          }
        }
      });
    } else {
      this.tempKey.forEach((btn) => {
        if (btn.subSymbol.innerHTML) {
          btn.subSymbol.innerHTML = btn.shiftKey;
          btn.symbol.innerHTML = btn.key;
        } else if (
          !btn.subSymbol.innerHTML &&
          !btn.isFunctionKey &&
          this.isCaps
        ) {
          btn.symbol.innerHTML = btn.shiftKey;
        } else btn.symbol.innerHTML = btn.key;
      });
    }
  }

  printKey = (keyBase, key) => {
    let cursorPosition = this.textarea.selectionStart;
    const leftCursor = this.textarea.value.slice(0, cursorPosition);
    const rightCursor = this.textarea.value.slice(cursorPosition);
    if (!keyBase.isFunctionKey) {
      this.textarea.value = `${leftCursor}${key}${rightCursor}`;
    }
  };
}
