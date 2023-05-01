import Keyboard from './components/keyboard.js';
import createElement from './components/createElem.js';
import { get } from './components/storageLang.js';

const rowsPosition = [
  ['Paragraph', 'NumericKey1', 'NumericKey2', 'NumericKey3', 'NumericKey4', 'NumericKey5', 'NumericKey6', 'NumericKey7', 'NumericKey8', 'NumericKey9', 'NumericKey0', 'Minus', 'Equals', 'Backspace'],
  ['Tab', 'keyQ', 'keyW', 'keyE', 'keyR', 'keyT', 'keyY', 'keyU', 'keyI', 'keyO', 'keyP', 'BracketLeft', 'BracketRight', 'Del'],
  ['CapsLock', 'keyA', 'keyS', 'keyD', 'keyF', 'keyG', 'keyH', 'keyJ', 'keyK', 'keyL', 'Semicolon', 'Quote', 'BackSlash', 'Enter'],
  ['ShiftLeft', 'Backticks', 'keyZ', 'keyX', 'keyC', 'keyV', 'keyB', 'keyN', 'keyM', 'Less', 'More', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['Fn', 'Control', 'OptionLeft', 'Space', 'OptionRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];

const lang = get('lang');

const keyboard = new Keyboard(rowsPosition).initLang(lang).show();
const main = createElement('main', 'main');

console.log(keyboard);
main.append(keyboard.textarea, keyboard.wrapper);

document.body.prepend(main);
