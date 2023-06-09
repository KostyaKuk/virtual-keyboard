import Keyboard from './components/keyboard.js';
import createElement from './components/createElem.js';
import { get } from './components/storageLang.js';

const rowsPosition = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'keyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Del'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'BackSlash', 'Enter'],
  ['ShiftLeft', 'Backticks', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Less', 'More', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['Fn', 'Control', 'OptionLeft', 'Space', 'OptionRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];

const lang = get('lang');

const keyboard = new Keyboard(rowsPosition).initLang(lang).show();
const main = createElement('main', 'main');
const keyboardWrap = createElement('div', 'keyboard_wrapper');

keyboardWrap.append(keyboard.textarea, keyboard.wrapper);
main.append(keyboardWrap);

document.body.prepend(main);
