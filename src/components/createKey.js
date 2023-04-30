import createElement from './createElem.js';

export default class Key {
  constructor({ key, shiftKey, code }) {
    this.key = key;
    this.shiftKey = shiftKey;
    this.code = code;
    // this.isActiveShiftKey != shiftKey;
    this.wrapper = createElement('div', 'key');
    this.subSymbol = createElement('div', 'sub_symbol');
    this.symbol = createElement('div', 'symbol');
    this.symbol.innerHTML = this.key;

    this.wrapper.append(this.subSymbol, this.symbol);
  }
}
