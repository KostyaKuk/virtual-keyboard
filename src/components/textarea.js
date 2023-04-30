import createElement from './createElem.js';

export default class Textarea {
  constructor(colums, rows) {
    this.colums = colums;
    this.rows = rows;
    this.wrapper = createElement(
      'textarea',
      'area_style',
      ['placeholder', 'Hello!'],
      ['rows', rows],
      ['cols', colums],
    );
  }
}
