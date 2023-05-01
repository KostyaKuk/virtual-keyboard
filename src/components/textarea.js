import createElement from './createElem.js';

export default class Textarea {
  constructor(colums, row) {
    this.colums = colums;
    this.row = row;
    this.wrapper = createElement(
      'textarea',
      'area_style',
      ['placeholder', 'Hello!'],
      ['rows', row],
      ['cols', colums],
    );
  }
}
