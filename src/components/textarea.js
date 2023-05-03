import createElement from './createElem.js';

export default class Textarea {
  constructor(colums, row) {
    this.colums = colums;
    this.row = row;
    this.wrapper = createElement(
      'textarea',
      'area_style',
      ['placeholder', 'Hello! Cмену языка сделать не успел ;('],
      ['rows', row],
      ['cols', colums],
    );
  }
}
